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
import { LegendPosition, NgxChartsModule, BoxChartModule } from '@swimlane/ngx-charts';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { MediatorService } from '../../../../../application/services/mediator.service';
import { ChartHelperService } from '../../../../../application/services/chart-helper.service';

@Component({
  selector: 'app-box-chart',
  standalone: true,
  imports: [NgxChartsModule, BoxChartModule],
  templateUrl: './box-chart.component.html',
  styleUrls: ['./box-chart.component.scss']
})
export class BoxChartComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() theme: 'default' | 'dark' = 'default';
  @Input() dataSource: string = '/assets/data-set-1.json';
  @Input() dataCount: string = 'all';

  public data: any[] = [];
  public originalData: any[] = [];

  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  view: [number, number] = [600, 600];
  animations = true;
  legend = false;
  legendTitle = 'Legend';
  legendPosition: LegendPosition = LegendPosition.Right;
  xAxis = true;
  yAxis = true;
  showGridLines = true;
  roundDomains = false;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Value';
  tooltipDisabled = false;
  roundEdges = true;
  strokeColor = '#FFFFFF';
  strokeWidth = 2;

  colorScheme: any = {
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
        this.view = [width, width];
      }
    });

    this.mediator.events$
      .pipe(filter(e => e.origin !== 'box-chart'))
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
        if (config?.charts?.boxChart) {
          const boxChart = config.charts.boxChart;
          this.theme = boxChart.theme;
          this.view = boxChart.view;
          this.originalData = boxChart.data;
        } else {
          this.originalData = [];
        }
        this.updateDisplayedData();
      },
      error => {
        console.error('Error loading data-set-1.json:', error);
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
      this.data =
        count > this.originalData.length
          ? [...this.originalData]
          : this.originalData.slice(0, count);
    } else {
      this.data = [...this.originalData];
    }
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  onSelect(event: any): void {
    this.mediator.emit({
      origin: 'box-chart',
      type: 'select',
      payload: event
    });
  }
}