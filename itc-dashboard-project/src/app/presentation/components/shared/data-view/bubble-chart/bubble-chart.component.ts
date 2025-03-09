import { Component, Input, HostBinding, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-bubble-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.scss']
})
export class BubbleChartComponent implements AfterViewInit, OnDestroy {
  @Input() theme: 'default' | 'dark' = 'default';
  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  // Tamaño inicial; se actualizará manteniendo la relación 400/700 (aprox. 0.5714)
  view: [number, number] = [700, 400];

  animations: boolean = true;
  legend: boolean = true;
  legendTitle: string = 'Legend';
  legendPosition: LegendPosition = LegendPosition.Right;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'X Axis';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Y Axis';
  showGridLines: boolean = true;
  roundDomains: boolean = false;
  autoScale: boolean = true;
  // Específico de bubble chart
  minRadius: number = 5;
  maxRadius: number = 20;
  tooltipDisabled: boolean = false;
  trimXAxisTicks: boolean = true;
  trimYAxisTicks: boolean = true;
  rotateXAxisTicks: boolean = true;
  maxXAxisTickLength: number = 16;
  maxYAxisTickLength: number = 16;
  wrapTicks: boolean = false;

  data = [
    {
      name: 'Germany',
      series: [
        { name: '2010', x: 2010, y: 7300000, r: 10 },
        { name: '2011', x: 2011, y: 8940000, r: 12 }
      ]
    },
    {
      name: 'USA',
      series: [
        { name: '2010', x: 2010, y: 7870000, r: 8 },
        { name: '2011', x: 2011, y: 8270000, r: 10 }
      ]
    },
    {
      name: 'France',
      series: [
        { name: '2010', x: 2010, y: 5000002, r: 9 },
        { name: '2011', x: 2011, y: 5800000, r: 11 }
      ]
    }
  ];

  colorScheme: any = {
    name: 'customScheme',
    selectable: true,
    group: 'Ordinal',
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  private resizeObserver: ResizeObserver;

  constructor(private el: ElementRef) {
    // Se establece la relación de aspecto: altura = ancho * (400/700)
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
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  onSelect(event: any): void {
    console.log(event);
  }
}