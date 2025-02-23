import { Component, Input, HostBinding } from '@angular/core';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { curveLinear } from 'd3-shape';

@Component({
  selector: 'app-polar-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './polar-chart.component.html',
  styleUrls: ['./polar-chart.component.scss']
})
export class PolarChartComponent {
  @Input() theme: 'default' | 'dark' = 'default';
  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  view: [number, number] = [700, 300];
  animations = true;
  legend = true;
  legendTitle: string = 'Legend';
  legendPosition: LegendPosition = LegendPosition.Right;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showXAxisLabel = true;
  xAxisLabel: string = 'Census Date';
  showYAxisLabel = true;
  yAxisLabel: string = 'GDP Per Capita';
  autoScale = true;
  showGridLines = true;
  curve = curveLinear;
  roundDomains = false;
  tooltipDisabled = false;
  trimYAxisTicks = true;
  maxYAxisTickLength = 16;
  wrapTicks = false;

  data = [
    {
      name: 'Germany',
      series: [
        { name: '1990', value: 62000000 },
        { name: '2010', value: 73000000 },
        { name: '2011', value: 89400000 }
      ]
    },
    {
      name: 'USA',
      series: [
        { name: '1990', value: 250000000 },
        { name: '2010', value: 309000000 },
        { name: '2011', value: 311000000 }
      ]
    },
    {
      name: 'France',
      series: [
        { name: '1990', value: 58000000 },
        { name: '2010', value: 50000020 },
        { name: '2011', value: 58000000 }
      ]
    },
    {
      name: 'UK',
      series: [
        { name: '1990', value: 57000000 },
        { name: '2010', value: 62000000 },
        { name: '2011', value: 72000000 }
      ]
    }
  ];

  colorScheme: any = {
    name: 'customScheme',
    selectable: true,
    group: 'Ordinal',
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  onSelect(event: any) {
    console.log(event);
  }
}