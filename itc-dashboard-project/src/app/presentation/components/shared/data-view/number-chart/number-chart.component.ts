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
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MediatorService } from '../../../../../application/services/mediator.service';
import { ChartHelperService } from '../../../../../application/services/chart-helper.service';
import { ChartConfig, ChartData } from '../../../../../domain/entities/chart.model';

@Component({
  selector: 'app-number-cards',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './number-chart.component.html',
  styleUrls: ['./number-chart.component.scss']
})
export class NumberCardsComponent
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

  view: [number, number] = [749, 499];
  animations = true;
  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  originalData: ChartData[] = [];
  data: ChartData[] = [];

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
        this.view = [width, Math.round(width * (499 / 749))];
      }
    });

    this.mediatorSub = this.mediator.events$
      .pipe(filter(event => event.origin !== 'number-cards'))
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
      .loadChartConfig('numberCards', this.dataSource)
      .subscribe({
        next: config => this.applyConfig(config),
        error: err => console.error('Error loading number cards config', err)
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
      origin: 'number-cards',
      type: 'select',
      payload: event
    });
  }
}