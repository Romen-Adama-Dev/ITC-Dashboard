// src/app/presentation/components/shared/data-view/linear-gauge-chart/linear-gauge-chart.component.ts
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
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Subscription, filter } from 'rxjs';
import { MediatorService } from '../../../../../application/services/mediator.service';
import { ChartHelperService } from '../../../../../application/services/chart-helper.service';
import { ChartConfig } from '../../../../../infrastructure/api/chart.model';

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
  /** Inputs reactivos */
  @Input() theme: 'default' | 'dark' = 'default';
  @Input() dataSource: string = '/assets/datasets/data-set-1.json';
  @Input() dataCount: string = 'all';

  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  /** Propiedades del gauge */
  view: [number, number] = [700, 400];
  value: number = 0;
  previousValue: number = 0;
  min = 0;
  max = 100;
  units = '%';
  animations = true;

  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#CFC0BB', '#7aa3e5']
  };

  private resizeObserver: ResizeObserver;
  private configSub?: Subscription;
  private mediatorSub: Subscription;
  private originalData: { name: string; value: number }[] = [];

  constructor(
    private el: ElementRef,
    private http: HttpClient,
    private helper: ChartHelperService,
    private mediator: MediatorService
  ) {
    // Observador de resize para mantener proporción
    this.resizeObserver = new ResizeObserver(entries => {
      for (const e of entries) {
        const w = e.contentRect.width;
        this.view = [w, w * (400 / 700)];
      }
    });

    // Escuchar eventos globales (excepto los propios)
    this.mediatorSub = this.mediator.events$
      .pipe(filter(ev => ev.origin !== 'linear-gauge-chart'))
      .subscribe(ev => {
        const cfg = this.helper.processEvent(ev, {
          theme: this.theme,
          view: this.view,
          data: this.originalData
        });
        this.theme = cfg.theme;
        this.view = cfg.view as [number, number];
        this.originalData = cfg.data;
        this.updateDisplayedValues();
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
      this.updateDisplayedValues();
    }
  }

  private loadConfig(): void {
    this.configSub?.unsubscribe();
    this.configSub = this.helper
      .loadChartConfig('linearGaugeChart', this.dataSource)
      .subscribe({
        next: cfg => this.applyConfig(cfg),
        error: err => console.error('Error loading linear gauge config', err)
      });
  }

  private applyConfig(cfg: ChartConfig): void {
    this.theme = cfg.theme;
    this.view = cfg.view;
    this.originalData = cfg.data.slice();
    this.updateDisplayedValues();
  }

  private updateDisplayedValues(): void {
    // slice según dataCount
    let slice = this.originalData;
    if (this.dataCount !== 'all') {
      const cnt = Number(this.dataCount);
      slice = this.originalData.slice(0, cnt);
    }
    // asigna el primero y segundo valor
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
    console.log(event);
    this.mediator.emit({
      origin: 'linear-gauge-chart',
      type: 'select',
      payload: event
    });
  }
}