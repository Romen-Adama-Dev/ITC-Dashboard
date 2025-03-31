import { Component, Input, HostBinding, ElementRef, OnInit, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ChartData, ChartConfig, ChartsJson } from '../../../../../infrastructure/api/chart.model';

@Component({
  selector: 'app-vertical-chart',
  standalone: true,
  imports: [NgxChartsModule, HttpClientModule],
  templateUrl: './vertical-chart.component.html',
  styleUrls: ['./vertical-chart.component.scss']
})
export class VerticalBarChartComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() theme: 'default' | 'dark' = 'default';
  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  // Fuente de datos y configuración
  @Input() dataSource: string = '/assets/datasets/data.json';
  // Nuevo Input para especificar la cantidad de datos a mostrar: "1", "2" o "all"
  private _dataCount: string = 'all';
  @Input()
  set dataCount(value: string) {
    this._dataCount = value ? value : 'all';
    console.log('Setter dataCount:', this._dataCount);
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

  // Datos que se mostrarán en el gráfico y data original sin filtrar
  data: ChartData[] = [];
  originalData: ChartData[] = [];

  private resizeObserver: ResizeObserver;
  private configSubscription: any;

  constructor(private el: ElementRef, private http: HttpClient) {
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        // Ajusta el ratio para vertical bar chart (por ejemplo, 499/749)
        const height = width * (499 / 749);
        this.view = [width, height];
      }
    });
  }

  ngOnInit(): void {
    this.http.get<ChartsJson>(this.dataSource).subscribe(
      response => {
        if (response && response.charts && response.charts.verticalBarChart) {
          const config: ChartConfig = response.charts.verticalBarChart;
          this.originalData = config.data.slice();
          console.log('Loaded original data:', this.originalData);
          this.updateDisplayedData();
          this.view = config.view;
          this.theme = config.theme;
        } else {
          console.error('La respuesta no contiene verticalBarChart');
        }
      },
      error => {
        console.error('Error al cargar el JSON', error);
      }
    );
  }

  updateDisplayedData(): void {
    console.log('Updating displayed data with dataCount:', this.dataCount);
    if (this.originalData && this.originalData.length > 0) {
      if (this.dataCount !== 'all') {
        const count = Number(this.dataCount);
        if (count > this.originalData.length) {
          console.warn(`Requested ${count} items, but only ${this.originalData.length} available. Showing all.`);
          this.data = [...this.originalData];
        } else {
          this.data = this.originalData.slice(0, count);
        }
      } else {
        this.data = [...this.originalData];
      }
      console.log(`Displaying ${this.data.length} items:`, this.data);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataCount'] && !changes['dataCount'].isFirstChange()) {
      this.updateDisplayedData();
    }
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
  }

  onSelect(event: any): void {
    console.log(event);
  }
}