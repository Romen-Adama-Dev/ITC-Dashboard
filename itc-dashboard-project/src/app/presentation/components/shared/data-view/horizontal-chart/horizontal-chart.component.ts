// src/app/presentation/components/shared/data-view/horizontal-chart/horizontal-chart.component.ts
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
  get isDarkTheme() {
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

  private resizeObserver: ResizeObserver;
  private configSub?: Subscription;
  private mediatorSub: Subscription;

  constructor(
    private el: ElementRef,
    private http: HttpClient,
    private helper: ChartHelperService,
    private mediator: MediatorService
  ) {
    // Auto‐resize keeping aspect ratio
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        this.view = [w, w * (400 / 700)];
      }
    });

    // React to global events (except those we originate)
    this.mediatorSub = this.mediator.events$
      .pipe(filter(e => e.origin !== 'horizontal-bar'))
      .subscribe(event => {
        const cfg = this.helper.processEvent(event, {
          theme: this.theme,
          view: this.view,
          data: this.originalData
        });
        this.theme = cfg.theme;
        this.view = cfg.view as [number, number];
        this.originalData = cfg.data;
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
    // Unsubscribe previous
    this.configSub?.unsubscribe();

    // GraphQL vs JSON
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
          next: cfg => this.applyConfig(cfg),
          error: err => console.error('Error loading chart config', err)
        });
    }
  }

  private applyConfig(config: ChartConfig): void {
    this.theme = config.theme;
    this.view = config.view;
    this.originalData = config.data.slice();
    this.updateDisplayedData();
  }

  private updateDisplayedData(): void {
    if (!this.originalData.length) {
      this.data = [];
      return;
    }
    if (this.dataCount !== 'all') {
      const cnt = Number(this.dataCount);
      this.data = cnt > this.originalData.length
        ? [...this.originalData]
        : this.originalData.slice(0, cnt);
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