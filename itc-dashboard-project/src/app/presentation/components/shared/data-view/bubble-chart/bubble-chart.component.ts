import { Component, Input, HostBinding } from '@angular/core';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-bubble-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.scss']
})
export class BubbleChartComponent {
  @Input() theme: 'default' | 'dark' = 'default';
  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  // Chart dimensions
  view: [number, number] = [700, 400];

  // Chart options
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
  // Specific to bubble charts
  minRadius: number = 5;
  maxRadius: number = 20;
  tooltipDisabled: boolean = false;
  trimXAxisTicks: boolean = true;
  trimYAxisTicks: boolean = true;
  rotateXAxisTicks: boolean = true;
  maxXAxisTickLength: number = 16;
  maxYAxisTickLength: number = 16;
  wrapTicks: boolean = false;

  // Sample data for bubble chart (each bubble has x, y and r properties)
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

  onSelect(event: any): void {
    console.log(event);
  }
}