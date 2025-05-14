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
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClient } from '@angular/common/http';
import { curveLinear } from 'd3-shape';
import { filter } from 'rxjs/operators';
import { MediatorService } from '../../../../../application/services/mediator.service';
import { ChartHelperService } from '../../../../../application/services/chart-helper.service';

@Component({
  selector: 'app-area-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss']
})
export class AreaChartComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() theme: 'default' | 'dark' = 'default';
  @Input() dataSource: string = '/assets/data-set-1.json';
  @Input() dataCount: string = 'all';

  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  view: [number, number] = [749, 499];
  animations = true;
  legend = true;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Year';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
  autoScale = true;
  timeline = false;
  curve = curveLinear;

  data: any[] = [];
  originalData: any[] = [];

  colorScheme: any = {
    name: 'customScheme',
    selectable: true,
    group: 'Ordinal',
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  private resizeObserver: ResizeObserver;

  constructor(
    private el: ElementRef,
    private http: HttpClient,
    private mediator: MediatorService,
    private helper: ChartHelperService
  ) {
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const height = width * (499 / 749);
        this.view = [width, height];
      }
    });

    this.mediator.events$
      .pipe(filter(e => e.origin !== 'area-chart'))
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
        if (config?.charts?.areaChart) {
          const areaChart = config.charts.areaChart;
          this.theme = areaChart.theme;
          this.view = areaChart.view;
          this.originalData = areaChart.data;
          this.updateDisplayedData();
        }
      },
      error => {
        console.error('Error loading data-set-1.json:', error);
      }
    );
  }

  updateDisplayedData(): void {
    if (!this.originalData?.length) return;
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

  onSelect(event: any): void {
    this.mediator.emit({
      origin: 'area-chart',
      type: 'select',
      payload: event
    });
  }
}