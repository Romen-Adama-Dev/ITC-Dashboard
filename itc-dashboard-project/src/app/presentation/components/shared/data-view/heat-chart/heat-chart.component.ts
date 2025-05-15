// src/app/presentation/components/shared/data-view/heat-map/heat-map.component.ts
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
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { MediatorService } from '../../../../../application/services/mediator.service';
import { ChartHelperService } from '../../../../../application/services/chart-helper.service';

@Component({
  selector: 'app-heat-map',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './heat-chart.component.html',
  styleUrls: ['./heat-chart.component.scss']
})
export class HeatMapComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy 
{
  /** Ahora recibimos dataSource y dataCount */
  @Input() dataSource: string = '/assets/datasets/data-set-1.json';
  @Input() dataCount: string = 'all';

  /** Tema */
  @Input() theme: 'default' | 'dark' = 'default';
  @HostBinding('class.dark') get isDarkTheme() {
    return this.theme === 'dark';
  }

  /** Mantener ratio 400/700 */
  view: [number, number] = [700, 400];

  /** Opciones */
  gradient = true;
  showXAxis = true;
  showYAxis = true;
  legend = true;
  colorScheme: any = {
    domain: ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3']
  };

  /** Datos internos */
  originalData: any[] = [];
  data: any[] = [];

  private resizeObserver: ResizeObserver;

  constructor(
    private el: ElementRef,
    private http: HttpClient,
    private mediator: MediatorService,
    private helper: ChartHelperService
  ) {
    // Ajustar tamaño manteniendo ratio
    this.resizeObserver = new ResizeObserver(entries => {
      for (const e of entries) {
        const w = e.contentRect.width;
        this.view = [w, w * (400 / 700)];
      }
    });

    // Escuchar eventos globales
    this.mediator.events$
      .pipe(filter(ev => ev.origin !== 'heat-map'))
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
    const url = this.dataSource?.trim() || '/assets/datasets/data-set-1.json';
    this.http.get<any>(url).subscribe({
      next: cfg => {
        const chart = cfg?.charts?.heatMap;
        if (chart) {
          this.theme = chart.theme;
          this.view = chart.view;
          this.originalData = chart.data;
        } else {
          this.originalData = [];
        }
        this.updateDisplayedData();
      },
      error: err => {
        console.error('Error loading heatMap config:', err);
        this.originalData = [];
        this.updateDisplayedData();
      }
    });
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
      origin: 'heat-map',
      type: 'select',
      payload: event
    });
  }
}