import {
  Component,
  Input,
  HostBinding,
  ElementRef,
  OnInit,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Subscription, filter } from 'rxjs';
import { MediatorService } from '../../../../../application/services/mediator.service';
import { ChartHelperService } from '../../../../../application/services/chart-helper.service';
import { ChartConfig, ChartData } from '../../../../../infrastructure/api/chart.model';

@Component({
  selector: 'app-horizontal-bar-chart',
  standalone: true,
  imports: [NgxChartsModule, HttpClientModule],
  templateUrl: './horizontal-chart.component.html',
  styleUrls: ['./horizontal-chart.component.scss']
})
export class HorizontalBarChartComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() theme: 'default' | 'dark' = 'default';
  @Input() dataSource: string = '/assets/datasets/data-set-1.json';
  @Input() dataCount: string = 'all';
  @Input() graphqlEndpoint?: string;
  @Input() graphqlQuery?: string;

  @HostBinding('class.dark')
  get isDarkTheme(): boolean {
    return this.theme === 'dark';
  }

  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Value';
  showYAxisLabel = true;
  yAxisLabel = 'Name';

  colorScheme: any = {
    name: 'customScheme',
    selectable: true,
    group: 'Ordinal',
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  data: ChartData[] = [];
  originalData: ChartData[] = [];

  private readonly resizeObserver: ResizeObserver;
  private configSub?: Subscription;
  private readonly mediatorSub: Subscription;

  constructor(
    private readonly el: ElementRef,
    private readonly http: HttpClient,
    private readonly helper: ChartHelperService,
    private readonly mediator: MediatorService
  ) {
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        this.view = [width, width * (400 / 700)];
      }
    });

    this.mediatorSub = this.mediator.events$
      .pipe(filter(event => event.origin !== 'horizontal-bar'))
      .subscribe(event => {
        const config = this.helper.processEvent(event, {
          theme: this.theme,
          view: this.view,
          data: this.originalData
        });
        this.theme = config.theme;
        this.view = config.view;
        this.originalData = config.data;
        this.updateDisplayedData();
      });
  }

  ngOnInit(): void {
    this.loadConfig();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataCount'] && !changes['dataCount'].isFirstChange()) {
      this.updateDisplayedData();
    }
    if (changes['dataSource'] && !changes['dataSource'].isFirstChange()) {
      this.loadConfig();
    }
  }

  private loadConfig(): void {
    this.configSub?.unsubscribe();

    if (this.graphqlEndpoint && this.graphqlQuery) {
      this.configSub = this.http.post<any>(this.graphqlEndpoint, { query: this.graphqlQuery })
        .subscribe({
          next: res => this.applyConfig(res.data.horizontalBarChart),
          error: err => console.error('Error loading via GraphQL', err)
        });
    } else {
      this.configSub = this.helper
        .loadChartConfig('horizontalBarChart', this.dataSource)
        .subscribe({
          next: config => this.applyConfig(config),
          error: err => console.error('Error loading chart config', err)
        });
    }
  }

  private applyConfig(config: ChartConfig): void {
    this.theme = config.theme;
    this.view = config.view;
    this.originalData = [...config.data];
    this.updateDisplayedData();
  }

  private updateDisplayedData(): void {
    if (!this.originalData.length) {
      this.data = [];
      return;
    }

    if (this.dataCount !== 'all') {
      const count = Number(this.dataCount);
      this.data = count > this.originalData.length
        ? [...this.originalData]
        : this.originalData.slice(0, count);
    } else {
      this.data = [...this.originalData];
    }
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
    this.configSub?.unsubscribe();
    this.mediatorSub.unsubscribe();
  }

  onSelect(event: any): void {
    console.log(event);
    this.mediator.emit({ origin: 'horizontal-bar', type: 'select', payload: event });
  }
}
