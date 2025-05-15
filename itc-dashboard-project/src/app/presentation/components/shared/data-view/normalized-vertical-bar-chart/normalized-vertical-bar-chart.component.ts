// src/app/presentation/components/shared/data-view/normalized-vertical-bar-chart/normalized-vertical-bar-chart.component.ts
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
import { NgxChartsModule, LegendPosition } from '@swimlane/ngx-charts';
import { Subscription, filter } from 'rxjs';
import { MediatorService } from '../../../../../application/services/mediator.service';
import { ChartHelperService } from '../../../../../application/services/chart-helper.service';
import { ChartConfig } from '../../../../../infrastructure/api/chart.model';

@Component({
  selector: 'app-normalized-vertical-bar-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './normalized-vertical-bar-chart.component.html',
  styleUrls: ['./normalized-vertical-bar-chart.component.scss']
})
export class NormalizedVerticalBarChartComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  /** Inputs reactivos */
  @Input() theme: 'default' | 'dark' = 'default';
  @Input() dataSource: string = '/assets/datasets/data-set-1.json';
  @Input() dataCount: string = 'all';

  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  /** Configuración del gráfico */
  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  animations = true;
  legend = true;
  legendTitle = 'Legend';
  legendPosition: LegendPosition = LegendPosition.Right;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Normalized Value';
  noBarWhenZero = true;
  barPadding = 8;

  colorScheme: any = {
    name: 'customScheme',
    selectable: true,
    group: 'Ordinal',
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  /** Datos internos */
  originalData: any[] = [];
  data: any[] = [];

  private resizeObserver: ResizeObserver;
  private configSub?: Subscription;
  private mediatorSub: Subscription;

  constructor(
    private el: ElementRef,
    private helper: ChartHelperService,
    private mediator: MediatorService
  ) {
    // Observador para redimensionar el gráfico manteniendo proporción 400/700
    this.resizeObserver = new ResizeObserver(entries => {
      for (const e of entries) {
        const w = e.contentRect.width;
        this.view = [w, w * (400 / 700)];
      }
    });

    // Escuchar eventos globales (excluyendo los propios)
    this.mediatorSub = this.mediator.events$
      .pipe(filter(ev => ev.origin !== 'normalized-vertical-bar-chart'))
      .subscribe(ev => {
        const cfg = this.helper.processEvent(ev, {
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
    if (changes['dataSource'] && !changes['dataSource'].isFirstChange()) {
      this.loadConfig();
    }
    if (changes['dataCount'] && !changes['dataCount'].isFirstChange()) {
      this.updateDisplayedData();
    }
  }

  private loadConfig(): void {
    this.configSub?.unsubscribe();
    this.configSub = this.helper
      .loadChartConfig('normalizedVerticalBarChart', this.dataSource)
      .subscribe({
        next: cfg => this.applyConfig(cfg),
        error: err => console.error('Error loading normalized vertical bar config', err)
      });
  }

  private applyConfig(cfg: ChartConfig): void {
    this.theme = cfg.theme;
    this.view = cfg.view;
    this.originalData = cfg.data.slice();
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
    this.mediator.emit({
      origin: 'normalized-vertical-bar-chart',
      type: 'select',
      payload: event
    });
  }
}