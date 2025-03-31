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
import { EditWidgetModalComponent } from "../edit-modal/edit-modal.component";
import { ChartDataService } from '../shared/data-view/chart-data.service';

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
    TreeMapComponent,
    EditWidgetModalComponent
  ],
  templateUrl: './gridster2.component.html',
  styleUrls: ['./gridster2.component.scss']
})
export class GridsterDashboardComponent implements OnInit {
  options!: SafeGridsterConfig;
  dashboard!: ExtendedGridsterItem[];
  isModalVisible: boolean = false;
  isEditModalVisible: boolean = false;
  currentEditItem: ExtendedGridsterItem | null = null;
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
      { id: 1, cols: 2, rows: 2, y: 0, x: 0, chartType: 'advanced-pie-chart' },
      { id: 1, cols: 2, rows: 2, y: 0, x: 0, chartType: 'gauge-chart' },
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

  // Método que se invoca cuando el modal confirma la selección
  onAddChart(selection: { chartType: string, dataSource: string, dataCount: string }): void {
    this.selectedChartType = selection.chartType as 
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
      'vertical-bar';
    const newId = this.dashboard.length > 0 ? Math.max(...this.dashboard.map(item => item['id'])) + 1 : 1;
    const newItem: ExtendedGridsterItem = {
      id: newId,
      cols: 1,
      rows: 1,
      x: 0,
      y: 0,
      chartType: this.selectedChartType,
      dataSource: selection.dataSource,
      dataCount: selection.dataCount
    };
    this.dashboard.push(newItem);
    this.closeCustomModal();
  }

  togglePushItems(): void {
    this.pushItemsEnabled = !this.pushItemsEnabled;
    this.options.pushItems = this.pushItemsEnabled;
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  // Método para abrir el modal de edición para un widget
  editItem(item: ExtendedGridsterItem): void {
    this.currentEditItem = item;
    if (!this.currentEditItem['dataCount']) {
      this.currentEditItem['dataCount'] = 'all';
    }
    this.isEditModalVisible = true;
  }

  constructor(private chartDataService: ChartDataService) {}

  reloadWidgetData(item: any): void {
    const dataSource = item.dataSource || '/assets/data-set-1.json';
    this.chartDataService.loadChartsData(dataSource).subscribe({
      next: () => {
        console.log(`✅ Datos recargados desde ${dataSource}`);
      },
      error: (error) => {
        console.error('❌ Error al recargar los datos del gráfico:', error);
      }
    });
  }

  handleWidgetEditSave(update: { dataCount: string; dataSource: string }) {
    if (this.currentEditItem) {
      this.currentEditItem['dataCount'] = update.dataCount;
      this.currentEditItem['dataSource'] = update.dataSource;
      this.reloadWidgetData(this.currentEditItem);
    }
    this.handleEditModalClose();
  }

  handleEditModalClose(): void {
    this.isEditModalVisible = false;
  }

  // Método que genera y descarga un archivo JSON con la configuración actual del dashboard,
  // permitiendo ingresar un nombre personalizado para el archivo.
  serializeToJson(): void {
    const fileNameInput = prompt("Ingrese el nombre del archivo (sin extensión):", "dashboardConfig");
    const fileName = fileNameInput ? fileNameInput + ".json" : "dashboardConfig.json";
    const json = JSON.stringify(this.dashboard, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    console.log('Dashboard serialized as JSON file:', json);
  }

  // Método para cargar (sobrescribir) el dashboard desde un archivo JSON seleccionado.
  // Si existen datos en el dashboard, se limpian (se utiliza la función changedOptions)
  // y se muestra únicamente lo contenido en el archivo JSON.
  loadJsonFromFile(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Limpia el dashboard actual
      this.changedOptions();
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const loadedDashboard = JSON.parse(e.target.result);
          this.dashboard = loadedDashboard;
          if (this.options.api && this.options.api.optionsChanged) {
            this.options.api.optionsChanged();
          }
          console.log('Dashboard loaded from JSON file:', loadedDashboard);
        } catch (error) {
          console.error('Error parsing JSON file', error);
        }
      };
      reader.readAsText(file);
    }
  }

  // Método deserialize que actualiza el dashboard actual con los elementos del JSON,
  // agregando aquellos que no existen y actualizando (haciendo merge) los existentes según su id.
  deserialize(json: string): void {
    try {
      const parsedData = JSON.parse(json);
      if (Array.isArray(parsedData)) {
        parsedData.forEach(newItem => {
          const index = this.dashboard.findIndex(item => item['id'] === newItem.id);
          if (index >= 0) {
            // Actualiza el elemento existente con las propiedades del nuevo elemento
            this.dashboard[index] = { ...this.dashboard[index], ...newItem };
          } else {
            // Agrega el nuevo elemento al dashboard
            this.dashboard.push(newItem);
          }
        });
      } else {
        console.error("El JSON debe ser un array de configuraciones.");
      }
      if (this.options.api && this.options.api.optionsChanged) {
        this.options.api.optionsChanged();
      }
      console.log('Dashboard updated with deserialized JSON:', this.dashboard);
    } catch (error) {
      console.error('Error deserializing JSON', error);
    }
  }

  // Método para deserializar el dashboard desde un archivo JSON seleccionado,
  // usando el input file. Este método carga el archivo y llama a deserialize,
  // que recorre el JSON y actualiza (hace merge) el dashboard actual, sin limpiar completamente los datos existentes.
  deserializeFromFile(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const json = e.target.result;
          this.deserialize(json);
        } catch (error) {
          console.error('Error al leer el archivo', error);
        }
      };
      reader.readAsText(file);
    }
  }
}