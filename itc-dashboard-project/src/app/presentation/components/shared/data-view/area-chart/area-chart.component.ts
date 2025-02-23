import { Component, Input, HostBinding } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { curveLinear } from 'd3-shape';

@Component({
  selector: 'app-area-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss']
})
export class AreaChartComponent {
  @Input() theme: 'default' | 'dark' = 'default';
  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  view: [number, number] = [700, 400];
  animations: boolean = true;
  legend: boolean = true;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  autoScale: boolean = true;
  timeline: boolean = false;
  curve = curveLinear;

  data = [
    {
      name: 'Germany',
      series: [
        { name: '2010', value: 7300000 },
        { name: '2011', value: 8940000 },
        { name: '2012', value: 8200000 }
      ]
    },
    {
      name: 'USA',
      series: [
        { name: '2010', value: 7870000 },
        { name: '2011', value: 8270000 },
        { name: '2012', value: 8500000 }
      ]
    },
    {
      name: 'France',
      series: [
        { name: '2010', value: 5000002 },
        { name: '2011', value: 5800000 },
        { name: '2012', value: 6000000 }
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