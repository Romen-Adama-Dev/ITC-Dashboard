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
import { Subscription } from 'rxjs';
import { MediatorService } from '../../../../../application/services/mediator.service';
import { ChartHelperService } from '../../../../../application/services/chart-helper.service';
import { ChartConfig, ChartData } from '../../../../../domain/entities/chart.model';

@Component({
  selector: 'app-advanced-pie-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './advanced-pie-chart.component.html',
  styleUrls: ['./advanced-pie-chart.component.scss']
})
export class AdvancedPieChartComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges
{
  @Input() widgetId!: number;
  @Input() theme: 'default' | 'dark' = 'default';
  @Input() dataSource = '/assets/datasets/data-set-1.json';
  @Input() dataCount = 'all';

  @HostBinding('class.dark')
  get isDarkTheme(): boolean {
    return this.theme === 'dark';
  }

  view: [number, number] = [700, 700];
  animations = true;
  gradient = false;
  tooltipDisabled = false;

  data: ChartData[] = [];
  private originalData: ChartData[] = [];
  private configSub?: Subscription;
  private readonly mediatorSub?: Subscription;

  colorScheme: any = {
    name: 'customScheme',
    selectable: true,
    group: 'Ordinal',
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  private readonly resizeObserver: ResizeObserver;

  constructor(
    private readonly el: ElementRef,
    private readonly mediator: MediatorService,
    private readonly helper: ChartHelperService
  ) {
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        this.view = [width, width];
      }
    });

    this.mediatorSub = this.mediator.events$.subscribe(event => {
      // 1) Si es updateSource y coincide widgetId, recargar solo este widget
      if (
        event.type === 'updateSource' &&
        event.widgetId === this.widgetId
      ) {
        this.reloadConfig();
      }
      // 2) Si es updateCount y coincide dataSource, actualizar dataCount en todos
      if (
        event.type === 'updateCount' &&
        event.dataSource === this.dataSource
      ) {
        this.dataCount = event.dataCount;
        this.updateDisplayedData();
      }
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
    const ds = this.dataSource.trim() || '/assets/datasets/data-set-1.json';
    this.configSub?.unsubscribe();
    this.configSub = this.helper
      .loadChartConfig('sharedChart', ds)
      .subscribe({
        next: config => this.applyConfig(config),
        error: err => console.error('Error loading config:', err)
      });
  }

  private reloadConfig(): void {
    this.configSub?.unsubscribe();
    this.loadConfig();
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
      this.data =
        count > this.originalData.length
          ? [...this.originalData]
          : this.originalData.slice(0, count);
    } else {
      this.data = [...this.originalData];
    }
  }

  onSelect(event: any): void {
    this.mediator.emit({ type: 'select', payload: event });
  }
}