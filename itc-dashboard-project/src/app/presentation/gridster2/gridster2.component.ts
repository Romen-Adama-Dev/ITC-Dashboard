import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CompactType,
  DisplayGrid,
  Draggable,
  GridsterComponent,
  GridsterConfig,
  GridsterItem,
  GridsterItemComponent,
  GridType,
  PushDirections,
  Resizable,
} from 'angular-gridster2';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { ChartDataService } from '../../application/services/chart-data.service';
import { MediatorService } from '../../application/services/mediator.service';

import { PrimaryButtonComponent } from '../components/shared/buttons/primary-button/primary-button.component';
import { DefaultButtonComponent } from '../components/shared/buttons/default-button/default-button.component';
import { FloatShapeButtonComponent } from '../components/shared/buttons/float-shape-button/float-shape-button.component';
import { LanguageDropdownComponent } from '../components/shared/buttons/drop-button/drop-button.component';
import { ThemeToggleButtonComponent } from "../components/shared/buttons/theme-toggle-button.component";
import { HorizontalBarChartComponent } from '../components/shared/data-view/horizontal-chart/horizontal-chart.component';
import { VerticalBarChartComponent } from '../components/shared/data-view/vertical-chart/vertical-chart.component';
import { ChartSelectionModalComponent } from '../components/chart-selection-modal/chart-selection-modal.component';
import { EditWidgetModalComponent } from '../components/edit-modal/edit-modal.component';
import { AdvancedPieChartComponent } from "../components/shared/data-view/advanced-pie-chart/advanced-pie-chart.component";
import { AreaChartComponent } from "../components/shared/data-view/area-chart/area-chart.component";
import { GaugeChartComponent } from "../components/shared/data-view/gauge-chart/gauge-chart.component";
import { HeatMapComponent } from "../components/shared/data-view/heat-chart/heat-chart.component";
import { BubbleChartComponent } from "../components/shared/data-view/bubble-chart/bubble-chart.component";
import { BoxChartComponent } from "../components/shared/data-view/box-chart/box-chart.component";
import { LineChartComponent } from "../components/shared/data-view/line-chart/line-chart.component";
import { LinearGaugeChartComponent } from "../components/shared/data-view/linear-gauge-chart/linear-gauge-chart.component";
import { NormalizedAreaChartComponent } from "../components/shared/data-view/normalized-area-chart/normalized-area-chart.component";
import { NormalizedHorizontalBarChartComponent } from "../components/shared/data-view/normalized-horizontal-bar-chart/normalized-horizontal-bar-chart.component";
import { NormalizedVerticalBarChartComponent } from "../components/shared/data-view/normalized-vertical-bar-chart/normalized-vertical-bar-chart.component";
import { NumberCardsComponent } from "../components/shared/data-view/number-chart/number-chart.component";
import { PercentGaugeChartComponent } from "../components/shared/data-view/percent-gauge-chart/percent-gauge-chart.component";
import { PieChartComponent } from "../components/shared/data-view/pie-chart/pie-chart.component";
import { PieGridComponent } from "../components/shared/data-view/pie-grid/pie-grid.component";
import { PolarChartComponent } from "../components/shared/data-view/polar-chart/polar-chart.component";
import { StackedAreaChartComponent } from "../components/shared/data-view/stacked-area-chart/stacked-area-chart.component";
import { StackedHorizontalBarChartComponent } from "../components/shared/data-view/stacked-horizontal-bar-chart/stacked-horizontal-bar-chart.component";
import { StackedVerticalBarChartComponent } from "../components/shared/data-view/stacked-vertical-bar-chart/stacked-vertical-bar-chart.component";
import { TreeMapComponent } from "../components/shared/data-view/tree-chart/tree-chart.component";

interface ExtendedGridsterItem extends GridsterItem {
  chartType?: string;
  dataSource?: string;
  dataCount?: string;
}

interface SafeGridsterConfig extends GridsterConfig {
  draggable: Draggable;
  resizable: Resizable;
  pushDirections: PushDirections;
}

@Component({
  selector: 'app-gridster-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GridsterComponent,
    GridsterItemComponent,
    PrimaryButtonComponent,
    DefaultButtonComponent,
    FloatShapeButtonComponent,
    AdvancedPieChartComponent,
    AreaChartComponent,
    GaugeChartComponent,
    HeatMapComponent,
    HorizontalBarChartComponent,
    VerticalBarChartComponent,
    ChartSelectionModalComponent,
    EditWidgetModalComponent,
    NzIconModule,
    TranslateModule,
    ThemeToggleButtonComponent,
    LanguageDropdownComponent,
    BubbleChartComponent,
    BoxChartComponent,
    LineChartComponent,
    LinearGaugeChartComponent,
    NormalizedAreaChartComponent,
    NormalizedHorizontalBarChartComponent,
    NormalizedVerticalBarChartComponent,
    NumberCardsComponent,
    PercentGaugeChartComponent,
    PieChartComponent,
    PieGridComponent,
    PolarChartComponent,
    StackedAreaChartComponent,
    StackedHorizontalBarChartComponent,
    StackedVerticalBarChartComponent,
    TreeMapComponent
],
  templateUrl: './gridster2.component.html',
  styleUrls: ['./gridster2.component.scss']
})
export class GridsterDashboardComponent implements OnInit {
  options!: SafeGridsterConfig;
  dashboard: ExtendedGridsterItem[] = [];
  isModalVisible = false;
  isEditModalVisible = false;
  currentEditItem: ExtendedGridsterItem | null = null;
  currentTheme: 'default' | 'dark' = 'default';

  readonly languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'zh', label: '中文' }
  ];
  selectedLanguage = 'en';

  selectedChartType:
    | 'line-chart'
    | 'advanced-pie-chart'
    | 'area-chart'
    | 'box-chart'
    | 'bubble-chart'
    | 'gauge-chart'
    | 'vertical-bar-chart'
    | 'heatMap'
    | 'horizontal-bar'
    | 'linear-gauge-chart'
    | 'normalized-area-chart'
    | 'normalized-horizontal-chart'
    | 'normalized-vertical-chart'
    | 'number-chart'
    | 'percent-gauge-chart'
    | 'pie-chart'
    | 'pie-grid-chart'
    | 'polar-chart'
    | 'stacked-area-chart'
    | 'stacked-horizontal-bar-chart'
    | 'stacked-vertical-bar-chart'
    | 'tree-map'
    | 'vertical-bar' = 'advanced-pie-chart';

  pushItemsEnabled = true;

  constructor(
    private readonly chartDataService: ChartDataService,
    private readonly notification: NzNotificationService,
    private readonly mediator: MediatorService,
    private readonly translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.initTheme();
    this.initTranslation();
    this.initGridsterOptions();
  }


  private initTheme(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.currentTheme = prefersDark ? 'dark' : 'default';
    this.toggleThemeCss();
  }

  private initTranslation(): void {
    this.translate.setDefaultLang(this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
  }

  private initGridsterOptions(): void {
    this.options = {
      gridType: GridType.Fixed,
      compactType: CompactType.None,
      margin: 1,
      outerMargin: false,
      useTransformPositioning: true,
      mobileBreakpoint: 640,
      minCols: 5,
      maxCols: 10,
      minRows: 5,
      maxRows: 10,
      minItemCols: 1,
      maxItemCols: 10,
      minItemRows: 1,
      maxItemRows: 10,
      minItemArea: 1,
      maxItemArea: 2500,
      defaultItemCols: 5,
      defaultItemRows: 5,
      fixedColWidth: 249,
      fixedRowHeight: 249,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      draggable: { enabled: true },
      resizable: { enabled: true },
      swap: false,
      pushItems: this.pushItemsEnabled,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: { north: true, east: true, south: true, west: true },
      pushResizeItems: false,
      displayGrid: DisplayGrid.None,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false
    };
  }

  static itemChange(item: GridsterItem, itemComponent: any): void {
    console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item: GridsterItem, itemComponent: any): void {
    console.info('itemResized', item, itemComponent);
  }

  addItem(): void {
    if (!this.selectedChartType) {
      alert('Please select a chart type.');
      return;
    }
    this.dashboard.push({
      id: this.getNextId(),
      cols: 1,
      rows: 1,
      x: 0,
      y: 0,
      chartType: this.selectedChartType
    });
  }

  onAddChart(selection: { chartType: string; dataSource: string; dataCount: string }): void {
    this.selectedChartType = selection.chartType as any;
    this.dashboard.push({
      id: this.getNextId(),
      cols: 1,
      rows: 1,
      x: 0,
      y: 0,
      chartType: this.selectedChartType,
      dataSource: selection.dataSource,
      dataCount: selection.dataCount
    });
    this.notification.success(
      this.translate.instant('SUCCESS'),
      this.translate.instant('NOTIF.SUCCESS_WIDGET_CREATED')
    );
  }

  editItem(item: ExtendedGridsterItem): void {
    this.currentEditItem = item;
    this.currentEditItem.dataCount ??= 'all';
    this.isEditModalVisible = true;
  }

  handleWidgetEditSave(update: { dataCount: string; dataSource: string }): void {
    if (!this.currentEditItem) return;

    const originalSource = this.currentEditItem.dataSource;
    const wid = this.currentEditItem['id'];

    if (update.dataCount !== this.currentEditItem.dataCount) {
      this.dashboard
        .filter(item => item.dataSource === originalSource)
        .forEach(item => item.dataCount = update.dataCount);

      this.mediator.emit({
        type: 'updateCount',
        dataSource: originalSource,
        dataCount: update.dataCount
      });
    }

    if (update.dataSource !== originalSource) {
      this.currentEditItem.dataSource = update.dataSource;
      this.chartDataService.loadChartsData(update.dataSource).subscribe({
        next: () => {
          this.mediator.emit({
            type: 'updateSource',
            widgetId: wid,
            dataSource: update.dataSource
          });
        },
        error: err => console.error('❌ Error al recargar datos:', err)
      });
    }

    this.options.api?.optionsChanged?.();
    this.notification.warning('Warning', 'Widget(s) sincronizado(s) correctamente.');
    this.handleEditModalClose();
  }

  handleEditModalClose(): void {
    this.isEditModalVisible = false;
  }

  removeItem(item: ExtendedGridsterItem): void {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
    this.notification.warning(
      this.translate.instant('WARNING'),
      this.translate.instant('NOTIF.WARN_WIDGET_DELETED')
    );
  }

  reloadWidgetData(item: ExtendedGridsterItem): void {
    const dataSource = item.dataSource ?? '/assets/datasets/data-set-1.json';
    this.chartDataService.loadChartsData(dataSource).subscribe({
      next: () => console.log(`✅ Datos recargados desde ${dataSource}`),
      error: err => console.error('❌ Error al recargar datos:', err)
    });
  }

  
  openCustomModal(): void {
    this.isModalVisible = true;
    this.notification.info(
      this.translate.instant('INFO'),
      this.translate.instant('NOTIF.INFO_MODAL_OPEN')
    );
  }

  closeCustomModal(): void {
    this.isModalVisible = false;
  }

  serializeToJson(): void {
    const name = prompt('Nombre de archivo:', 'dashboardConfig') ?? 'dashboardConfig';
    const blob = new Blob([JSON.stringify(this.dashboard, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${name}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    this.notification.info('Info', 'Dashboard serializado correctamente.');
  }

  loadJsonFromFile(event: any): void {
    const file = event.target.files[0];
    if (!file) return;
    this.changedOptions();
    const reader = new FileReader();
    reader.onload = e => {
      try {
        this.dashboard = JSON.parse((e.target as any).result);
        this.options.api?.optionsChanged?.();
        this.notification.success('Success', 'Dashboard cargado desde JSON.');
      } catch {
        console.error('Error parsing JSON');
      }
    };
    reader.readAsText(file);
  }

  deserialize(json: string): void {
    try {
      const arr = JSON.parse(json);
      if (Array.isArray(arr)) {
        arr.forEach(item => {
          const idx = this.dashboard.findIndex(d => d['id'] === item.id);
          if (idx >= 0) this.dashboard[idx] = { ...this.dashboard[idx], ...item };
          else this.dashboard.push(item);
        });
        this.options.api?.optionsChanged?.();
        this.notification.success('Success', 'Dashboard actualizado con JSON.');
      }
    } catch {
      console.error('Error deserializing JSON');
    }
  }

  deserializeFromFile(event: any): void {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      this.deserialize((e.target as any).result);
      this.options.api?.optionsChanged?.();
    };
    reader.readAsText(file);
  }

  togglePushItems(): void {
    this.pushItemsEnabled = !this.pushItemsEnabled;
    this.options.pushItems = this.pushItemsEnabled;
    this.options.api?.optionsChanged?.();
    this.notification.info('Info', this.pushItemsEnabled ? 'Widgets desbloqueados.' : 'Widgets bloqueados.');
  }

  changedOptions(): void {
    this.dashboard = [];
    this.options.api?.optionsChanged?.();
    this.notification.warning(
      this.translate.instant('WARNING'),
      this.translate.instant('NOTIF.WARN_WIDGETS_CLEARED')
    );
  }

  onToggleTheme(): void {
    this.currentTheme = this.currentTheme === 'default' ? 'dark' : 'default';
    this.toggleThemeCss();
  }

  private toggleThemeCss(): void {
    const darkLink = document.getElementById('dark-theme-css') as HTMLLinkElement | null;
    if (darkLink) {
      darkLink.disabled = this.currentTheme !== 'dark';
    }
  }

  onLanguageChange(lang: string): void {
    this.selectedLanguage = lang;
    this.translate.use(lang);
  }

  trackByFn(_i: number, item: ExtendedGridsterItem): number {
    return item['id'];
  }

  private getNextId(): number {
    return this.dashboard.length
      ? Math.max(...this.dashboard.map(i => i['id'])) + 1
      : 1;
  }
}
