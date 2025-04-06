import { Component, Input, HostBinding, ElementRef, OnInit, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClient } from '@angular/common/http';
import { curveLinear } from 'd3-shape';

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

  // Tamaño inicial, se ajusta manteniendo la relación de aspecto: 400/700 ≈ 0.5714
  view: [number, number] = [700, 400];

  animations: boolean = true;
  legend: boolean = true;
  legendTitle: string = 'Legend';
  legendPosition: LegendPosition = LegendPosition.Right;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'X Axis';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Y Axis';
  showGridLines: boolean = true;
  roundDomains: boolean = false;
  autoScale: boolean = true;
  minRadius: number = 5;
  maxRadius: number = 20;
  tooltipDisabled: boolean = false;
  trimXAxisTicks: boolean = true;
  trimYAxisTicks: boolean = true;
  rotateXAxisTicks: boolean = true;
  maxXAxisTickLength: number = 16;
  maxYAxisTickLength: number = 16;
  wrapTicks: boolean = false;

  // Datos originales y los datos que se muestran (posiblemente filtrados)
  originalData: any[] = [];
  data: any[] = [];

  colorScheme: any = {
    name: 'customScheme',
    selectable: true,
    group: 'Ordinal',
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  private resizeObserver: ResizeObserver;

  constructor(private el: ElementRef, private http: HttpClient) {
    // Se establece la relación de aspecto: height = width * (400/700)
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const height = width * (400 / 700);
        this.view = [width, height];
      }
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
    const ds = this.dataSource && this.dataSource.trim() ? this.dataSource : '/assets/data-set-1.json';
    this.http.get<any>(ds).subscribe(config => {
      if (config?.charts?.bubbleChart) {
        const bubbleChart = config.charts.bubbleChart;
        this.theme = bubbleChart.theme;
        this.view = bubbleChart.view;
        this.originalData = bubbleChart.data;
      }
      this.updateDisplayedData();
    }, error => {
      console.error('Error loading bubble chart config:', error);
      this.updateDisplayedData();
    });
  }

  updateDisplayedData(): void {
    if (this.originalData && this.originalData.length > 0) {
      if (this.dataCount !== 'all') {
        const count = Number(this.dataCount);
        // Para cada elemento, se truncan las series a "count" elementos
        this.data = this.originalData.map(item => ({
          ...item,
          series: item.series.slice(0, count)
        }));
      } else {
        this.data = [...this.originalData];
      }
    }
  }

  onSelect(event: any): void {
    console.log(event);
  }
}