import {
  Component,
  Input,
  HostBinding,
  ElementRef,
  OnInit,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { MediatorService } from '../../../../../application/services/mediator.service';
import { ChartHelperService } from '../../../../../application/services/chart-helper.service';

@Component({
  selector: 'app-bubble-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.scss']
})
export class BubbleChartComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() theme: 'default' | 'dark' = 'default';
  @Input() dataSource: string = '/assets/data-set-1.json';
  @Input() dataCount: string = 'all';

  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  view: [number, number] = [700, 400];
  animations = true;
  legend = true;
  legendTitle = 'Legend';
  legendPosition: LegendPosition = LegendPosition.Right;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'X Axis';
  showYAxisLabel = true;
  yAxisLabel = 'Y Axis';
  showGridLines = true;
  roundDomains = false;
  autoScale = true;
  minRadius = 5;
  maxRadius = 20;
  tooltipDisabled = false;
  trimXAxisTicks = true;
  trimYAxisTicks = true;
  rotateXAxisTicks = true;
  maxXAxisTickLength = 16;
  maxYAxisTickLength = 16;
  wrapTicks = false;

  originalData: any[] = [];
  data: any[] = [];

  colorScheme: any = {
    name: 'customScheme',
    selectable: true,
    group: 'Ordinal',
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  private readonly resizeObserver: ResizeObserver;

  constructor(
    private readonly el: ElementRef,
    private readonly http: HttpClient,
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

    this.mediator.events$
      .pipe(filter(e => e.origin !== 'bubble-chart'))
      .subscribe(event => {
        const cfg = this.helper.processEvent(event, {
          theme: this.theme,
          view: this.view,
          data: this.originalData
        });
        this.theme = cfg.theme;
        this.view = cfg.view;
        this.originalData = cfg.data;
        this.updateDisplayedData();
      });
  }

  ngOnInit(): void {
    this.loadConfig();
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataCount'] && !changes['dataCount'].isFirstChange()) {
      this.updateDisplayedData();
    }
    if (changes['dataSource'] && !changes['dataSource'].isFirstChange()) {
      this.loadConfig();
    }
  }

  loadConfig(): void {
    const ds = this.dataSource?.trim() ? this.dataSource : '/assets/data-set-1.json';
    this.http.get<any>(ds).subscribe(
      config => {
        if (config?.charts?.bubbleChart) {
          const bubbleChart = config.charts.bubbleChart;
          this.theme = bubbleChart.theme;
          this.view = bubbleChart.view;
          this.originalData = bubbleChart.data;
        } else {
          this.originalData = [];
        }
        this.updateDisplayedData();
      },
      error => {
        console.error('Error loading bubble chart config:', error);
        this.originalData = [];
        this.updateDisplayedData();
      }
    );
  }

  updateDisplayedData(): void {
    if (!this.originalData?.length) {
      this.data = [];
      return;
    }
    if (this.dataCount !== 'all') {
      const count = Number(this.dataCount);
      this.data = this.originalData.map(item => ({
        ...item,
        series: Array.isArray(item.series) ? item.series.slice(0, count) : []
      }));
    } else {
      this.data = [...this.originalData];
    }
  }

  onSelect(event: any): void {
    this.mediator.emit({
      origin: 'bubble-chart',
      type: 'select',
      payload: event
    });
  }
}