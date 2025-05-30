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
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MediatorService } from '../../../../../application/services/mediator.service';
import { ChartHelperService } from '../../../../../application/services/chart-helper.service';
import { ChartConfig } from '../../../../../domain/entities/chart.model';
@Component({
  selector: 'app-percent-gauge-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './percent-gauge-chart.component.html',
  styleUrls: ['./percent-gauge-chart.component.scss']
})
export class PercentGaugeChartComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() theme: 'default' | 'dark' = 'default';
  @Input() dataSource: string = '/assets/datasets/data-set-1.json';

  @HostBinding('class.dark')
  get isDarkTheme(): boolean {
    return this.theme === 'dark';
  }

  view: [number, number] = [700, 400];
  animations = true;
  value = 0;
  max = 100;
  target = 0;
  showLabel = true;

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB']
  };

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
      .pipe(filter(event => event.origin !== 'percent-gauge'))
      .subscribe(event => this.handleMediatorEvent(event));
  }

  ngOnInit(): void {
    this.loadConfig();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource'] && !changes['dataSource'].isFirstChange()) {
      this.loadConfig();
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

  private loadConfig(): void {
    this.configSub?.unsubscribe();
    this.configSub = this.helper
      .loadChartConfig('percentGaugeChart', this.dataSource)
      .subscribe({
        next: config => this.applyConfig(config),
        error: error => console.error('Error loading percent gauge config', error)
      });
  }

  private applyConfig(config: ChartConfig): void {
    this.theme = config.theme;
    this.view = config.view;
    if (config.data.length >= 2) {
      this.value = config.data[0].value;
      this.target = config.data[1].value;
    }
  }

  private handleMediatorEvent(event: any): void {
    const config = this.helper.processEvent(event, {
      theme: this.theme,
      view: this.view,
      data: [
        { name: 'value', value: this.value },
        { name: 'target', value: this.target }
      ]
    });

    this.theme = config.theme;
    this.view = config.view;
    if (config.data.length >= 2) {
      this.value = config.data[0].value;
      this.target = config.data[1].value;
    }
  }

  onSelect(event: any): void {
    this.mediator.emit({
      origin: 'percent-gauge',
      type: 'select',
      payload: event
    });
  }
}
