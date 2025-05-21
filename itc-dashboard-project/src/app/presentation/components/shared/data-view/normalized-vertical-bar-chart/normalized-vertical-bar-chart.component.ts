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
import { Subscription, filter } from 'rxjs';
import { MediatorService } from '../../../../../application/services/mediator.service';
import { ChartHelperService } from '../../../../../application/services/chart-helper.service';
import { ChartConfig } from '../../../../../infrastructure/api/chart.model';

@Component({
  selector: 'app-normalized-vertical-bar-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './normalized-vertical-bar-chart.component.html',
  styleUrls: ['./normalized-vertical-bar-chart.component.scss']
})
export class NormalizedVerticalBarChartComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() theme: 'default' | 'dark' = 'default';
  @Input() dataSource: string = '/assets/datasets/data-set-1.json';
  @Input() dataCount: string = 'all';

  @HostBinding('class.dark')
  get isDarkTheme() {
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
  yAxisLabel = 'Normalized Value';
  noBarWhenZero = true;
  barPadding = 8;

  colorScheme: any = {
    name: 'customScheme',
    selectable: true,
    group: 'Ordinal',
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  originalData: any[] = [];
  data: any[] = [];

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
        this.view = [width, width * (400 / 700)];
      }
    });

    this.mediatorSub = this.mediator.events$
      .pipe(filter(event => event.origin !== 'normalized-vertical-bar-chart'))
      .subscribe(event => {
        const config = this.helper.processEvent(event, {
          theme: this.theme,
          view: this.view,
          data: this.originalData
        });
        this.theme = config.theme;
        this.view = config.view;
        this.originalData = config.data;
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
      .loadChartConfig('normalizedVerticalBarChart', this.dataSource)
      .subscribe({
        next: config => this.applyConfig(config),
        error: error => console.error('Error loading chart config', error)
      });
  }

  private applyConfig(config: ChartConfig): void {
    this.theme = config.theme;
    this.view = config.view;
    this.originalData = config.data.slice();
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
      origin: 'normalized-vertical-bar-chart',
      type: 'select',
      payload: event
    });
  }
}
