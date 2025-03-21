import { Component, Input, HostBinding, ElementRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ChartHelperService } from '../../../../../application/services/chart-helper.service';
import { ChartConfig } from '../chart.model';

@Component({
  selector: 'app-horizontal-bar-chart',
  standalone: true,
  imports: [NgxChartsModule, HttpClientModule],
  templateUrl: './horizontal-chart.component.html',
  styleUrls: ['./horizontal-chart.component.scss']
})
export class HorizontalBarChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() theme: 'default' | 'dark' = 'default';
  @Input() dataSource: string = '/assets/data-set-1.json';
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
  private configSubscription!: Subscription;

  constructor(private el: ElementRef, private chartHelper: ChartHelperService) {
    // Ajusta el tamaño del gráfico según el ancho del contenedor
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const height = width * (400 / 700);
        this.view = [width, height];
      }
    });
  }

  ngOnInit(): void {
    // Carga la configuración del gráfico horizontal usando el helper
    this.configSubscription = this.chartHelper
      .loadChartConfig('horizontalBarChart', this.dataSource)
      .subscribe(
        (config: ChartConfig) => {
          this.data = config.data;
          this.view = config.view;
          this.theme = config.theme;
        },
        error => {
          console.error('Error loading chart config', error);
        }
      );
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
  }

  onSelect(event: any): void {
    console.log(event);
  }
}