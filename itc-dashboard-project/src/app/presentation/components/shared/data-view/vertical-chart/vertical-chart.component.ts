import { Component, Input, HostBinding } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-vertical-chart',
  standalone: true,
    imports: [NgxChartsModule],
  templateUrl: './vertical-chart.component.html',
  styleUrl: './vertical-chart.component.scss'
})
export class VerticalBarChartComponent {
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
  yAxisLabel = 'Población';

  colorScheme: any = {
    name: 'customScheme',
    selectable: true,
    group: 'Ordinal',
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  data = [
    { name: 'Estados Unidos', value: 5000000 },
    { name: 'Reino Unido', value: 3000000 },
    { name: 'Francia', value: 2000000 }
  ];

  onSelect(event: any): void {
    console.log(event);
  }
}