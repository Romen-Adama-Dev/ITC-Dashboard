import { Component, Input, HostBinding, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-gauge-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.scss']
})
export class GaugeChartComponent implements AfterViewInit, OnDestroy {
  @Input() theme: 'default' | 'dark' = 'default';
  @Input()
  data: { name: string; value: number; extra?: any }[] = [
    { name: "Italy", value: 35800, extra: { code: "it" } },
    { name: "Åland Islands", value: 33545 },
    { name: "Yemen", value: 38407 },
    { name: "Trinidad and Tobago", value: 26319 },
    { name: "Liechtenstein", value: 44046 },
    { name: "Malaysia", value: 44114 },
    { name: "Indonesia", value: 37569 },
    { name: "Norfolk Island", value: 48302 },
    { name: "Bahrain", value: 35618 },
    { name: "Philippines", value: 37412 },
    { name: "Turks and Caicos Islands", value: 17567 },
    { name: "Guinea-Bissau", value: 49279 },
    { name: "Tuvalu", value: 15674 }
  ];

  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }
  
  // Tamaño del gráfico, se actualizará dinámicamente para mantener un contenedor cuadrado
  view: [number, number] = [700, 700];

  // Opciones del Gauge Chart
  animations: boolean = true;
  min: number = 0;
  max: number = 50000;
  units: string = "";
  angleSpan: number = 240;
  startAngle: number = -120;
  showAxis: boolean = true;
  margin: number[] = [10, 10, 10, 10];
  tooltipDisabled: boolean = false;
  showText: boolean = true;

  // Esquema de colores
  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5']
  };

  private resizeObserver: ResizeObserver;

  constructor(private el: ElementRef) {
    // Se utiliza el ancho del contenedor para definir un área cuadrada.
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        this.view = [width, width];
      }
    });
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