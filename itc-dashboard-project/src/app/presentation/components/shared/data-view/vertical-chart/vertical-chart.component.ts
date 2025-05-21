import {
  Component,
  Input,
  HostBinding,
  ElementRef,
  OnInit,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule } from '@angular/common/http';
import { Subscription, filter } from 'rxjs';
import { MediatorService } from '../../../../../application/services/mediator.service';
import { ChartHelperService } from '../../../../../application/services/chart-helper.service';
import { ChartConfig, ChartData } from '../../../../../infrastructure/api/chart.model';

@Component({
  selector: 'app-vertical-chart',
  standalone: true,
  imports: [NgxChartsModule, HttpClientModule],
  templateUrl: './vertical-chart.component.html',
  styleUrls: ['./vertical-chart.component.scss']
})
export class VerticalBarChartComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() theme: 'default' | 'dark' = 'default';
  @HostBinding('class.dark') get isDarkTheme(): boolean {
    return this.theme === 'dark';
  }

  @Input() dataSource: string = '/assets/datasets/data.json';

  private _dataCount: string = 'all';
  @Input()
  set dataCount(value: string) {
    this._dataCount = value || 'all';
    this.updateDisplayedData();
  }
  get dataCount(): string {
    return this._dataCount;
  }

  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'País';
  showYAxisLabel = true;
  yAxisLabel = 'Población';

  colorScheme: any = {
    name: 'customScheme',
    selectable: true,
    group: 'Ordinal',
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  data: ChartData[] = [];
  private originalData: ChartData[] = [];

  private readonly resizeObserver: ResizeObserver;
  private configSubscription?: Subscription;
  private readonly mediatorSubscription?: Subscription;

  constructor(
    private readonly el: ElementRef,
    private readonly mediator: MediatorService,
    private readonly helper: ChartHelperService
  ) {
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const height = width * (400 / 700);
        this.view = [width, height];
      }
    });

    this.mediatorSubscription = this.mediator.events$
      .pipe(filter(evt => evt.origin !== 'vertical-bar-chart'))
      .subscribe(evt => this.handleMediatorEvent(evt));
  }

  ngOnInit(): void {
    this.loadConfig();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource']?.previousValue !== changes['dataSource']?.currentValue) {
      this.reloadConfig();
    }
    if (changes['dataCount']?.previousValue !== changes['dataCount']?.currentValue) {
      this.updateDisplayedData();
    }
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
    this.configSubscription?.unsubscribe();
    this.mediatorSubscription?.unsubscribe();
  }

  private loadConfig(): void {
    this.configSubscription = this.helper
      .loadChartConfig('verticalBarChart', this.dataSource)
      .subscribe({
        next: cfg => this.applyConfig(cfg),
        error: err => console.error('Error loading verticalBarChart config', err)
      });
  }

  private reloadConfig(): void {
    this.configSubscription?.unsubscribe();
    this.loadConfig();
  }

  private applyConfig(cfg: ChartConfig): void {
    this.theme = cfg.theme;
    this.view = cfg.view;
    this.originalData = [...cfg.data];
    this.updateDisplayedData();
  }

  private updateDisplayedData(): void {
    if (!this.originalData.length) {
      this.data = [];
      return;
    }
    this.data = this.dataCount === 'all'
      ? [...this.originalData]
      : this.originalData.slice(0, Number(this.dataCount) || this.originalData.length);
  }

  private handleMediatorEvent(event: any): void {
    const updated = this.helper.processEvent(event, {
      theme: this.theme,
      view: this.view,
      data: this.originalData
    });
    this.theme = updated.theme;
    this.view = updated.view;
    this.originalData = updated.data;
    this.updateDisplayedData();
  }

  onSelect(event: any): void {
    this.mediator.emit({
      origin: 'vertical-bar-chart',
      type: 'select',
      payload: event
    });
  }
}
