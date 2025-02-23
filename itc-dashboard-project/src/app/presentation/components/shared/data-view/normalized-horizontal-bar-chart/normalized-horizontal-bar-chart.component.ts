import { Component, Input, HostBinding } from '@angular/core';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-normalized-horizontal-bar-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './normalized-horizontal-bar-chart.component.html',
  styleUrls: ['./normalized-horizontal-bar-chart.component.scss']
})
export class NormalizedHorizontalBarChartComponent {
  @Input() theme: 'default' | 'dark' = 'default';
  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }
  
  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  animations = true;
  legend = true;
  legendTitle: string = 'Legend';
  legendPosition: LegendPosition = LegendPosition.Right;
  showXAxisLabel = true;
  xAxisLabel = 'Normalized Value';
  showYAxisLabel = true;
  yAxisLabel = 'Country';
  noBarWhenZero = true;
  barPadding = 8;
  
  data = [
    {
      name: 'Germany',
      series: [
        { name: '2010', value: 7300000 },
        { name: '2011', value: 8940000 }
      ]
    },
    {
      name: 'USA',
      series: [
        { name: '2010', value: 7870000 },
        { name: '2011', value: 8270000 }
      ]
    },
    {
      name: 'France',
      series: [
        { name: '2010', value: 5000002 },
        { name: '2011', value: 5800000 }
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