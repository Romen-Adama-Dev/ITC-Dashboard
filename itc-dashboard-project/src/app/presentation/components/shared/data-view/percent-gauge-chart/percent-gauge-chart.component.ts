import { Component, Input, HostBinding, ElementRef } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-percent-gauge-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './percent-gauge-chart.component.html',
  styleUrls: ['./percent-gauge-chart.component.scss']
})
export class PercentGaugeChartComponent {
  @Input() theme: 'default' | 'dark' = 'default';
  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }
  
  // Dimensiones del gráfico
  view: [number, number] = [700, 400];
  
  // Opciones del Percent Gauge Chart
  animations: boolean = true;
  value: number = 70;      // Valor actual (en porcentaje)
  max: number = 100;       // Valor máximo
  target: number = 80;     // Valor objetivo
  showLabel: boolean = true;
  
  // Esquema de colores
  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB']
  };
  
  onSelect(event: any): void {
    console.log(event);
  }
    private resizeObserver: ResizeObserver;
  
    constructor(private el: ElementRef) {
      this.resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          const width = entry.contentRect.width;
          // Maintain the aspect ratio 499/749
          const height = width * (499 / 749);
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
}