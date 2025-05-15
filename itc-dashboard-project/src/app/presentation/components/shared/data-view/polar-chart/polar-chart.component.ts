// src/app/presentation/components/shared/data-view/polar-chart/polar-chart.component.ts
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
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { curveLinear } from 'd3-shape';
import { ChartHelperService } from '../../../../../application/services/chart-helper.service';
import { MediatorService } from '../../../../../application/services/mediator.service';
import { ChartConfig, ChartData } from '../../../../../infrastructure/api/chart.model';

@Component({
  selector: 'app-polar-chart',
  standalone: true,
  imports: [NgxChartsModule, HttpClientModule],
  templateUrl: './polar-chart.component.html',
  styleUrls: ['./polar-chart.component.scss']
})
export class PolarChartComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  /** Inputs desde el padre */
  @Input() theme: 'default' | 'dark' = 'default';
  @Input() dataSource: string = '/assets/datasets/data-set-1.json';
  @Input() dataCount: string = 'all';

  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  /** Vista y opciones de ngx-charts */
  view: [number, number] = [700, 300];
  animations = true;
  legend = true;
  legendTitle = 'Legend';
  legendPosition: LegendPosition = LegendPosition.Right;
  xAxis = true;
  yAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Census Date';
  showYAxisLabel = true;
  yAxisLabel = 'GDP Per Capita';
  autoScale = true;
  showGridLines = true;
  curve = curveLinear;
  roundDomains = false;
  tooltipDisabled = false;
  trimYAxisTicks = true;
  maxYAxisTickLength = 16;
  wrapTicks = false;

  colorScheme: any = {
    name: 'customScheme',
    selectable: true,
    group: 'Ordinal',
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  /** Datos internos */
  originalData: ChartData[] = [];
  data: ChartData[] = [];

  private resizeObserver: ResizeObserver;
  private configSub?: Subscription;

  constructor(
    private el: ElementRef,
    private helper: ChartHelperService,
    private mediator: MediatorService
  ) {
    // Ajuste de tamaño responsivo conservando proporción (300/700)
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        this.view = [w, w * (300 / 700)];
      }
    });

    // Reaccionar a eventos globales distintos de este componente
    this.mediator.events$
      .pipe(filter(e => e.origin !== 'polar-chart'))
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
    if (changes['dataSource'] && !changes['dataSource'].isFirstChange()) {
      this.loadConfig();
    }
    if (changes['dataCount'] && !changes['dataCount'].isFirstChange()) {
      this.updateDisplayedData();
    }
  }

  private loadConfig(): void {
    if (this.configSub) this.configSub.unsubscribe();
    this.configSub = this.helper
      .loadChartConfig('polarChart', this.dataSource)
      .subscribe(cfg => {
        this.theme = cfg.theme;
        this.view = cfg.view;
        this.originalData = cfg.data;
        this.updateDisplayedData();
      });
  }

  private updateDisplayedData(): void {
    if (!this.originalData.length) {
      this.data = [];
      return;
    }
    if (this.dataCount !== 'all') {
      const cnt = Number(this.dataCount);
      this.data =
        cnt > this.originalData.length
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
    if (this.configSub) this.configSub.unsubscribe();
  }

  onSelect(event: any): void {
    this.mediator.emit({
      origin: 'polar-chart',
      type: 'select',
      payload: event
    });
  }
}