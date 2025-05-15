// src/app/presentation/components/shared/data-view/tree-chart/tree-chart.component.ts
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
import { HttpClientModule, HttpClient } from '@angular/common/http';
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
  get isDarkTheme() {
    return this.theme === 'dark';
  }

  view: [number, number] = [700, 400];
  animations = true;

  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // renamed to match ngx-charts TreeMap input
  results: ChartData[] = [];
  private originalResults: ChartData[] = [];

  private resizeObserver: ResizeObserver;
  private cfgSub?: Subscription;

  constructor(
    private el: ElementRef,
    private http: HttpClient,
    private mediator: MediatorService,
    private helper: ChartHelperService
  ) {
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = w * (400 / 700);
        this.view = [w, h];
      }
    });

    this.mediator.events$
      .pipe(filter(e => e.origin !== 'tree-map'))
      .subscribe(event => {
        const cfg = this.helper.processEvent(event, {
          theme: this.theme,
          view: this.view,
          data: this.originalResults
        });
        this.theme = cfg.theme;
        this.view = cfg.view as [number, number];
        this.originalResults = cfg.data;
        this.updateDisplayedData();
      });
  }

  ngOnInit(): void {
    this.loadConfig();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource'] && !changes['dataSource'].isFirstChange()) {
      this.reloadConfig();
    }
    if (changes['dataCount'] && !changes['dataCount'].isFirstChange()) {
      this.updateDisplayedData();
    }
  }

  private loadConfig(): void {
    this.cfgSub = this.helper
      .loadChartConfig('treeMap', this.dataSource)
      .subscribe(
        cfg => this.applyConfig(cfg),
        err => console.error(err)
      );
  }

  private reloadConfig(): void {
    this.cfgSub?.unsubscribe();
    this.loadConfig();
  }

  private applyConfig(cfg: ChartConfig): void {
    this.theme = cfg.theme;
    this.view = cfg.view;
    this.originalResults = cfg.data.slice();
    this.updateDisplayedData();
  }

  private updateDisplayedData(): void {
    if (!this.originalResults.length) {
      this.results = [];
      return;
    }
    if (this.dataCount !== 'all') {
      const cnt = Number(this.dataCount);
      this.results =
        cnt >= this.originalResults.length
          ? [...this.originalResults]
          : this.originalResults.slice(0, cnt);
    } else {
      this.results = [...this.originalResults];
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
      origin: 'tree-map',
      type: 'select',
      payload: event
    });
  }
}