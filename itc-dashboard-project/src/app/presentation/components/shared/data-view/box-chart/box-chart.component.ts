import { Component, Input, HostBinding } from '@angular/core';
import { LegendPosition, NgxChartsModule, BoxChartModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-box-chart',
  standalone: true,
  imports: [NgxChartsModule, BoxChartModule],
  templateUrl: './box-chart.component.html',
  styleUrls: ['./box-chart.component.scss']
})
export class BoxChartComponent {
  @Input() theme: 'default' | 'dark' = 'default';
  @Input()
  data: { 
    name: string; 
    series: { name: string; min: number; max: number; median: number; value: number; }[]; 
  }[] = [
    {
      name: "Colombia",
      series: [
        { name: "2019", value: 12, min: 12, max: 12, median: 12 },
        { name: "2020", value: 23, min: 23, max: 23, median: 23 },
        { name: "2021", value: 34, min: 34, max: 34, median: 34 },
        { name: "2022", value: 27, min: 27, max: 27, median: 27 },
        { name: "2023", value: 18, min: 18, max: 18, median: 18 },
        { name: "2024", value: 45, min: 45, max: 45, median: 45 }
      ]
    },
    {
      name: "Chile",
      series: [
        { name: "2019", value: 20, min: 20, max: 20, median: 20 },
        { name: "2020", value: 28, min: 28, max: 28, median: 28 },
        { name: "2021", value: 42, min: 42, max: 42, median: 42 },
        { name: "2022", value: 39, min: 39, max: 39, median: 39 },
        { name: "2023", value: 31, min: 31, max: 31, median: 31 },
        { name: "2024", value: 61, min: 61, max: 61, median: 61 }
      ]
    },
    {
      name: "Perú",
      series: [
        { name: "2019", value: 47, min: 47, max: 47, median: 47 },
        { name: "2020", value: 62, min: 62, max: 62, median: 62 },
        { name: "2021", value: 55, min: 55, max: 55, median: 55 },
        { name: "2022", value: 42, min: 42, max: 42, median: 42 },
        { name: "2023", value: 49, min: 49, max: 49, median: 49 },
        { name: "2024", value: 71, min: 71, max: 71, median: 71 }
      ]
    }
  ];

  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  // Dimensiones del gráfico
  view: [number, number] = [600, 400];

  // Opciones del gráfico
  animations: boolean = true;
  legend: boolean = false;
  legendTitle: string = 'Legend';
  legendPosition: LegendPosition = LegendPosition.Right;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showGridLines: boolean = true;
  roundDomains: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Value';
  tooltipDisabled: boolean = false;
  roundEdges: boolean = true;
  strokeColor: string = '#FFFFFF';
  strokeWidth: number = 2;

  // Esquema de colores
  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  onSelect(event: any): void {
    console.log(event);
  }
}