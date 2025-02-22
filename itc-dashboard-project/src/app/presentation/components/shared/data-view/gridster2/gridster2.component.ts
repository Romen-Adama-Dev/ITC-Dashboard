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
  Resizable
} from 'angular-gridster2';
import { PrimaryButtonComponent } from '../../buttons/primary-button/primary-button.component';
import { DefaultButtonComponent } from '../../buttons/default-button/default-button.component';

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
    GridsterComponent,
    GridsterItemComponent,
    PrimaryButtonComponent,
    DefaultButtonComponent
  ],
  templateUrl: './gridster2.component.html',
  styleUrls: ['./gridster2.component.scss']
})
export class GridsterDashboardComponent implements OnInit {
  // Usamos nuestro tipo extendido para que el compilador sepa las propiedades extra.
  options!: SafeGridsterConfig;
  dashboard!: Array<GridsterItem>;

  ngOnInit(): void {
    this.options = {
      gridType: GridType.Fit,
      compactType: CompactType.None,
      margin: 10,
      outerMargin: true,
      // Estas propiedades permiten mover y redimensionar y empujar los items
      draggable: { enabled: true },
      resizable: { enabled: true },
      pushItems: true,
      pushDirections: { north: true, east: true, south: true, west: true },
      // Opciones de grid
      displayGrid: DisplayGrid.Always,
      // Callback de eventos
      itemChangeCallback: GridsterDashboardComponent.itemChange,
      itemResizeCallback: GridsterDashboardComponent.itemResize
    };

    // Configuración inicial del dashboard.
    // Puedes ajustarla según las necesidades (por ejemplo, usar diferentes tamaños, posiciones o restricciones)
    this.dashboard = [
      /*
      { id: 1, cols: 1, rows: 1, x: 0, y: 0 },
      { id: 2, cols: 1, rows: 1, x: 1, y: 0 },
      { id: 3, cols: 1, rows: 1, x: 2, y: 0 },
      // Item 2x2
      { id: 4, cols: 2, rows: 2, x: 3, y: 0 },
      // Item 3x3
      { id: 5, cols: 3, rows: 3, x: 0, y: 1 },
      // Otro ejemplo (2x2)
      { id: 6, cols: 2, rows: 2, x: 3, y: 2 }*/
    ];
  }

  static itemChange(item: GridsterItem, itemComponent: any): void {
    console.info('itemChanged', item, itemComponent);
  }
  
  static itemResize(item: GridsterItem, itemComponent: any): void {
    console.info('itemResized', item, itemComponent);
  }

  changedOptions(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem(item: GridsterItem): void {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem(): void {
    let newId = 1;
    if (this.dashboard && this.dashboard.length > 0) {
      newId = Math.max(...this.dashboard.map(item => item['id'])) + 1;
    }
    const newItem: GridsterItem = { id: newId, cols: 1, rows: 1, x: 0, y: 0 };
    this.dashboard.push(newItem);
  }

  trackByFn(index: number, item: GridsterItem): number {
    return item['id'];
  }
}