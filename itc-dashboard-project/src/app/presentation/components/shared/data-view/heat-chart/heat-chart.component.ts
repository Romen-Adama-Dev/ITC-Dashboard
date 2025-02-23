import { Component, Input, HostBinding } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-heat-map',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './heat-chart.component.html',
  styleUrls: ['./heat-chart.component.scss']
})
export class HeatMapComponent {
  @Input() theme: 'default' | 'dark' = 'default';
  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }
  
  // Dimensiones del gráfico
  view: [number, number] = [700, 400];
  
  // Opciones del gráfico
  gradient: boolean = true;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  legend: boolean = true;
  
  // Datos para el Heat Map
  data: any[] = [
    {
      "name": "United Kingdom",
      "series": [
        { "name": "2010", "value": 36240, "extra": { "code": "uk" } },
        { "name": "2000", "value": 32543, "extra": { "code": "uk" } },
        { "name": "1990", "value": 26424, "extra": { "code": "uk" } }
      ]
    },
    {
      "name": "Turkey",
      "series": [
        { "name": "1990", "value": 33894 },
        { "name": "2000", "value": 26387 },
        { "name": "2010", "value": 10916 }
      ]
    },
    {
      "name": "Saudi Arabia",
      "series": [
        { "name": "1990", "value": 12579 },
        { "name": "2000", "value": 32520 },
        { "name": "2010", "value": 28852 }
      ]
    },
    {
      "name": "Liechtenstein",
      "series": [
        { "name": "1990", "value": 14732 },
        { "name": "2000", "value": 57619 },
        { "name": "2010", "value": 49982 }
      ]
    },
    {
      "name": "Malaysia",
      "series": [
        { "name": "1990", "value": 37357 },
        { "name": "2000", "value": 25844 },
        { "name": "2010", "value": 57426 }
      ]
    },
    {
      "name": "Norfolk Island",
      "series": [
        { "name": "1990", "value": 22428 },
        { "name": "2000", "value": 13784 },
        { "name": "2010", "value": 36384 }
      ]
    },
    {
      "name": "Bahrain",
      "series": [
        { "name": "1990", "value": 28321 },
        { "name": "2000", "value": 49935 },
        { "name": "2010", "value": 28892 }
      ]
    },
    {
      "name": "Philippines",
      "series": [
        { "name": "1990", "value": 24177 },
        { "name": "2000", "value": 16630 },
        { "name": "2010", "value": 14643 }
      ]
    },
    {
      "name": "Turks and Caicos Islands",
      "series": [
        { "name": "1990", "value": 25791 },
        { "name": "2000", "value": 21104 },
        { "name": "2010", "value": 32130 }
      ]
    },
    {
      "name": "Guinea-Bissau",
      "series": [
        { "name": "1990", "value": 13778 },
        { "name": "2000", "value": 44881 },
        { "name": "2010", "value": 29573 }
      ]
    },
    {
      "name": "Tuvalu",
      "series": [
        { "name": "1990", "value": 31437 },
        { "name": "2000", "value": 12095 },
        { "name": "2010", "value": 46248 }
      ]
    }
  ];
  
  // Esquema de colores para el Heat Map
  colorScheme: any = {
    domain: ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3']
  };

  onSelect(event: any): void {
    console.log(event);
  }
}