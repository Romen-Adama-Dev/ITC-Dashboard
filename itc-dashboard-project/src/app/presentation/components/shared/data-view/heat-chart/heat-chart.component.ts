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
  @Input() dataSource = '/assets/datasets/data-set-1.json';
  @Input() dataCount: string = 'all';
  @Input() theme: 'default' | 'dark' = 'default';

  @HostBinding('class.dark') get isDarkTheme() {
    return this.theme === 'dark';
  }

  view: [number, number] = [700, 400];
  gradient = true;
  showXAxis = true;
  showYAxis = true;
  legend = true;
  colorScheme: any = {
    domain: ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3']
  };

  originalData: any[] = [];
  data: any[] = [];
  private readonly resizeObserver: ResizeObserver;

  constructor(
    private readonly el: ElementRef,
    private readonly http: HttpClient,
    private readonly mediator: MediatorService,
    private readonly helper: ChartHelperService
  ) {
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        this.view = [width, Math.round(width * (400 / 700))];
      }
    });

    this.mediator.events$
      .pipe(filter(event => event.origin !== 'heat-map'))
      .subscribe(event => this.handleMediatorEvent(event));
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

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  private loadConfig(): void {
    const url = this.dataSource.trim() || '/assets/datasets/data-set-1.json';
    this.http.get<any>(url).subscribe({
      next: config => this.processConfig(config),
      error: err => {
        console.error('Error loading heatMap config:', err);
        this.originalData = [];
        this.updateDisplayedData();
      }
    });
  }

  private processConfig(config: any): void {
    const chart = config?.charts?.heatMap;
    if (chart) {
      this.theme = chart.theme;
      this.view = chart.view;
      this.originalData = chart.data;
    } else {
      this.originalData = [];
    }
    this.updateDisplayedData();
  }

  private updateDisplayedData(): void {
    if (!this.originalData?.length) {
      this.data = [];
      return;
    }
    this.data = this.dataCount === 'all'
      ? [...this.originalData]
      : this.originalData.slice(0, Number(this.dataCount));
  }

  private handleMediatorEvent(event: any): void {
    const config = this.helper.processEvent(event, {
      theme: this.theme,
      view: this.view,
      data: this.originalData
    });
    this.theme = config.theme;
    this.view = config.view;
    this.originalData = config.data as typeof this.originalData;
    this.updateDisplayedData();
  }

  onSelect(event: any): void {
    this.mediator.emit({
      origin: 'heat-map',
      type: 'select',
      payload: event
    });
  }
}
