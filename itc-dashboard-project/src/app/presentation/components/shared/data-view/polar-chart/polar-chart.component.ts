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
import { ChartData, ChartConfig } from '../../../../../domain/entities/chart.model';

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
  @Input() theme: 'default' | 'dark' = 'default';
  @Input() dataSource: string = '/assets/datasets/data-set-1.json';
  @Input() dataCount: string = 'all';

  @HostBinding('class.dark')
  get isDarkTheme(): boolean {
    return this.theme === 'dark';
  }

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

  originalData: ChartData[] = [];
  data: ChartData[] = [];

  private readonly resizeObserver: ResizeObserver;
  private configSub?: Subscription;
  private readonly mediatorSub: Subscription;

  constructor(
    private readonly el: ElementRef,
    private readonly helper: ChartHelperService,
    private readonly mediator: MediatorService
  ) {
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        this.view = [width, Math.round(width * (300 / 700))];
      }
    });

    this.mediatorSub = this.mediator.events$
      .pipe(filter(event => event.origin !== 'polar-chart'))
      .subscribe(event => {
        const cfg = this.helper.processEvent(event, {
          theme: this.theme,
          view: this.view,
          data: this.originalData
        });
        this.theme = cfg.theme;
        this.view = cfg.view;
        this.originalData = cfg.data;
        this.updateDisplayedData();
      });
  }

  ngOnInit(): void {
    this.loadConfig();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['dataSource']?.previousValue !==
      changes['dataSource']?.currentValue
    ) {
      this.loadConfig();
    }
    if (
      changes['dataCount']?.previousValue !==
      changes['dataCount']?.currentValue
    ) {
      this.updateDisplayedData();
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
      origin: 'polar-chart',
      type: 'select',
      payload: event
    });
  }

  private loadConfig(): void {
    this.configSub?.unsubscribe();
    this.configSub = this.helper
      .loadChartConfig('polarChart', this.dataSource)
      .subscribe((cfg: ChartConfig) => {
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

    if (this.dataCount === 'all') {
      this.data = [...this.originalData];
    } else {
      const count = Number(this.dataCount);
      this.data =
        count > this.originalData.length
          ? [...this.originalData]
          : this.originalData.slice(0, count);
    }
  }
}