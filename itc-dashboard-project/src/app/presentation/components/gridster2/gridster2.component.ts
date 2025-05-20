import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
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
} from 'angular-gridster2'

import { PrimaryButtonComponent } from '../shared/buttons/primary-button/primary-button.component'
import { DefaultButtonComponent } from '../shared/buttons/default-button/default-button.component'
import { FloatShapeButtonComponent } from '../shared/buttons/float-shape-button/float-shape-button.component'

// Charts
import { AreaChartComponent } from '../shared/data-view/area-chart/area-chart.component'
import { LineChartComponent } from '../shared/data-view/line-chart/line-chart.component'
import { AdvancedPieChartComponent } from '../shared/data-view/advanced-pie-chart/advanced-pie-chart.component'
import { BoxChartComponent } from '../shared/data-view/box-chart/box-chart.component'
import { BubbleChartComponent } from '../shared/data-view/bubble-chart/bubble-chart.component'
import { GaugeChartComponent } from '../shared/data-view/gauge-chart/gauge-chart.component'
import { HeatMapComponent } from '../shared/data-view/heat-chart/heat-chart.component'
import { HorizontalBarChartComponent } from '../shared/data-view/horizontal-chart/horizontal-chart.component'
import { LinearGaugeChartComponent } from '../shared/data-view/linear-gauge-chart/linear-gauge-chart.component'
import { NormalizedAreaChartComponent } from '../shared/data-view/normalized-area-chart/normalized-area-chart.component'
import { VerticalBarChartComponent } from '../shared/data-view/vertical-chart/vertical-chart.component'
import { NormalizedHorizontalBarChartComponent } from '../shared/data-view/normalized-horizontal-bar-chart/normalized-horizontal-bar-chart.component'
import { NormalizedVerticalBarChartComponent } from '../shared/data-view/normalized-vertical-bar-chart/normalized-vertical-bar-chart.component'
import { NumberCardsComponent } from '../shared/data-view/number-chart/number-chart.component'
import { PercentGaugeChartComponent } from '../shared/data-view/percent-gauge-chart/percent-gauge-chart.component'
import { PieGridComponent } from '../shared/data-view/pie-grid/pie-grid.component'
import { PieChartComponent } from '../shared/data-view/pie-chart/pie-chart.component'
import { PolarChartComponent } from '../shared/data-view/polar-chart/polar-chart.component'
import { StackedAreaChartComponent } from '../shared/data-view/stacked-area-chart/stacked-area-chart.component'
import { StackedHorizontalBarChartComponent } from '../shared/data-view/stacked-horizontal-bar-chart/stacked-horizontal-bar-chart.component'
import { StackedVerticalBarChartComponent } from '../shared/data-view/stacked-vertical-bar-chart/stacked-vertical-bar-chart.component'
import { TreeMapComponent } from '../shared/data-view/tree-chart/tree-chart.component'

import { ChartSelectionModalComponent } from '../chart-selection-modal/chart-selection-modal.component'
import { EditWidgetModalComponent } from '../edit-modal/edit-modal.component'
import { ChartDataService } from '../../../application/entities/chart-data.service'
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { MediatorService } from '../../../application/services/mediator.service'
import { ThemeToggleButtonComponent } from "../shared/buttons/theme-toggle-button.component";

interface ExtendedGridsterItem extends GridsterItem {
  chartType?: string
  dataSource?: string
  dataCount?: string | undefined
}

interface SafeGridsterConfig extends GridsterConfig {
  draggable: Draggable
  resizable: Resizable
  pushDirections: PushDirections
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
    TreeMapComponent,
    EditWidgetModalComponent,
    NzNotificationModule,
    NzIconModule,
    ThemeToggleButtonComponent
],
  templateUrl: './gridster2.component.html',
  styleUrls: ['./gridster2.component.scss']
})
export class GridsterDashboardComponent implements OnInit {
  options!: SafeGridsterConfig
  dashboard!: ExtendedGridsterItem[]
  isModalVisible = false
  isEditModalVisible = false
  currentEditItem: ExtendedGridsterItem | null = null
  currentTheme: 'default' | 'dark' = 'default';

  selectedChartType:
    | 'line-chart'
    | 'advanced-pie-chart'
    | 'area-chart'
    | 'box-chart'
    | 'bubble-chart'
    | 'gauge-chart'
    | 'vertical-bar-chart'
    | 'heat-map'
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
    | 'vertical-bar' = 'advanced-pie-chart'

  pushItemsEnabled = true

  constructor(
    private chartDataService: ChartDataService,
    private notification: NzNotificationService,
    private mediator: MediatorService
  ) {}

  ngOnInit(): void {
    // Mediador: reemite todos los eventos recibidos
    this.mediator.events$.subscribe(event => {
      this.mediator.emit(event)
    })

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
    }

    this.dashboard = [
      //{ id: 1, cols: 2, rows: 2, y: 0, x: 0, chartType: 'advanced-pie-chart' },
    ]
  }

  static itemChange(item: GridsterItem, itemComponent: any): void {
    console.info('itemChanged', item, itemComponent)
  }

  static itemResize(item: GridsterItem, itemComponent: any): void {
    console.info('itemResized', item, itemComponent)
  }

  changedOptions(): void {
    this.dashboard = []
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged()
    }
    this.notification.error('Error', 'Widgets borrados correctamente.')
  }

  removeItem(item: ExtendedGridsterItem): void {
    this.dashboard.splice(this.dashboard.indexOf(item), 1)
    this.notification.error('Error', 'Widget borrado correctamente.')
  }

  addItem(): void {
    if (!this.selectedChartType) {
      alert('Please select a chart type.')
      return
    }
    const newId = this.dashboard.length
      ? Math.max(...this.dashboard.map(i => i['id'])) + 1
      : 1
    this.dashboard.push({
      id: newId,
      cols: 1,
      rows: 1,
      x: 0,
      y: 0,
      chartType: this.selectedChartType
    })
  }

  trackByFn(_i: number, item: ExtendedGridsterItem): number {
    return item['id']
  }

  openCustomModal(): void {
    this.isModalVisible = true
    this.notification.info('Info', 'Modal abierto para selección de widget.')
  }

  closeCustomModal(): void {
    this.isModalVisible = false
  }

  onAddChart(selection: { chartType: string; dataSource: string; dataCount: string }): void {
    this.selectedChartType = selection.chartType as any
    const newId = this.dashboard.length
      ? Math.max(...this.dashboard.map(i => i['id'])) + 1
      : 1
    this.dashboard.push({
      id: newId,
      cols: 1,
      rows: 1,
      x: 0,
      y: 0,
      chartType: this.selectedChartType,
      dataSource: selection.dataSource,
      dataCount: selection.dataCount
    })
    this.notification.success('Success', 'Widget creado correctamente.')
    this.closeCustomModal()
  }

  togglePushItems(): void {
    this.pushItemsEnabled = !this.pushItemsEnabled
    this.options.pushItems = this.pushItemsEnabled
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged()
    }
    this.notification.info('Info', this.pushItemsEnabled ? 'Widgets desbloqueados.' : 'Widgets bloqueados.')
  }

  editItem(item: ExtendedGridsterItem): void {
    this.currentEditItem = item
    this.currentEditItem['dataCount'] ??= 'all'
    this.isEditModalVisible = true
  }

  reloadWidgetData(item: any): void {
    const dataSource = item.dataSource || '/assets/datasets/data-set-1.json'
    this.chartDataService.loadChartsData(dataSource).subscribe({
      next: () => console.log(`✅ Datos recargados desde ${dataSource}`),
      error: err => console.error('❌ Error al recargar datos:', err)
    })
  }

  handleWidgetEditSave(update: { dataCount: string; dataSource: string }): void {
    if (!this.currentEditItem) return
    this.currentEditItem['dataCount'] = update.dataCount
    this.currentEditItem['dataSource'] = update.dataSource
    this.reloadWidgetData(this.currentEditItem)
    this.notification.warning('Warning', 'Widget modificado correctamente.')
    this.handleEditModalClose()
  }

  handleEditModalClose(): void {
    this.isEditModalVisible = false
  }

  serializeToJson(): void {
    const name = prompt('Nombre de archivo:', 'dashboardConfig') || 'dashboardConfig'
    const blob = new Blob([JSON.stringify(this.dashboard, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `${name}.json`
    a.click()
    URL.revokeObjectURL(a.href)
    this.notification.info('Info', 'Dashboard serializado correctamente.')
  }

  loadJsonFromFile(event: any): void {
    const file = event.target.files[0]
    if (!file) return
    this.changedOptions()
    const reader = new FileReader()
    reader.onload = e => {
      try {
        this.dashboard = JSON.parse((e.target as any).result)
        if (this.options.api && this.options.api.optionsChanged) {
          this.options.api.optionsChanged()
        }
        this.notification.success('Success', 'Dashboard cargado desde JSON.')
      } catch {
        console.error('Error parsing JSON')
      }
    }
    reader.readAsText(file)
  }

  deserialize(json: string): void {
    try {
      const arr = JSON.parse(json)
      if (Array.isArray(arr)) {
        arr.forEach(item => {
          const idx = this.dashboard.findIndex(d => d['id'] === item['id'])
          if (idx >= 0) this.dashboard[idx] = { ...this.dashboard[idx], ...item }
          else this.dashboard.push(item)
        })
        if (this.options.api && this.options.api.optionsChanged) {
          this.options.api.optionsChanged()
        }
        this.notification.success('Success', 'Dashboard actualizado con JSON.')
      }
    } catch {
      console.error('Error deserializing JSON')
    }
  }

  deserializeFromFile(event: any): void {
    const file = event.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = e => this.deserialize((e.target as any).result)
    reader.readAsText(file)
  }

  onToggleTheme(): void {
    const darkLink = document.getElementById('dark-theme-css') as HTMLLinkElement
    if (this.currentTheme === 'default') {
      darkLink.disabled = false  
      this.currentTheme = 'dark'
    } else {
      darkLink.disabled = true   
      this.currentTheme = 'default'
    }
  }
}