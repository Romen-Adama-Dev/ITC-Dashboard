import { Component, Input, HostBinding, ElementRef, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { ChartsJson } from '../chart.model';

@Component({
  selector: 'app-horizontal-bar-chart',
  standalone: true,
  imports: [NgxChartsModule, HttpClientModule],
  templateUrl: './horizontal-chart.component.html',
  styleUrls: ['./horizontal-chart.component.scss']
})
export class HorizontalBarChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() theme: 'default' | 'dark' = 'default';
  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  view: [number, number] = [700, 400];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Población';
  showYAxisLabel = true;
  yAxisLabel = 'País';

  colorScheme: any = {
    name: 'customScheme',
    selectable: true,
    group: 'Ordinal',
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  data: any[] = [];

  private resizeObserver: ResizeObserver;

  constructor(private el: ElementRef, private http: HttpClient) {
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const height = width * (400 / 700);
        this.view = [width, height];
      }
    });
  }

  ngOnInit(): void {
    this.http.get<ChartsJson>('/assets/data.json').subscribe(
      response => {
        if (response && response.charts && response.charts.horizontalBarChart) {
          this.data = response.charts.horizontalBarChart.data;
          this.view = response.charts.horizontalBarChart.view;
          this.theme = response.charts.horizontalBarChart.theme;
        } else {
          console.error('La respuesta no contiene horizontalBarChart');
        }
      },
      error => {
        console.error('Error al cargar el JSON', error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  onSelect(event: any): void {
    console.log(event);
  }
}