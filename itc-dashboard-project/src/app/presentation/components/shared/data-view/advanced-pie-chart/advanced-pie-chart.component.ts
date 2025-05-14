import {
  Component,
  Input,
  HostBinding,
  ElementRef,
  OnInit,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClient } from '@angular/common/http';
import { MediatorService } from '../../../../../application/services/mediator.service';
import { ChartHelperService } from '../../../../../application/services/chart-helper.service';

@Component({
  selector: 'app-advanced-pie-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './advanced-pie-chart.component.html',
  styleUrls: ['./advanced-pie-chart.component.scss']
})
export class AdvancedPieChartComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() theme: 'default' | 'dark' = 'default';
  @Input() dataSource: string = '/assets/data-set-1.json';
  @Input() dataCount: string = 'all';

  @HostBinding('class.dark')
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  view: [number, number] = [700, 700];
  animations = true;
  gradient = false;
  tooltipDisabled = false;

  data: any[] = [];
  originalData: any[] = [];

  colorScheme: any = {
    name: 'customScheme',
    selectable: true,
    group: 'Ordinal',
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  private resizeObserver: ResizeObserver;

  constructor(
    private el: ElementRef,
    private http: HttpClient,
    private mediator: MediatorService,
    private helper: ChartHelperService
  ) {
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        this.view = [width, width];
      }
    });

    this.mediator.events$.subscribe(event => {
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

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataCount'] && !changes['dataCount'].isFirstChange()) {
      this.updateDisplayedData();
    }
    if (changes['dataSource'] && !changes['dataSource'].isFirstChange()) {
      this.loadConfig();
    }
  }

  loadConfig(): void {
    const ds = this.dataSource?.trim() ? this.dataSource : '/assets/data-set-1.json';
    this.http.get<any>(ds).subscribe(
      config => {
        if (config?.charts?.advancedPieChart) {
          const advancedChart = config.charts.advancedPieChart;
          this.theme = advancedChart.theme;
          this.view = advancedChart.view;
          this.originalData = advancedChart.data;
          this.updateDisplayedData();
        }
      },
      error => {
        console.error('Error loading data:', error);
      }
    );
  }

  updateDisplayedData(): void {
    if (!this.originalData?.length) return;
    if (this.dataCount !== 'all') {
      const count = Number(this.dataCount);
      this.data =
        count > this.originalData.length
          ? [...this.originalData]
          : this.originalData.slice(0, count);
    } else {
      this.data = [...this.originalData];
    }
  }

  onSelect(event: any): void {
    this.mediator.emit({ type: 'select', payload: event });
  }
}