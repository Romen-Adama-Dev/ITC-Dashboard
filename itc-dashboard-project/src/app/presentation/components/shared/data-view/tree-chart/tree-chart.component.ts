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
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MediatorService } from '../../../../../application/services/mediator.service';
import { ChartHelperService } from '../../../../../application/services/chart-helper.service';
import { ChartConfig, ChartData } from '../../../../../infrastructure/api/chart.model';

@Component({
  selector: 'app-tree-map',
  standalone: true,
  imports: [NgxChartsModule, HttpClientModule],
  templateUrl: './tree-chart.component.html',
  styleUrls: ['./tree-chart.component.scss']
})
export class TreeMapComponent
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
  animations = true;
  colorScheme: any = { domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] };
  results: ChartData[] = [];
  private originalResults: ChartData[] = [];
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
      .pipe(filter(event => event.origin !== 'tree-map'))
      .subscribe(event => this.handleMediatorEvent(event));
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

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
    this.cfgSub?.unsubscribe();
  }

  private loadConfig(): void {
    this.cfgSub = this.helper.loadChartConfig('treeMap', this.dataSource).subscribe({
      next: cfg => this.applyConfig(cfg),
      error: err => console.error(err)
    });
  }

  private reloadConfig(): void {
    this.cfgSub?.unsubscribe();
    this.loadConfig();
  }

  private applyConfig(cfg: ChartConfig): void {
    this.theme = cfg.theme;
    this.view = cfg.view;
    this.originalResults = [...cfg.data];
    this.updateDisplayedData();
  }

  private updateDisplayedData(): void {
    if (!this.originalResults.length) {
      this.results = [];
      return;
    }

    if (this.dataCount === 'all') {
      this.results = [...this.originalResults];
    } else {
      const count = Number(this.dataCount);
      this.results = count >= this.originalResults.length
        ? [...this.originalResults]
        : this.originalResults.slice(0, count);
    }
  }

  private handleMediatorEvent(event: any): void {
    const config = this.helper.processEvent(event, {
      theme: this.theme,
      view: this.view,
      data: this.originalResults
    });
    this.theme = config.theme;
    this.view = config.view;
    this.originalResults = config.data;
    this.updateDisplayedData();
  }

  onSelect(event: any): void {
    this.mediator.emit({
      origin: 'tree-map',
      type: 'select',
      payload: event
    });
  }
}
