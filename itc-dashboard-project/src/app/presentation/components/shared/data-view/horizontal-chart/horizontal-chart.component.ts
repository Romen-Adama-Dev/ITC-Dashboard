import { Component, Input, HostBinding, ElementRef, OnInit, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ChartHelperService } from '../../../../../application/services/chart-helper.service';
import { ChartConfig, ChartData } from '../chart.model';

@Component({
  selector: 'app-horizontal-bar-chart',
  standalone: true,
  imports: [NgxChartsModule, HttpClientModule],
  templateUrl: './horizontal-chart.component.html',
  styleUrls: ['./horizontal-chart.component.scss']
})
export class HorizontalBarChartComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() theme: 'default' | 'dark' = 'default';
  @Input() dataSource: string = '/assets/data-set-1.json';
  // Nuevo Input para cantidad de datos a mostrar
  @Input() dataCount: string = 'all';
  @Input() graphqlEndpoint?: string;
  @Input() graphqlQuery?: string;

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

  data: ChartData[] = [];
  originalData: ChartData[] = [];

  private resizeObserver: ResizeObserver;
  private configSubscription!: Subscription;

  constructor(
    private el: ElementRef, 
    private chartHelper: ChartHelperService,
    private http: HttpClient
  ) {
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const height = width * (400 / 700);
        this.view = [width, height];
      }
    });
  }

  ngOnInit(): void {
    if (this.graphqlEndpoint && this.graphqlQuery) {
      this.configSubscription = this.http.post<any>(this.graphqlEndpoint, { query: this.graphqlQuery })
        .subscribe(
          result => {
            const config: ChartConfig = result.data.horizontalBarChart;
            this.applyConfig(config);
          },
          error => {
            console.error('Error loading chart config via GraphQL', error);
          }
        );
    } else {
      this.configSubscription = this.chartHelper
        .loadChartConfig('horizontalBarChart', this.dataSource)
        .subscribe(
          config => {
            this.applyConfig(config);
          },
          error => {
            console.error('Error loading chart config', error);
          }
        );
    }
  }

  applyConfig(config: ChartConfig): void {
    this.originalData = config.data.slice();
    this.updateDisplayedData();
    this.view = config.view;
    this.theme = config.theme;
  }

  updateDisplayedData(): void {
    if (this.originalData && this.originalData.length > 0) {
      if (this.dataCount !== 'all') {
        const count = Number(this.dataCount);
        if (count > this.originalData.length) {
          console.warn(`Requested ${count} items but only ${this.originalData.length} available. Showing all.`);
          this.data = [...this.originalData];
        } else {
          this.data = this.originalData.slice(0, count);
        }
      } else {
        this.data = [...this.originalData];
      }
      console.log(`Displaying ${this.data.length} items:`, this.data);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataCount'] && !changes['dataCount'].isFirstChange()) {
      this.updateDisplayedData();
    }
    if (changes['dataSource'] && !changes['dataSource'].isFirstChange()) {
      if (this.configSubscription) {
        this.configSubscription.unsubscribe();
      }
      this.configSubscription = this.chartHelper
        .loadChartConfig('horizontalBarChart', this.dataSource)
        .subscribe(
          config => {
            this.applyConfig(config);
          },
          error => {
            console.error('Error loading chart config', error);
          }
        );
    }
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