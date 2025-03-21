import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DefaultButtonComponent } from "../shared/buttons/default-button/default-button.component";
import { PrimaryButtonComponent } from "../shared/buttons/primary-button/primary-button.component";
import { ChartSelectorVanillaComponent } from "../chart-selector/chart-selector.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chart-selection-modal',
  templateUrl: './chart-selection-modal.component.html',
  styleUrls: ['./chart-selection-modal.component.scss'],
  imports: [DefaultButtonComponent, PrimaryButtonComponent, ChartSelectorVanillaComponent, FormsModule]
})
export class ChartSelectionModalComponent {
  @Input() isVisible: boolean = false;
  
  // Selección del tipo de gráfico
  @Input() selectedChartType: 
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

  // Fuente de datos seleccionada
  @Input() selectedDataSource: string = '/assets/data-set-1.json';

  // Emite un objeto con la selección del gráfico y la fuente de datos
  @Output() addChart = new EventEmitter<{ chartType: string, dataSource: string }>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  handleAdd(): void {
    if (this.selectedChartType && this.selectedDataSource) {
      this.addChart.emit({ chartType: this.selectedChartType, dataSource: this.selectedDataSource });
    } else {
      alert('Please select a chart type and data source.');
    }
  }

  handleClose(): void {
    this.closeModal.emit();
  }
}