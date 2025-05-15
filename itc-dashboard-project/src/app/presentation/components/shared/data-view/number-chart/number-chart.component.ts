// src/app/presentation/components/shared/data-view/number-chart/number-chart.component.ts
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
import { ChartConfig, ChartData } from '../../../../../infrastructure/api/chart.model';

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
  /** Inputs reactivos */
  @Input() theme: 'default' | 'dark' = 'default';
  @Input() dataSource: string = '/assets/datasets/data-set-1.json';
  @Input() dataCount: string = 'all';

  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  /** Tamaño inicial (se puede ajustar desde JSON) */
  view: [number, number] = [749, 499];

  animations: boolean = true;

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  /** Datos completos y filtrados */
  originalData: ChartData[] = [];
  data: ChartData[] = [];

  private resizeObserver: ResizeObserver;
  private configSub?: Subscription;
  private mediatorSub: Subscription;

  constructor(
    private el: ElementRef,
    private helper: ChartHelperService,
    private mediator: MediatorService
  ) {
    // Observador para ajustar el tamaño manteniendo proporción 499/749
    this.resizeObserver = new ResizeObserver(entries => {
      for (const e of entries) {
        const w = e.contentRect.width;
        this.view = [w, w * (499 / 749)];
      }
    });

    // Escuchar eventos globales y aplicar filtros/estilos desde el helper
    this.mediatorSub = this.mediator.events$
      .pipe(filter(ev => ev.origin !== 'number-cards'))
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
      .loadChartConfig('numberCards', this.dataSource)
      .subscribe({
        next: cfg => this.applyConfig(cfg),
        error: err => console.error('Error loading number cards config', err)
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
    // Emitimos un evento para otros componentes
    this.mediator.emit({
      origin: 'number-cards',
      type: 'select',
      payload: event
    });
  }
}