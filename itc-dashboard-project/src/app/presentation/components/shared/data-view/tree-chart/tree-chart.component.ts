import { Component, Input, HostBinding, ElementRef } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-tree-map',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './tree-chart.component.html',
  styleUrls: ['./tree-chart.component.scss']
})
export class TreeMapComponent {
  @Input() theme: 'default' | 'dark' = 'default';
  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }
  
  view: [number, number] = [700, 400];
  animations: boolean = true;
  
  results: any[] = [
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

  colorScheme: any = {
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