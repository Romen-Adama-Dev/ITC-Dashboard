// src/app/presentation/components/shared/data-view/pie-chart/pie-chart.component.ts
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
import { ChartHelperService } from '../../../../../application/services/chart-helper.service';
import { MediatorService } from '../../../../../application/services/mediator.service';
import { ChartConfig, ChartData } from '../../../../../infrastructure/api/chart.model';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgxChartsModule, HttpClientModule],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  /** configurables desde el padre */
  @Input() theme: 'default' | 'dark' = 'default';
  @Input() dataSource: string = '/assets/datasets/data-set-1.json';
  @Input() dataCount: string = 'all';

  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  /** vista y opciones de ngx-charts */
  view: [number, number] = [700, 400];
  animations = true;
  gradient = false;
  legend = true;
  legendTitle = 'Legend';
  legendPosition: LegendPosition = LegendPosition.Right;

  colorScheme: any = {
    name: 'customScheme',
    selectable: true,
    group: 'Ordinal',
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  /** datos internos */
  originalData: ChartData[] = [];
  data: ChartData[] = [];

  private resizeObserver: ResizeObserver;
  private configSub?: Subscription;

  constructor(
    private el: ElementRef,
    private helper: ChartHelperService,
    private mediator: MediatorService
  ) {
    // ajusta el tamaño manteniendo la proporción 400/700
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        this.view = [w, w * (400 / 700)];
      }
    });

    // escucha eventos globales para reaccionar (p.ej. filtros)
    this.mediator.events$
      .pipe(filter(e => e.origin !== 'pie-chart'))
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
    // limpia suscripción previa
    if (this.configSub) this.configSub.unsubscribe();
    this.configSub = this.helper
      .loadChartConfig('pieChart', this.dataSource)
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
      origin: 'pie-chart',
      type: 'select',
      payload: event
    });
  }
}