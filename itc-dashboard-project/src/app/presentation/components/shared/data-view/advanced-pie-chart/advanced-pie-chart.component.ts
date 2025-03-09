import { Component, Input, HostBinding, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-advanced-pie-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './advanced-pie-chart.component.html',
  styleUrls: ['./advanced-pie-chart.component.scss']
})
export class AdvancedPieChartComponent implements AfterViewInit, OnDestroy {
  @Input() theme: 'default' | 'dark' = 'default';
  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  // Tamaño inicial; se actualizará con el ResizeObserver
  view: [number, number] = [700, 700];

  animations = true;
  gradient = false;
  tooltipDisabled = false;

  data = [
    { name: 'Germany', value: 40632 },
    { name: 'USA', value: 50000 },
    { name: 'France', value: 36745 }
  ];

  colorScheme: any = {
    name: 'customScheme',
    selectable: true,
    group: 'Ordinal',
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  private resizeObserver: ResizeObserver;

  constructor(private el: ElementRef) {
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        // Para un gráfico de pastel, usamos el ancho para ambos valores (cuadrado)
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