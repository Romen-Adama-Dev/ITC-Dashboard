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
import { MediatorService } from '../../../../../application/services/mediator.service';
import { ChartHelperService } from '../../../../../application/services/chart-helper.service';
import { ChartData } from '../../../../../domain/entities/chart.model';

@Component({
  selector: 'app-vertical-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './vertical-chart.component.html',
  styleUrls: ['./vertical-chart.component.scss']
})
export class VerticalBarChartComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() widgetId!: number;
  @Input() theme: 'default' | 'dark' = 'default';
  @Input() dataSource = '/assets/datasets/data-set-1.json';

  private _dataCount = 'all';
  @Input()
  set dataCount(value: string) {
    this._dataCount = value || 'all';
    this.updateDisplayedData();
  }
  get dataCount(): string {
    return this._dataCount;
  }

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
  xAxisLabel = 'Valor';
  showYAxisLabel = true;
  yAxisLabel = 'Población';

  colorScheme: any = {
    name: 'customScheme',
    selectable: true,
    group: 'Ordinal',
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  data: ChartData[] = [];
  private originalData: ChartData[] = [];
  private configSub?: Subscription;
  private readonly mediatorSub?: Subscription;
  private readonly resizeObserver: ResizeObserver;

  constructor(
    private readonly el: ElementRef,
    private readonly mediator: MediatorService,
    private readonly helper: ChartHelperService
  ) {
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const height = width * (400 / 700);
        this.view = [width, height];
      }
    });

    this.mediatorSub = this.mediator.events$.subscribe(event => {
      if (
        event.type === 'updateCount' &&
        event.dataSource === this.dataSource
      ) {
        this.dataCount = event.dataCount;
        this.updateDisplayedData();
      }
      if (
        event.type === 'updateSource' &&
        event.widgetId === this.widgetId &&
        event.dataSource === this.dataSource
      ) {
        this.reloadConfig();
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
      this.reloadConfig();
    }
    if (
      changes['dataCount']?.previousValue !==
      changes['dataCount']?.currentValue
    ) {
      this.updateDisplayedData();
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
    const ds = this.dataSource.trim() || '/assets/datasets/data-set-1.json';
    this.configSub?.unsubscribe();
    this.configSub = this.helper.loadChartConfig('sharedChart', ds).subscribe({
      next: config => {
        this.theme = config.theme;
        this.view = config.view;
        this.originalData = [...config.data];
        this.updateDisplayedData();
      },
      error: err => {
        console.error('Error cargando configuración:', err);
      }
    });
  }

  private reloadConfig(): void {
    this.configSub?.unsubscribe();
    this.loadConfig();
  }

  private updateDisplayedData(): void {
    if (!this.originalData.length) {
      this.data = [];
      return;
    }
    this.data =
      this.dataCount === 'all'
        ? [...this.originalData]
        : this.originalData.slice(0, Number(this.dataCount) || this.originalData.length);
  }

  onSelect(event: any): void {
    this.mediator.emit({ type: 'select', payload: event });
  }
}