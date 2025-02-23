import { Component, Input, HostBinding, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-grouped-horizontal-bar-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './grouped-horizontal-bar-chart.component.html',
  styleUrls: ['./grouped-horizontal-bar-chart.component.scss']
})
export class GroupedHorizontalBarChartComponent implements AfterViewInit {
  @Input() theme: 'default' | 'dark' = 'default';
  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Valor';
  showYAxisLabel = true;
  yAxisLabel = 'País';

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

  primaryBackground = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const computedStyle = getComputedStyle(this.el.nativeElement);
    const primaryColor = computedStyle.getPropertyValue('--primary-color').trim() || '#0768A9';
    let rgba: string;
    if (primaryColor.startsWith('#') && primaryColor.length === 7) {
      const r = parseInt(primaryColor.slice(1, 3), 16);
      const g = parseInt(primaryColor.slice(3, 5), 16);
      const b = parseInt(primaryColor.slice(5, 7), 16);
      rgba = `rgba(${r},${g},${b},0.5)`;
    } else {
      rgba = primaryColor;
    }
    this.primaryBackground = rgba;

    setTimeout(() => {
      const groups = this.el.nativeElement.querySelectorAll('.bar-group');
      groups.forEach((group: any) => {
        const bbox = group.getBBox();
        const rect = this.renderer.createElement('rect', 'svg');
        this.renderer.setAttribute(rect, 'x', bbox.x.toString());
        this.renderer.setAttribute(rect, 'y', bbox.y.toString());
        this.renderer.setAttribute(rect, 'width', bbox.width.toString());
        this.renderer.setAttribute(rect, 'height', bbox.height.toString());
        this.renderer.setStyle(rect, 'fill', this.primaryBackground);
        group.insertBefore(rect, group.firstChild);
      });
    }, 0);
  }

  onSelect(event: any): void {
    console.log(event);
  }
}