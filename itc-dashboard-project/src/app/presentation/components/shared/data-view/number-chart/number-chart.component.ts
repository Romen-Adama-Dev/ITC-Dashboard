import { Component, Input, HostBinding } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-number-cards',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './number-chart.component.html',
  styleUrls: ['./number-chart.component.scss']
})
export class NumberCardsComponent {
  @Input() theme: 'default' | 'dark' = 'default';
  @Input()
  data: { name: string; value: number; extra?: any }[] = [
    { "name": "Italy", "value": 35800, "extra": { "code": "it" } },
    { "name": "Åland Islands", "value": 33545 },
    { "name": "Yemen", "value": 38407 },
    { "name": "Trinidad and Tobago", "value": 26319 },
    { "name": "Liechtenstein", "value": 44046 },
    { "name": "Malaysia", "value": 44114 },
    { "name": "Indonesia", "value": 37569 },
    { "name": "Norfolk Island", "value": 48302 },
    { "name": "Bahrain", "value": 35618 },
    { "name": "Philippines", "value": 37412 },
    { "name": "Turks and Caicos Islands", "value": 17567 },
    { "name": "Guinea-Bissau", "value": 49279 },
    { "name": "Tuvalu", "value": 15674 }
  ];

  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  // Dimensiones del gráfico
  view: [number, number] = [700, 400];

  animations: boolean = true;

  // Esquema de colores
  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  onSelect(event: any): void {
    console.log(event);
  }
}