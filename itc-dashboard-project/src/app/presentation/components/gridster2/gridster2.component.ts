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
import { PrimaryButtonComponent } from '../shared/buttons/primary-button/primary-button.component';
import { DefaultButtonComponent } from '../shared/buttons/default-button/default-button.component';

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
  options!: SafeGridsterConfig;
  dashboard!: Array<GridsterItem>;
  
  // Propiedad para controlar la visibilidad del modal personalizado.
  isModalVisible: boolean = false;

  ngOnInit(): void {
    this.options = {
      gridType: GridType.Fit,
      compactType: CompactType.None,
      margin: 10,
      outerMargin: true,
      draggable: { enabled: true },
      resizable: { enabled: true },
      pushItems: true,
      pushDirections: { north: true, east: true, south: true, west: true },
      displayGrid: DisplayGrid.Always,
      itemChangeCallback: GridsterDashboardComponent.itemChange,
      itemResizeCallback: GridsterDashboardComponent.itemResize
    };

    // Inicialmente, el dashboard está vacío.
    this.dashboard = [];
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

  // Abre el modal personalizado
  openCustomModal(): void {
    this.isModalVisible = true;
  }

  // Cierra el modal sin acción
  closeCustomModal(): void {
    this.isModalVisible = false;
  }

  // Función que se llama al confirmar el modal: agrega un nuevo widget y cierra el modal.
  handleModalAdd(): void {
    this.addItem();
    this.closeCustomModal();
  }
}