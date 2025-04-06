import { Component, Input, HostBinding, ElementRef, OnInit, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { LegendPosition, NgxChartsModule, BoxChartModule } from '@swimlane/ngx-charts';
import { HttpClient } from '@angular/common/http';

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

  // Propiedad para almacenar los datos que se mostrarán en el gráfico.
  public data: any[] = [];
  // Propiedad para guardar la data completa obtenida del JSON.
  public originalData: any[] = [];

  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  view: [number, number] = [600, 600];
  animations: boolean = true;
  legend: boolean = false;
  legendTitle: string = 'Legend';
  legendPosition: LegendPosition = LegendPosition.Right;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showGridLines: boolean = true;
  roundDomains: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Value';
  tooltipDisabled: boolean = false;
  roundEdges: boolean = true;
  strokeColor: string = '#FFFFFF';
  strokeWidth: number = 2;

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  private resizeObserver: ResizeObserver;

  constructor(private el: ElementRef, private http: HttpClient) {
    // Ajusta el tamaño del gráfico para mantener un aspecto cuadrado
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        this.view = [width, width];
      }
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
    const ds = this.dataSource && this.dataSource.trim() ? this.dataSource : '/assets/data-set-1.json';
    this.http.get<any>(ds).subscribe(config => {
      if (config?.charts?.boxChart) {
        const boxChart = config.charts.boxChart;
        this.theme = boxChart.theme;
        this.view = boxChart.view;
        this.originalData = boxChart.data;
      } else {
        // Si no se encuentra la configuración para boxChart, se deja originalData vacía o se puede asignar un valor por defecto.
        this.originalData = [];
      }
      this.updateDisplayedData();
    }, error => {
      console.error('Error loading data-set-1.json:', error);
      this.originalData = [];
      this.updateDisplayedData();
    });
  }

  updateDisplayedData(): void {
    if (this.originalData && this.originalData.length > 0) {
      if (this.dataCount !== 'all') {
        const count = Number(this.dataCount);
        this.data = count > this.originalData.length ? [...this.originalData] : this.originalData.slice(0, count);
      } else {
        this.data = [...this.originalData];
      }
    } else {
      this.data = [];
    }
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  onSelect(event: any): void {
    console.log(event);
  }
}