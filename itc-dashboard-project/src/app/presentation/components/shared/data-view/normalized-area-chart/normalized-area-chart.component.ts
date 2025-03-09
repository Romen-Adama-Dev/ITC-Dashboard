import { Component, Input, HostBinding, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { curveLinear } from 'd3-shape';

@Component({
  selector: 'app-normalized-area-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './normalized-area-chart.component.html',
  styleUrls: ['./normalized-area-chart.component.scss']
})
export class NormalizedAreaChartComponent implements AfterViewInit, OnDestroy {
  @Input() theme: 'default' | 'dark' = 'default';
  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  view: [number, number] = [700, 400];
  animations: boolean = true;
  legend: boolean = true;
  legendTitle: string = 'Legend';
  legendPosition: LegendPosition = LegendPosition.Right;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Census Date';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Normalized GDP Per Capita';
  autoScale: boolean = true;
  timeline: boolean = false;
  showGridLines: boolean = true;
  curve = curveLinear;
  roundDomains: boolean = false;
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
        { name: '2010', value: 62000000 },
        { name: '2011', value: 73000000 },
        { name: '2012', value: 89400000 }
      ]
    },
    {
      name: 'USA',
      series: [
        { name: '2010', value: 250000000 },
        { name: '2011', value: 309000000 },
        { name: '2012', value: 311000000 }
      ]
    },
    {
      name: 'France',
      series: [
        { name: '2010', value: 58000000 },
        { name: '2011', value: 50000020 },
        { name: '2012', value: 58000000 }
      ]
    },
    {
      name: 'UK',
      series: [
        { name: '2010', value: 57000000 },
        { name: '2011', value: 62000000 },
        { name: '2012', value: 72000000 }
      ]
    }
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