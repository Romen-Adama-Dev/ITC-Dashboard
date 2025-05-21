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
import { MediatorService } from '../../../../../application/services/mediator.service';
import { ChartHelperService } from '../../../../../application/services/chart-helper.service';
import { ChartConfig, ChartData } from '../../../../../infrastructure/api/chart.model';

@Component({
  selector: 'app-stacked-vertical-bar-chart',
  standalone: true,
  imports: [NgxChartsModule, HttpClientModule],
  templateUrl: './stacked-vertical-bar-chart.component.html',
  styleUrls: ['./stacked-vertical-bar-chart.component.scss']
})
export class StackedVerticalBarChartComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() theme: 'default' | 'dark' = 'default';
  @Input() dataSource: string = '/assets/datasets/data-set-1.json';
  @Input() dataCount: string = 'all';

  @HostBinding('class.dark')
  get isDarkTheme(): boolean {
    return this.theme === 'dark';
  }

  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  animations = true;
  legend = true;
  legendTitle = 'Legend';
  legendPosition: LegendPosition = LegendPosition.Right;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Value';
  noBarWhenZero = true;
  barPadding = 8;

  data: ChartData[] = [];
  originalData: ChartData[] = [];
  private readonly resizeObserver: ResizeObserver;
  private cfgSub?: Subscription;

  constructor(
    private readonly el: ElementRef,
    private readonly mediator: MediatorService,
    private readonly helper: ChartHelperService
  ) {
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const height = width * (400 / 700);
        this.view = [width, height];
      }
    });

    this.mediator.events$
      .pipe(filter(event => event.origin !== 'stacked-vertical-bar-chart'))
      .subscribe(event => {
        const config = this.helper.processEvent(event, {
          theme: this.theme,
          view: this.view,
          data: this.originalData
        });
        this.applyConfig(config);
      });
  }

  ngOnInit(): void {
    this.loadConfig();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource']?.previousValue !== changes['dataSource']?.currentValue) {
      this.reloadConfig();
    }
    if (changes['dataCount']?.previousValue !== changes['dataCount']?.currentValue) {
      this.updateDisplayedData();
    }
  }

  private loadConfig(): void {
    this.cfgSub = this.helper
      .loadChartConfig('stackedVerticalBarChart', this.dataSource)
      .subscribe(
        config => this.applyConfig(config),
        error => console.error(error)
      );
  }

  private reloadConfig(): void {
    this.cfgSub?.unsubscribe();
    this.loadConfig();
  }

  private applyConfig(config: ChartConfig): void {
    this.theme = config.theme;
    this.view = config.view;
    this.originalData = [...config.data];
    this.updateDisplayedData();
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
      this.data = count >= this.originalData.length
        ? [...this.originalData]
        : this.originalData.slice(0, count);
    }
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
    this.cfgSub?.unsubscribe();
  }

  onSelect(event: any): void {
    this.mediator.emit({
      origin: 'stacked-vertical-bar-chart',
      type: 'select',
      payload: event
    });
  }
}
