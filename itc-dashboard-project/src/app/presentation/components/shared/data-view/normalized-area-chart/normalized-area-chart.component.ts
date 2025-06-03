import {
  Component,
  Input,
  HostBinding,
  ElementRef,
  OnInit,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { curveLinear } from 'd3-shape';
import { Subscription, filter } from 'rxjs';
import { MediatorService } from '../../../../../application/services/mediator.service';
import { ChartHelperService } from '../../../../../application/services/chart-helper.service';
import { ChartConfig } from '../../../../../domain/entities/chart.model';

@Component({
  selector: 'app-normalized-area-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './normalized-area-chart.component.html',
  styleUrls: ['./normalized-area-chart.component.scss']
})
export class NormalizedAreaChartComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() widgetId!: number;
  @Input() theme: 'default' | 'dark' = 'default';
  @Input() dataSource: string = '/assets/datasets/data-set-1.json';
  @Input() dataCount: string = 'all';

  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  view: [number, number] = [700, 400];
  animations = true;
  legend = true;
  legendTitle = 'Legend';
  legendPosition: LegendPosition = LegendPosition.Right;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Census Date';
  showYAxisLabel = true;
  yAxisLabel = 'Normalized GDP Per Capita';
  autoScale = true;
  timeline = false;
  showGridLines = true;
  curve = curveLinear;
  roundDomains = false;
  tooltipDisabled = false;
  trimXAxisTicks = true;
  trimYAxisTicks = true;
  rotateXAxisTicks = true;
  maxXAxisTickLength = 16;
  maxYAxisTickLength = 16;
  wrapTicks = false;

  colorScheme: any = {
    name: 'customScheme',
    selectable: true,
    group: 'Ordinal',
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  originalData: any[] = [];
  data: any[] = [];

  private readonly resizeObserver: ResizeObserver;
  private configSub?: Subscription;
  private readonly mediatorSub: Subscription;

  constructor(
    private readonly el: ElementRef,
    private readonly helper: ChartHelperService,
    private readonly mediator: MediatorService
  ) {
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        this.view = [width, Math.round(width * (400 / 700))];
      }
    });

    this.mediatorSub = this.mediator.events$
      .pipe(filter(event => event.origin !== 'normalized-area-chart'))
      .subscribe(event => {
        if (
          event.type === 'updateCount' &&
          event.dataSource === this.dataSource
        ) {
          this.dataCount = event.dataCount;
          this.updateDisplayedData();
        }
        if (
          event.type === 'updateSource' &&
          event.widgetId === this.widgetId
        ) {
          this.dataSource = event.dataSource;
          this.loadConfig();
        }
        if (
          event.type === 'updateAppearance' &&
          event.widgetId === this.widgetId
        ) {
          const cfg = this.helper.setAppearance(event.appearance, {
            theme: this.theme,
            view: this.view,
            data: this.originalData
          });
          this.theme = cfg.theme;
          this.view = cfg.view;
          this.originalData = cfg.data;
          this.updateDisplayedData();
        }
      });
  }

  ngOnInit(): void {
    this.loadConfig();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['dataSource']?.previousValue !==
      changes['dataSource']?.currentValue
    ) {
      this.loadConfig();
    }
    if (
      changes['dataCount']?.previousValue !==
      changes['dataCount']?.currentValue
    ) {
      this.updateDisplayedData();
    }
  }

  private loadConfig(): void {
    this.configSub?.unsubscribe();
    this.configSub = this.helper
      .loadChartConfig('normalizedAreaChart', this.dataSource)
      .subscribe({
        next: config => this.applyConfig(config),
        error: err => console.error('Error loading normalized area config', err)
      });
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
    this.data = this.dataCount === 'all'
      ? [...this.originalData]
      : this.originalData.slice(0, Number(this.dataCount));
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
    this.mediator.emit({
      origin: 'normalized-area-chart',
      type: 'select',
      payload: event
    });
  }
}