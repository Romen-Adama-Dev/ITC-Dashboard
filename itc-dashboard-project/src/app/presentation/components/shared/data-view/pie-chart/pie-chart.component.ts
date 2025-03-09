import { Component, Input, HostBinding, ElementRef } from '@angular/core';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {
  @Input() theme: 'default' | 'dark' = 'default';
  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  view: [number, number] = [700, 400];
  animations = true;
  gradient = false;
  legend = true;
  legendTitle: string = 'Legend';
  legendPosition: LegendPosition = LegendPosition.Right;

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

      private resizeObserver: ResizeObserver;
    
      constructor(private el: ElementRef) {
        this.resizeObserver = new ResizeObserver(entries => {
          for (const entry of entries) {
            const width = entry.contentRect.width;
            // Maintain the aspect ratio 499/749
            const height = width * (499 / 749);
            this.view = [width, height];
          }
        });
      }
    
      ngAfterViewInit(): void {
        this.resizeObserver.observe(this.el.nativeElement);
      }
    
      ngOnDestroy(): void {
        this.resizeObserver.disconnect();
      }
}