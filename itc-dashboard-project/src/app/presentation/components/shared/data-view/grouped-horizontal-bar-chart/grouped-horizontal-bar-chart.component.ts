import { Component, Input, HostBinding, AfterViewInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-grouped-horizontal-bar-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './grouped-horizontal-bar-chart.component.html',
  styleUrls: ['./grouped-horizontal-bar-chart.component.scss']
})
export class GroupedHorizontalBarChartComponent implements AfterViewInit, OnDestroy {
  @Input() theme: 'default' | 'dark' = 'default';
  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }
  
  // Dimensiones iniciales: [700, 400] y relación 400/700 (≈0.5714)
  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Valor';
  showYAxisLabel = true;
  yAxisLabel = 'País';

  data = [
    {
      name: 'Alemania',
      series: [
        { name: '2010', value: 40632 },
        { name: '2011', value: 36953 }
      ]
    },
    {
      name: 'USA',
      series: [
        { name: '2010', value: 49737 },
        { name: '2011', value: 45986 }
      ]
    },
    {
      name: 'Francia',
      series: [
        { name: '2010', value: 36745 },
        { name: '2011', value: 34774 }
      ]
    }
  ];

  colorScheme: any = {
    name: 'customScheme',
    selectable: true,
    group: 'Ordinal',
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // Color primario obtenido de las variables CSS (en formato rgba, por ejemplo)
  primaryBackground = '';

  private resizeObserver: ResizeObserver;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Se actualiza el tamaño manteniendo la relación 400/700 ≈ 0.5714
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const height = width * (400 / 700);
        this.view = [width, height];
      }
    });
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.el.nativeElement);
    // Código opcional para actualizar estilos de grupos (si es necesario)
    setTimeout(() => {
      const groups = this.el.nativeElement.querySelectorAll('.bar-group');
      groups.forEach((group: any) => {
        const bbox = group.getBBox();
        const rect = this.renderer.createElement('rect', 'svg');
        this.renderer.setAttribute(rect, 'x', bbox.x.toString());
        this.renderer.setAttribute(rect, 'y', bbox.y.toString());
        this.renderer.setAttribute(rect, 'width', bbox.width.toString());
        this.renderer.setAttribute(rect, 'height', bbox.height.toString());
        this.renderer.setStyle(rect, 'fill', this.primaryBackground);
        group.insertBefore(rect, group.firstChild);
      });
    }, 0);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  onSelect(event: any): void {
    console.log(event);
  }
}