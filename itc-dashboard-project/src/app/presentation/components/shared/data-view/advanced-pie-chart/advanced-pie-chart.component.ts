import { Component, Input, HostBinding, ElementRef, OnInit, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-advanced-pie-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './advanced-pie-chart.component.html',
  styleUrls: ['./advanced-pie-chart.component.scss']
})
export class AdvancedPieChartComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() theme: 'default' | 'dark' = 'default';
  @Input() dataSource: string = '/assets/data-set-1.json';
  @Input() dataCount: string = 'all';

  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  // Tamaño inicial; se actualizará con el ResizeObserver
  view: [number, number] = [700, 700];
  animations = true;
  gradient = false;
  tooltipDisabled = false;

  // Datos para mostrar y datos originales completos
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
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        // Para un gráfico de pastel, usamos el ancho para ambos valores (cuadrado)
        this.view = [width, width];
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
      if (config?.charts?.advancedPieChart) {
        const advancedChart = config.charts.advancedPieChart;
        this.theme = advancedChart.theme;
        this.view = advancedChart.view;
        this.originalData = advancedChart.data;
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