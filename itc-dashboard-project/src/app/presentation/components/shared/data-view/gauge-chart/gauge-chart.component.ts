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
  styleUrls: ['./gauge-chart.component.scss'],
})
export class GaugeChartComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() dataSource: string = '/assets/datasets/data-set-1.json';
  @Input() dataCount: string = 'all';
  @Input() theme: 'default' | 'dark' = 'default';

  @HostBinding('class.dark') get isDarkTheme() {
    return this.theme === 'dark';
  }

  public originalData: Array<{ name: string; value: number; extra?: any }> = [];
  public data: Array<{ name: string; value: number; extra?: any }> = [];
  view: [number, number] = [700, 700];

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
        this.view = [width, width];
      }
    });

    this.mediator.events$
      .pipe(filter(event => event.origin !== 'gauge-chart'))
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
    const dataSource = this.dataSource.trim() || '/assets/datasets/data-set-1.json';
    this.http.get<any>(dataSource).subscribe(
      config => this.processConfig(config),
      error => this.handleConfigError(error)
    );
  }

  private processConfig(config: any): void {
    const chart = config?.charts?.gaugeChart;
    if (chart) {
      this.theme = chart.theme;
      this.view = chart.view;
      this.originalData = chart.data;
    } else {
      this.originalData = [];
    }
    this.updateDisplayedData();
  }

  private handleConfigError(error: any): void {
    console.error('Error loading gaugeChart:', error);
    this.originalData = [];
    this.updateDisplayedData();
  }

  private updateDisplayedData(): void {
    if (!this.originalData.length) {
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
      data: this.originalData,
    });
    this.theme = config.theme;
    this.view = config.view;
    this.originalData = config.data as typeof this.originalData;
    this.updateDisplayedData();
  }

  onSelect(event: any): void {
    this.mediator.emit({
      origin: 'gauge-chart',
      type: 'select',
      payload: event,
    });
  }
}
