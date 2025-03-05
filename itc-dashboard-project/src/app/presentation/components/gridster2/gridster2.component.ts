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
import { RadioSelectorComponent } from "../shared/data-entry/radio-selector/radio-selector.component";
import { LineChartComponent } from '../shared/data-view/line-chart/line-chart.component';
import { NgxGraphCustomCurveComponent } from '../shared/data-view/graph-custom-curve/graph-custom-curve.component';
import { AdvancedPieChartComponent } from '../shared/data-view/advanced-pie-chart/advanced-pie-chart.component';
import { UnifiedTableComponent } from '../shared/data-view/table/table.component';

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
    RadioSelectorComponent,
    LineChartComponent,
    NgxGraphCustomCurveComponent,
    AdvancedPieChartComponent,
    UnifiedTableComponent
  ],
  templateUrl: './gridster2.component.html',
  styleUrls: ['./gridster2.component.scss']
})
export class GridsterDashboardComponent implements OnInit {
  options!: SafeGridsterConfig;
  dashboard!: ExtendedGridsterItem[];
  isModalVisible: boolean = false;
  // Valor seleccionado para el tipo de widget
  selectedChartType: 'line-chart' | 'graph-custom-curve' | 'advanced-pie-chart' | 'table' = 'line-chart';
  // Controla si se permiten empujar los widgets (pushItems)
  pushItemsEnabled: boolean = true;

  ngOnInit(): void {
    this.options = {
      gridType: GridType.ScrollVertical,
      compactType: CompactType.None,
      margin: 2,
      outerMargin: false,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 640,
      useBodyForBreakpoint: false,
      minCols: 5,
      maxCols: 100,
      minRows: 5,
      maxRows: 100,
      minItemCols: 1,
      maxItemCols: 100,
      minItemRows: 1,
      maxItemRows: 100,
      minItemArea: 1,
      maxItemArea: 2500,
      defaultItemCols: 6,
      defaultItemRows: 6,
      fixedColWidth: 105,
      fixedRowHeight: 105,
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

    // Inicialmente, el dashboard está vacío.
    this.dashboard = [
      { id: 1, cols: 1, rows: 1, x: 0, y: 0, chartType: 'line-chart' },
      { id: 2, cols: 1, rows: 1, x: 1, y: 0, chartType: 'graph-custom-curve' },
      { id: 3, cols: 1, rows: 1, x: 2, y: 0, chartType: 'advanced-pie-chart' },
      { id: 4, cols: 3, rows: 2, x: 0, y: 1, chartType: 'table' },
      { id: 5, cols: 2, rows: 2, x: 3, y: 0, chartType: 'line-chart' },
      { id: 6, cols: 2, rows: 2, x: 3, y: 2, chartType: 'graph-custom-curve' }
    ];
  }

  static itemChange(item: GridsterItem, itemComponent: any): void {
    console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item: GridsterItem, itemComponent: any): void {
    console.info('itemResized', item, itemComponent);
  }

  changedOptions(): void {
    // Aquí, por ejemplo, se borran todos los widgets y se actualizan las opciones.
    this.dashboard = [];
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem(item: ExtendedGridsterItem): void {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem(): void {
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

  handleModalAdd(): void {
    if (this.selectedChartType) {
      this.addItem();
      this.closeCustomModal();
    } else {
      alert('Please select a chart type.');
    }
  }

  // Alterna la propiedad pushItems: true / false y actualiza la configuración
  togglePushItems(): void {
    this.pushItemsEnabled = !this.pushItemsEnabled;
    this.options.pushItems = this.pushItemsEnabled;
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }
}