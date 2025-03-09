import { Component, Input, HostBinding, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-linear-gauge-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './linear-gauge-chart.component.html',
  styleUrls: ['./linear-gauge-chart.component.scss']
})
export class LinearGaugeChartComponent implements AfterViewInit, OnDestroy {
  @Input() theme: 'default' | 'dark' = 'default';
  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }
  
  view: [number, number] = [700, 400];
  value: number = 75;
  previousValue: number = 50;
  min: number = 0;
  max: number = 100;
  units: string = '%';
  animations: boolean = true;

  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#CFC0BB', '#7aa3e5']
  };

  private resizeObserver: ResizeObserver;

  constructor(private el: ElementRef) {
    // Crea un ResizeObserver para actualizar dinámicamente las dimensiones del gráfico
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        // Mantén la relación de aspecto original (400/700 ≈ 0.5714)
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