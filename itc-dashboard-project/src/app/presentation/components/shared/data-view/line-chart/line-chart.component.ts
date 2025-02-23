import { Component, Input, HostBinding } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {
  @Input() theme: 'default' | 'dark' = 'default';
  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  view: [number, number] = [700, 400];
  animations = true;
  legend = true;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Year';
  showYAxisLabel = true;
  yAxisLabel = 'Value';
  autoScale = true;
  timeline = false;

  data = [
    {
      "name": "Germany",
      "series": [
        { "name": "2010", "value": 7300000 },
        { "name": "2011", "value": 8940000 },
        { "name": "2012", "value": 8200000 }
      ]
    },
    {
      "name": "USA",
      "series": [
        { "name": "2010", "value": 7870000 },
        { "name": "2011", "value": 8270000 },
        { "name": "2012", "value": 8500000 }
      ]
    },
    {
      "name": "France",
      "series": [
        { "name": "2010", "value": 5000002 },
        { "name": "2011", "value": 5800000 },
        { "name": "2012", "value": 6000000 }
      ]
    }
  ];

  colorScheme: any = {
    name: 'customScheme',
    selectable: true,
    group: 'Ordinal',
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  onSelect(event: any): void {
    console.log(event);
  }
}