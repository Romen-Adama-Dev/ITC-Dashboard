import { Component, Input, HostBinding, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-horizontal-bar-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './horizontal-chart.component.html',
  styleUrls: ['./horizontal-chart.component.scss']
})
export class HorizontalBarChartComponent implements AfterViewInit, OnDestroy {
  @Input() theme: 'default' | 'dark' = 'default';
  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  // Responsive dimensions: default ratio 400/700 (≈0.5714)
  view: [number, number] = [700, 400];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Población';
  showYAxisLabel = true;
  yAxisLabel = 'País';

  colorScheme: any = {
    name: 'customScheme',
    selectable: true,
    group: 'Ordinal',
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  data = [
    { name: 'Estados Unidos', value: 5000000 },
    { name: 'Reino Unido', value: 3000000 },
    { name: 'Francia', value: 2000000 }
  ];

  private resizeObserver: ResizeObserver;

  constructor(private el: ElementRef) {
    // Crea un ResizeObserver para ajustar dinámicamente las dimensiones del gráfico.
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        // Calcula la altura manteniendo la relación de aspecto original (400/700).
        const height = width * (400 / 700);
        this.view = [width, height];
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