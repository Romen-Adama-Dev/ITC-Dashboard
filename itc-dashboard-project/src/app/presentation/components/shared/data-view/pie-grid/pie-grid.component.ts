import { Component, Input, HostBinding, ElementRef } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-pie-grid',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './pie-grid.component.html',
  styleUrls: ['./pie-grid.component.scss']
})
export class PieGridComponent {
  @Input() theme: 'default' | 'dark' = 'default';
  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  view: [number, number] = [700, 400];
  animations = true;
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