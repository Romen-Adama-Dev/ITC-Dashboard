import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import {
  GridsterConfig,
  GridsterItem,
  GridsterModule,
  GridType,
  CompactType,
  DisplayGrid
} from 'angular-gridster2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gridster-dashboard',
  standalone: true,
  imports: [CommonModule, GridsterModule],
  templateUrl: './gridster-dashboard.component.html',
  styleUrls: ['./gridster-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GridsterDashboardComponent implements OnInit {
  @Input() options: GridsterConfig = {};
  @Input() dashboard: GridsterItem[] = [];

  ngOnInit(): void {
    this.options = {
      gridType: GridType.Fit,
      compactType: CompactType.None,
      margin: 10,
      outerMargin: true,
      mobileBreakpoint: 640,
      draggable: { enabled: true },
      resizable: { enabled: true },
      pushItems: true,
      displayGrid: DisplayGrid.Always,
      itemChangeCallback: this.itemChange,
      itemResizeCallback: this.itemResize
    };

    if (this.dashboard.length === 0) {
      this.dashboard = [
        { cols: 2, rows: 1, y: 0, x: 0, content: 'Default Widget 1' },
        { cols: 2, rows: 2, y: 0, x: 2, content: 'Default Widget 2' },
        { cols: 1, rows: 1, y: 1, x: 4, content: 'Default Widget 3' }
      ];
    }
  }

  itemChange(item: GridsterItem): void {
    console.info('Item changed', item);
  }

  itemResize(item: GridsterItem): void {
    console.info('Item resized', item);
  }

  addItem(): void {
    this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 1, content: 'New Widget' });
  }

  removeItem(item: GridsterItem): void {
    const index = this.dashboard.indexOf(item);
    if (index > -1) {
      this.dashboard.splice(index, 1);
    }
  }

  removeAllItems(): void {
    this.dashboard = [];
  }
}
