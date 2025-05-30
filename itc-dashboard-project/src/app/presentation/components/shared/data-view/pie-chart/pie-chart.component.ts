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
import { NgxChartsModule, LegendPosition } from '@swimlane/ngx-charts';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ChartHelperService } from '../../../../../application/services/chart-helper.service';
import { MediatorService } from '../../../../../application/services/mediator.service';
import { ChartData } from '../../../../../domain/entities/chart.model';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgxChartsModule, HttpClientModule],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() theme: 'default' | 'dark' = 'default';
  @Input() dataSource: string = '/assets/datasets/data-set-1.json';
  @Input() dataCount: string = 'all';

  @HostBinding('class.dark')
  get isDarkTheme(): boolean {
    return this.theme === 'dark';
  }

  view: [number, number] = [700, 400];
  animations = true;
  gradient = false;
  legend = true;
  legendTitle = 'Legend';
  legendPosition: LegendPosition = LegendPosition.Right;

  colorScheme: any = {
    name: 'customScheme',
    selectable: true,
    group: 'Ordinal',
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  originalData: ChartData[] = [];
  data: ChartData[] = [];

  private readonly resizeObserver: ResizeObserver;
  private configSub?: Subscription;

  constructor(
    private readonly el: ElementRef,
    private readonly helper: ChartHelperService,
    private readonly mediator: MediatorService
  ) {
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        this.view = [width, width * (400 / 700)];
      }
    });

    this.mediator.events$
      .pipe(filter(event => event.origin !== 'pie-chart'))
      .subscribe(event => this.handleMediatorEvent(event));
  }

  ngOnInit(): void {
    this.loadConfig();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource']?.previousValue !== changes['dataSource']?.currentValue) {
      this.loadConfig();
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
    this.configSub?.unsubscribe();
  }

  private loadConfig(): void {
    this.configSub?.unsubscribe();
    this.configSub = this.helper
      .loadChartConfig('pieChart', this.dataSource)
      .subscribe(cfg => {
        this.theme = cfg.theme;
        this.view = cfg.view;
        this.originalData = cfg.data;
        this.updateDisplayedData();
      });
  }

  private updateDisplayedData(): void {
    if (this.dataCount === 'all') {
      this.data = [...this.originalData];
    } else {
      const count = Number(this.dataCount);
      this.data = count > this.originalData.length
        ? [...this.originalData]
        : this.originalData.slice(0, count);
    }
  }

  private handleMediatorEvent(event: any): void {
    const config = this.helper.processEvent(event, {
      theme: this.theme,
      view: this.view,
      data: this.originalData
    });
    this.theme = config.theme;
    this.view = config.view;
    this.originalData = config.data;
    this.updateDisplayedData();
  }

  onSelect(event: any): void {
    this.mediator.emit({
      origin: 'pie-chart',
      type: 'select',
      payload: event
    });
  }
}
