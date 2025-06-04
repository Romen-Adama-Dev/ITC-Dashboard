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
import { Subscription, filter } from 'rxjs';
import { MediatorService } from '../../../../../application/services/mediator.service';
import { ChartHelperService } from '../../../../../application/services/chart-helper.service';
import { ChartConfig, SeriesChartData } from '../../../../../domain/entities/chart.model';

@Component({
  selector: 'app-area-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss']
})
export class AreaChartComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() theme: 'default' | 'dark' = 'default';
  @Input() dataSource: string = '/assets/data-set-1.json';
  @Input() dataCount: string = 'all';

  @HostBinding('class.dark')
  get isDarkTheme(): boolean {
    return this.theme === 'dark';
  }

  view: [number, number] = [749, 499];
  animations = true;
  legend = true;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Year';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
  autoScale = true;
  timeline = false;
  curve = false;

  data: SeriesChartData[] = [];
  private originalData: SeriesChartData[] = [];
  private configSub?: Subscription;
  private readonly mediatorSub?: Subscription;
  private readonly resizeObserver: ResizeObserver;

  readonly colorScheme: any = {
    name: 'customScheme',
    selectable: true,
    group: 'Ordinal',
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private readonly el: ElementRef,
    private readonly mediator: MediatorService,
    private readonly helper: ChartHelperService
  ) {
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const height = width * (499 / 749);
        this.view = [width, height];
      }
    });

    this.mediatorSub = this.mediator.events$
      .pipe(filter(e => e.type === 'updateAppearance' && e.dataSource === this.dataSource))
      .subscribe(event => {
        const cfg = this.helper.processEvent(event, {
          theme: this.theme,
          view: this.view,
          data: this.originalData as any
        });
        this.applyConfig(cfg);
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
      this.reloadConfig();
    }
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
    this.configSub?.unsubscribe();
    this.mediatorSub?.unsubscribe();
  }

  private loadConfig(): void {
    this.configSub?.unsubscribe();
    this.configSub = this.helper
      .loadChartConfig('areaChart', this.dataSource)
      .subscribe({
        next: config => this.applyConfig(config),
        error: err => console.error('Error cargando configuración areaChart:', err)
      });
  }

  private reloadConfig(): void {
    this.configSub?.unsubscribe();
    this.loadConfig();
  }

  private applyConfig(config: ChartConfig): void {
    this.theme = config.theme;
    this.view = [ config.view[0], config.view[1] ];
    this.originalData = config.data
      .filter((d): d is SeriesChartData => 'series' in d)
      .map(d => ({ name: d.name, series: [...d.series] }));

    this.updateDisplayedData();
  }

  private updateDisplayedData(): void {
    if (!this.originalData.length) {
      this.data = [];
      return;
    }
    if (this.dataCount !== 'all') {
      const cnt = Number(this.dataCount);
      this.data = this.originalData.slice(0, cnt);
    } else {
      this.data = [...this.originalData];
    }
  }

  onSelect(event: any): void {
    this.mediator.emit({
      type: 'select',
      payload: event,
      dataSource: this.dataSource
    });
  }
}