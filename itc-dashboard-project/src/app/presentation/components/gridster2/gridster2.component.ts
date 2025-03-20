import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { FormsModule } from '@angular/forms';

import { PrimaryButtonComponent } from '../shared/buttons/primary-button/primary-button.component';
import { DefaultButtonComponent } from '../shared/buttons/default-button/default-button.component';
import { FloatShapeButtonComponent } from "../shared/buttons/float-shape-button/float-shape-button.component";
import { ChartSelectorVanillaComponent } from "../chart-selector/chart-selector.component";
// Charts
import { AreaChartComponent } from '../shared/data-view/area-chart/area-chart.component';
import { LineChartComponent } from '../shared/data-view/line-chart/line-chart.component';
import { AdvancedPieChartComponent } from '../shared/data-view/advanced-pie-chart/advanced-pie-chart.component';
import { BoxChartComponent } from '../shared/data-view/box-chart/box-chart.component';
import { BubbleChartComponent } from '../shared/data-view/bubble-chart/bubble-chart.component';
import { GaugeChartComponent } from '../shared/data-view/gauge-chart/gauge-chart.component';
import { NgxGraphCustomCurveComponent } from "../shared/data-view/graph-custom-curve/graph-custom-curve.component";
import { GroupedHorizontalBarChartComponent } from "../shared/data-view/grouped-horizontal-bar-chart/grouped-horizontal-bar-chart.component";
import { GroupedVerticalBarChartComponent } from "../shared/data-view/grouped-vertical-bar-chart/grouped-vertical-bar-chart.component";
import { HeatMapComponent } from "../shared/data-view/heat-chart/heat-chart.component";
import { HorizontalBarChartComponent } from "../shared/data-view/horizontal-chart/horizontal-chart.component";
import { LinearGaugeChartComponent } from "../shared/data-view/linear-gauge-chart/linear-gauge-chart.component";
import { NormalizedAreaChartComponent } from "../shared/data-view/normalized-area-chart/normalized-area-chart.component";
import { VerticalBarChartComponent } from "../shared/data-view/vertical-chart/vertical-chart.component";
import { NormalizedHorizontalBarChartComponent } from "../shared/data-view/normalized-horizontal-bar-chart/normalized-horizontal-bar-chart.component";
import { NormalizedVerticalBarChartComponent } from "../shared/data-view/normalized-vertical-bar-chart/normalized-vertical-bar-chart.component";
import { NumberCardsComponent } from "../shared/data-view/number-chart/number-chart.component";
import { PercentGaugeChartComponent } from "../shared/data-view/percent-gauge-chart/percent-gauge-chart.component";
import { PieGridComponent } from "../shared/data-view/pie-grid/pie-grid.component";
import { PieChartComponent } from "../shared/data-view/pie-chart/pie-chart.component";
import { PolarChartComponent } from "../shared/data-view/polar-chart/polar-chart.component";
import { StackedAreaChartComponent } from "../shared/data-view/stacked-area-chart/stacked-area-chart.component";
import { StackedHorizontalBarChartComponent } from "../shared/data-view/stacked-horizontal-bar-chart/stacked-horizontal-bar-chart.component";
import { StackedVerticalBarChartComponent } from "../shared/data-view/stacked-vertical-bar-chart/stacked-vertical-bar-chart.component";
import { TreeMapComponent } from "../shared/data-view/tree-chart/tree-chart.component";
import { UnifiedTableComponent } from "../shared/data-view/table/table.component";

import { ChartSelectionModalComponent } from '../chart-selection-modal/chart-selection-modal.component';

interface ExtendedGridsterItem extends GridsterItem {
  chartType?: string;
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
    LineChartComponent,
    VerticalBarChartComponent,
    ChartSelectionModalComponent,
    AdvancedPieChartComponent,
    AreaChartComponent,
    BoxChartComponent,
    BubbleChartComponent,
    GaugeChartComponent,
    NgxGraphCustomCurveComponent,
    GroupedHorizontalBarChartComponent,
    GroupedVerticalBarChartComponent,
    HeatMapComponent,
    HorizontalBarChartComponent,
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
    UnifiedTableComponent,
    TreeMapComponent
],
  templateUrl: './gridster2.component.html',
  styleUrls: ['./gridster2.component.scss']
})
export class GridsterDashboardComponent implements OnInit {
  options!: SafeGridsterConfig;
  dashboard!: ExtendedGridsterItem[];
  isModalVisible: boolean = false;
  selectedChartType?: 
    'line-chart' | 
    'advanced-pie-chart' | 
    'area-chart' |
    'box-chart' |
    'bubble-chart' |
    'gauge-chart' |
    'graph-custom' |
    'grouped-horizontal-bar' |
    'vertical-bar-chart' |
    'heat-map' |
    'horizontal-bar' |
    'linear-gauge-chart' |
    'normalized-area-chart' |
    'normalized-horizontal-chart' |
    'normalized-vertical-chart' |
    'number-chart' |
    'percent-gauge-chart' |
    'pie-chart' |
    'pie-grid-chart' |
    'polar-chart' |
    'stacked-area-chart' |
    'stacked-horizontal-bar-chart' |
    'stacked-vertical-bar-chart' |
    'table' |
    'tree-map'  |
    'vertical-bar' = 'advanced-pie-chart';
  pushItemsEnabled: boolean = true;

  ngOnInit(): void {
    this.options = {
      gridType: GridType.Fixed,
      compactType: CompactType.None,
      margin: 1,
      outerMargin: false,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 640,
      useBodyForBreakpoint: false,
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
      keepFixedWidthInMobile: false,
      keepFixedHeightInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      enableOccupiedCellDrop: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
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

    // Inicialmente, el dashboard contiene un widget de prueba
    this.dashboard = [
      { id: 1, cols: 2, rows: 2, x: 0, y: 0, chartType: 'horizontal-bar' },
    ];
  }

  static itemChange(item: GridsterItem, itemComponent: any): void {
    console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item: GridsterItem, itemComponent: any): void {
    console.info('itemResized', item, itemComponent);
  }

  changedOptions(): void {
    this.dashboard = [];
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem(item: ExtendedGridsterItem): void {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem(): void {
    if (!this.selectedChartType) {
      alert('Please select a chart type.');
      return;
    }
    let newId = 1;
    if (this.dashboard && this.dashboard.length > 0) {
      newId = Math.max(...this.dashboard.map(item => item['id'])) + 1;
    }
    const newItem: ExtendedGridsterItem = {
      id: newId,
      cols: 1,
      rows: 1,
      x: 0,
      y: 0,
      chartType: this.selectedChartType
    };
    this.dashboard.push(newItem);
  }

  trackByFn(index: number, item: ExtendedGridsterItem): number {
    return item['id'];
  }

  openCustomModal(): void {
    this.isModalVisible = true;
  }

  closeCustomModal(): void {
    this.isModalVisible = false;
  }

  onAddChart(chartType: string): void {
    this.selectedChartType = chartType as typeof this.selectedChartType;
    this.addItem();
    this.closeCustomModal();
  }

  togglePushItems(): void {
    this.pushItemsEnabled = !this.pushItemsEnabled;
    this.options.pushItems = this.pushItemsEnabled;
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }
}