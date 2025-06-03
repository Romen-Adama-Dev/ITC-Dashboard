import {
  Component,
  Input,
  HostBinding,
  ElementRef,
  OnInit,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MediatorService } from '../../../../../application/services/mediator.service';
import { ChartHelperService } from '../../../../../application/services/chart-helper.service';
import { ChartConfig, ChartData } from '../../../../../domain/entities/chart.model';

@Component({
  selector: 'app-gauge-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.scss'],
})
export class GaugeChartComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() widgetId!: number;
  @Input() dataSource = '/assets/datasets/data-set-1.json';
  @Input() dataCount = 'all';
  @Input() theme: 'default' | 'dark' = 'default';

  @HostBinding('class.dark')
  get isDarkTheme(): boolean {
    return this.theme === 'dark';
  }

  originalData: ChartData[] = [];
  data: ChartData[] = [];
  view: [number, number] = [700, 700];

  animations = true;
  min = 0;
  max = 50000;
  units = '';
  angleSpan = 240;
  startAngle = -120;
  showAxis = true;
  margin = [10, 10, 10, 10];
  tooltipDisabled = false;
  showText = true;
  colorScheme: any = { domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5'] };

  private configSub?: Subscription;
  private readonly mediatorSub?: Subscription;
  private readonly resizeObserver: ResizeObserver;

  constructor(
    private readonly el: ElementRef,
    private readonly mediator: MediatorService,
    private readonly helper: ChartHelperService
  ) {
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        this.view = [width, width];
      }
    });

    this.mediatorSub = this.mediator.events$
      .pipe(
        filter(
          event =>
            (event.type === 'updateSource' && event.widgetId === this.widgetId) ||
            (event.type === 'updateCount' && event.dataSource === this.dataSource)
        )
      )
      .subscribe(event => this.handleMediatorEvent(event));
  }

  ngOnInit(): void {
    this.loadConfig();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource'] && !changes['dataSource'].isFirstChange()) {
      this.loadConfig();
    }
    if (changes['dataCount'] && !changes['dataCount'].isFirstChange()) {
      this.updateDisplayedData();
    }
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
    this.configSub?.unsubscribe();
    this.mediatorSub?.unsubscribe();
  }

  private loadConfig(): void {
    this.configSub?.unsubscribe();
    this.configSub = this.helper
      .loadChartConfig('sharedChart', this.dataSource)
      .subscribe({
        next: config => this.processConfig(config),
        error: err => this.handleConfigError(err),
      });
  }

  private processConfig(config: ChartConfig): void {
    this.theme = config.theme;
    this.view = config.view;
    this.originalData = [...config.data];
    this.updateDisplayedData();
  }

  private handleConfigError(error: any): void {
    console.error('Error loading gaugeChart config:', error);
    this.originalData = [];
    this.updateDisplayedData();
  }

  private updateDisplayedData(): void {
    if (!this.originalData.length) {
      this.data = [];
      return;
    }
    this.data =
      this.dataCount === 'all'
        ? [...this.originalData]
        : this.originalData.slice(0, Number(this.dataCount));
  }

  private handleMediatorEvent(event: any): void {
    if (event.type === 'updateSource' && event.widgetId === this.widgetId) {
      this.loadConfig();
    } else if (event.type === 'updateCount' && event.dataSource === this.dataSource) {
      this.dataCount = event.dataCount;
      this.updateDisplayedData();
    }
  }

  onSelect(event: any): void {
    this.mediator.emit({
      origin: 'gauge-chart',
      type: 'select',
      payload: event,
      dataSource: this.dataSource,
      widgetId: this.widgetId,
    });
  }
}
