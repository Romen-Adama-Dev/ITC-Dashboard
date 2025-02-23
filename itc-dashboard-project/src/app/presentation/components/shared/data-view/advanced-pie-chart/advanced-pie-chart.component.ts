import { Component, Input, HostBinding } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-advanced-pie-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './advanced-pie-chart.component.html',
  styleUrls: ['./advanced-pie-chart.component.scss']
})
export class AdvancedPieChartComponent {
  @Input() theme: 'default' | 'dark' = 'default';
  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  view: [number, number] = [700, 400];
  animations = true;
  gradient = false;
  tooltipDisabled = false;

  data = [
    { name: 'Germany', value: 40632 },
    { name: 'USA', value: 50000 },
    { name: 'France', value: 36745 }
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