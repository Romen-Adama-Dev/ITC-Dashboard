import { Component, Input, HostBinding } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-gauge-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.scss']
})
export class GaugeChartComponent {
  @Input() theme: 'default' | 'dark' = 'default';
  @Input()
  data: { name: string; value: number; extra?: any }[] = [
    { name: "Italy", value: 35800, extra: { code: "it" } },
    { name: "Åland Islands", value: 33545 },
    { name: "Yemen", value: 38407 },
    { name: "Trinidad and Tobago", value: 26319 },
    { name: "Liechtenstein", value: 44046 },
    { name: "Malaysia", value: 44114 },
    { name: "Indonesia", value: 37569 },
    { name: "Norfolk Island", value: 48302 },
    { name: "Bahrain", value: 35618 },
    { name: "Philippines", value: 37412 },
    { name: "Turks and Caicos Islands", value: 17567 },
    { name: "Guinea-Bissau", value: 49279 },
    { name: "Tuvalu", value: 15674 }
  ];

  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }
  
  // Chart dimensions
  view: [number, number] = [700, 400];

  // Gauge chart options (bindings for largeSegments and smallSegments have been removed)
  animations: boolean = true;
  min: number = 0;
  max: number = 50000;
  units: string = "";
  angleSpan: number = 240;
  startAngle: number = -120;
  showAxis: boolean = true;
  margin: number[] = [10, 10, 10, 10];
  tooltipDisabled: boolean = false;
  showText: boolean = true;

  // Color scheme
  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5']
  };

  onSelect(event: any): void {
    console.log(event);
  }
}