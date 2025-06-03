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
import { ChartConfig } from '../../../../../domain/entities/chart.model';

interface TreeMapItem {
  name: string;
  value: number;
}

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

  results: TreeMapItem[] = [];
  private originalResults: TreeMapItem[] = [];
  private readonly resizeObserver: ResizeObserver;
  private cfgSub?: Subscription;
  private readonly mediatorSub: Subscription;

  constructor(
    private readonly el: ElementRef,
    private readonly mediator: MediatorService,
    private readonly helper: ChartHelperService
  ) {
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const height = Math.round(width * (400 / 700));
        this.view = [width, height];
      }
    });

    this.mediatorSub = this.mediator.events$
      .pipe(filter(event => event.origin !== 'tree-map'))
      .subscribe(event => {
        const cfg = this.helper.processEvent(event, {
          theme: this.theme,
          view: this.view,
          data: this.originalResults
        });
        this.applyConfig(cfg);
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

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
    this.cfgSub?.unsubscribe();
    this.mediatorSub.unsubscribe();
  }

  private loadConfig(): void {
    this.cfgSub = this.helper.loadChartConfig('treeMap', this.dataSource).subscribe({
      next: cfg => this.applyConfig(cfg),
      error: err => console.error('Error loading tree map config', err)
    });
  }

  private reloadConfig(): void {
    this.cfgSub?.unsubscribe();
    this.loadConfig();
  }

  private applyConfig(cfg: ChartConfig): void {
    this.theme = cfg.theme;
    this.view = cfg.view;
    // Assume cfg.data contains only simple items { name, value }
    this.originalResults = (cfg.data as TreeMapItem[]).map(item => ({
      name: item.name,
      value: item.value
    }));
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

  onSelect(event: any): void {
    this.mediator.emit({
      origin: 'tree-map',
      type: 'select',
      payload: event
    });
  }
}