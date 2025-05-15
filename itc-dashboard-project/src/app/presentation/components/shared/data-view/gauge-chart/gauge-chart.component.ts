// src/app/presentation/components/shared/data-view/gauge-chart/gauge-chart.component.ts
import {
  Component,
  Input,
  HostBinding,
  ElementRef,
  OnInit,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { MediatorService } from '../../../../../application/services/mediator.service';
import { ChartHelperService } from '../../../../../application/services/chart-helper.service';

@Component({
  selector: 'app-gauge-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.scss']
})
export class GaugeChartComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy 
{
  /** Inputs nuevos para enlazar desde Gridster */
  @Input() dataSource: string = '/assets/datasets/data-set-1.json';
  @Input() dataCount: string = 'all';

  /** Tema heredado (sigue sirviendo) */
  @Input() theme: 'default' | 'dark' = 'default';
  @HostBinding('class.dark') get isDarkTheme() {
    return this.theme === 'dark';
  }

  /** Datos internos */
  public originalData: Array<{ name: string; value: number; extra?: any }> = [];
  public data: Array<{ name: string; value: number; extra?: any }> = [];

  /** Mantener cuadrado */
  view: [number, number] = [700, 700];

  // Opciones del Gauge
  animations = true;
  min = 0;
  max = 50000;
  units = '';
  angleSpan = 240;
  startAngle = -120;
  showAxis = true;
  margin: number[] = [10, 10, 10, 10];
  tooltipDisabled = false;
  showText = true;
  colorScheme: any = { domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5'] };

  private resizeObserver: ResizeObserver;

  constructor(
    private el: ElementRef,
    private http: HttpClient,
    private mediator: MediatorService,
    private helper: ChartHelperService
  ) {
    // observer para mantenerlo cuadrado
    this.resizeObserver = new ResizeObserver(entries => {
      for (const e of entries) {
        const w = e.contentRect.width;
        this.view = [w, w];
      }
    });

    // reacciona a eventos de filtro o apariencia
    this.mediator.events$
      .pipe(filter(e => e.origin !== 'gauge-chart'))
      .subscribe(event => {
        const cfg = this.helper.processEvent(event, {
          theme: this.theme,
          view: this.view,
          data: this.originalData
        });
        this.theme = cfg.theme;
        this.view = cfg.view as [number, number];
        this.originalData = cfg.data as typeof this.originalData;
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
    const ds = this.dataSource?.trim() || '/assets/datasets/data-set-1.json';
    this.http.get<any>(ds).subscribe(
      cfg => {
        const chart = cfg?.charts?.gaugeChart;
        if (chart) {
          this.theme = chart.theme;
          this.view = chart.view;
          this.originalData = chart.data;
        } else {
          this.originalData = [];
        }
        this.updateDisplayedData();
      },
      err => {
        console.error('Error cargando gaugeChart:', err);
        this.originalData = [];
        this.updateDisplayedData();
      }
    );
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
  }

  onSelect(event: any): void {
    this.mediator.emit({
      origin: 'gauge-chart',
      type: 'select',
      payload: event
    });
  }
}