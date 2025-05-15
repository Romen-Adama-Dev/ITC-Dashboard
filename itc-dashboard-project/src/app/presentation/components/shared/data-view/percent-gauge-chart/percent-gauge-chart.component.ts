// src/app/presentation/components/shared/data-view/percent-gauge-chart/percent-gauge-chart.component.ts
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
import { ChartConfig } from '../../../../../infrastructure/api/chart.model';

@Component({
  selector: 'app-percent-gauge-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './percent-gauge-chart.component.html',
  styleUrls: ['./percent-gauge-chart.component.scss']
})
export class PercentGaugeChartComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  /** Inputs reactivos */
  @Input() theme: 'default' | 'dark' = 'default';
  @Input() dataSource: string = '/assets/datasets/data-set-1.json';

  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  /** Dimensiones */
  view: [number, number] = [700, 400];

  /** Opciones del gauge */
  animations = true;
  value = 0;
  max = 100;
  target = 0;
  showLabel = true;

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB']
  };

  private resizeObserver: ResizeObserver;
  private configSub?: Subscription;
  private mediatorSub: Subscription;

  constructor(
    private el: ElementRef,
    private helper: ChartHelperService,
    private mediator: MediatorService
  ) {
    // Ajuste dinámico de tamaño
    this.resizeObserver = new ResizeObserver(entries => {
      for (const e of entries) {
        const w = e.contentRect.width;
        this.view = [w, w * (400 / 700)];
      }
    });

    // Escuchar eventos globales
    this.mediatorSub = this.mediator.events$
      .pipe(filter(ev => ev.origin !== 'percent-gauge'))
      .subscribe(ev => {
        const cfg = this.helper.processEvent(ev, {
          theme: this.theme,
          view: this.view,
          data: [
            { name: 'value', value: this.value },
            { name: 'target', value: this.target }
          ]
        });
        this.theme = cfg.theme;
        this.view = cfg.view as [number, number];
        // Si los datos cambian, reasignar:
        if (cfg.data.length >= 2) {
          this.value = cfg.data[0].value;
          this.target = cfg.data[1].value;
        }
      });
  }

  ngOnInit(): void {
    this.loadConfig();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource'] && !changes['dataSource'].isFirstChange()) {
      this.loadConfig();
    }
  }

  private loadConfig(): void {
    this.configSub?.unsubscribe();
    this.configSub = this.helper
      .loadChartConfig('percentGaugeChart', this.dataSource)
      .subscribe({
        next: cfg => this.applyConfig(cfg),
        error: err => console.error('Error loading percent gauge config', err)
      });
  }

  private applyConfig(cfg: ChartConfig): void {
    this.theme = cfg.theme;
    this.view = cfg.view;
    if (cfg.data.length >= 2) {
      this.value = cfg.data[0].value;
      this.target = cfg.data[1].value;
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
    this.mediator.emit({
      origin: 'percent-gauge',
      type: 'select',
      payload: event
    });
  }
}