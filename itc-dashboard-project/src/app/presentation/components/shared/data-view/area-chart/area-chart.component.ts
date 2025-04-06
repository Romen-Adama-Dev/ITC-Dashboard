import { Component, Input, HostBinding, ElementRef, OnInit, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClient } from '@angular/common/http';
import { curveLinear } from 'd3-shape';

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

  // Tamaño inicial, se actualizará dinámicamente
  view: [number, number] = [749, 499];

  animations: boolean = true;
  legend: boolean = true;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  autoScale: boolean = true;
  timeline: boolean = false;
  curve = curveLinear;

  // Datos para el gráfico y copia de la data completa
  data: any[] = [];
  originalData: any[] = [];

  colorScheme: any = {
    name: 'customScheme',
    selectable: true,
    group: 'Ordinal',
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  private resizeObserver: ResizeObserver;

  constructor(private el: ElementRef, private http: HttpClient) {
    // Mantiene la relación de aspecto (499/749)
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const height = width * (499 / 749);
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
      // Se espera que el JSON tenga la propiedad charts.areaChart
      if (config?.charts?.areaChart) {
        const areaChart = config.charts.areaChart;
        this.theme = areaChart.theme;
        this.view = areaChart.view;
        this.originalData = areaChart.data;
        this.updateDisplayedData();
      }
    }, error => {
      console.error('Error loading data-set-1.json:', error);
    });
  }

  updateDisplayedData(): void {
    if (this.originalData && this.originalData.length > 0) {
      if (this.dataCount !== 'all') {
        const count = Number(this.dataCount);
        if (count > this.originalData.length) {
          this.data = [...this.originalData];
        } else {
          this.data = this.originalData.slice(0, count);
        }
      } else {
        this.data = [...this.originalData];
      }
    }
  }

  onSelect(event: any): void {
    console.log(event);
  }
}