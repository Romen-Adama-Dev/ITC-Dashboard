import { Component, Input, HostBinding } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-linear-gauge-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './linear-gauge-chart.component.html',
  styleUrls: ['./linear-gauge-chart.component.scss']
})
export class LinearGaugeChartComponent {
  @Input() theme: 'default' | 'dark' = 'default';
  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }
  
  // Dimensions of the chart
  view: [number, number] = [700, 400];
  
  // Linear Gauge options
  value: number = 75;
  previousValue: number = 50;
  min: number = 0;
  max: number = 100;
  units: string = '%';
  animations: boolean = true;
  
  // Color scheme
  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#CFC0BB', '#7aa3e5']
  };

  onSelect(event: any): void {
    console.log(event);
  }
}