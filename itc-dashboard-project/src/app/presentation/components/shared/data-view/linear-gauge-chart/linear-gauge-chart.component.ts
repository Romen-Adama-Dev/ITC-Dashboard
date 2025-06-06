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
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule } from '@angular/common/http';
import { Subscription, filter } from 'rxjs';
import { MediatorService } from '../../../../../application/services/mediator.service';
import { ChartHelperService } from '../../../../../application/services/chart-helper.service';
import { ChartConfig } from '../../../../../domain/entities/chart.model';

@Component({
  selector: 'app-linear-gauge-chart',
  standalone: true,
  imports: [NgxChartsModule, HttpClientModule],
  templateUrl: './linear-gauge-chart.component.html',
  styleUrls: ['./linear-gauge-chart.component.scss']
})
export class LinearGaugeChartComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() widgetId!: number;
  @Input() theme: 'default' | 'dark' = 'default';
  @Input() dataSource: string = '/assets/datasets/data-set-1.json';
  @Input() dataCount: string = 'all';

  @HostBinding('class.dark')
  get isDarkTheme(): boolean {
    return this.theme === 'dark';
  }

  view: [number, number] = [700, 400];
  value = 0;
  previousValue = 0;
  min = 0;
  max = 100;
  units = '' + '%';
  animations = true;

  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#CFC0BB', '#7aa3e5']
  };

  private readonly resizeObserver: ResizeObserver;
  private configSub?: Subscription;
  private readonly mediatorSub: Subscription;
  private originalData: { name: string; value: number }[] = [];

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
      .pipe(filter(event => event.origin !== 'linear-gauge-chart'))
      .subscribe(event => {
        if (
          event.type === 'updateCount' &&
          event.dataSource === this.dataSource
        ) {
          this.dataCount = event.dataCount;
          this.updateDisplayedValues();
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
          this.originalData = cfg.data as typeof this.originalData;
          this.updateDisplayedValues();
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
      this.updateDisplayedValues();
    }
  }

  private loadConfig(): void {
    this.configSub?.unsubscribe();
    this.configSub = this.helper
      .loadChartConfig('linearGaugeChart', this.dataSource)
      .subscribe({
        next: config => this.applyConfig(config),
        error: err => console.error('Error loading linear gauge config', err)
      });
  }

  private applyConfig(config: ChartConfig): void {
    this.theme = config.theme;
    this.view = config.view;
    this.originalData = [...config.data] as { name: string; value: number }[];
    this.updateDisplayedValues();
  }

  private updateDisplayedValues(): void {
    const slice =
      this.dataCount === 'all'
        ? this.originalData
        : this.originalData.slice(0, Number(this.dataCount));

    this.value = slice[0]?.value ?? this.value;
    this.previousValue = slice[1]?.value ?? this.previousValue;
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
      origin: 'linear-gauge-chart',
      type: 'select',
      payload: event
    });
  }
}