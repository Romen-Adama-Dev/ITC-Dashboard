import { Component, Input, HostBinding } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-grouped-vertical-bar-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './grouped-vertical-bar-chart.component.html',
  styleUrls: ['./grouped-vertical-bar-chart.component.scss']
})
export class GroupedVerticalBarChartComponent {
  @Input() theme: 'default' | 'dark' = 'default';
  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'País';
  showYAxisLabel = true;
  yAxisLabel = 'Valor';

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

  onSelect(event: any): void {
    console.log(event);
  }
}