import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChartSelectorVanillaComponent } from "../chart-selector/chart-selector.component";
import { DefaultButtonComponent } from "../shared/buttons/default-button/default-button.component";
import { PrimaryButtonComponent } from "../shared/buttons/primary-button/primary-button.component";

@Component({
  selector: 'app-chart-selection-modal',
  templateUrl: './chart-selection-modal.component.html',
  styleUrls: ['./chart-selection-modal.component.scss'],
  imports: [ChartSelectorVanillaComponent, DefaultButtonComponent, PrimaryButtonComponent]
})
export class ChartSelectionModalComponent {
  // Controla la visibilidad del modal
  @Input() isVisible: boolean = false;
  // Tipo de gráfico seleccionado
  @Input() selectedChartType?: 
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
      
  // Se emite cuando se confirma la selección del tipo de gráfico
  @Output() addChart: EventEmitter<string> = new EventEmitter();
  // Se emite cuando se cierra el modal
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  @Output() selectedChartTypeChange = new EventEmitter<
  'line-chart' | 'advanced-pie-chart' | 'area-chart' | 'box-chart' |
  'bubble-chart' | 'gauge-chart' | 'graph-custom' | 'grouped-horizontal-bar' |
  'vertical-bar-chart' | 'heat-map' | 'horizontal-bar' | 'linear-gauge-chart' |
  'normalized-area-chart' | 'normalized-horizontal-chart' | 'normalized-vertical-chart' |
  'number-chart' | 'percent-gauge-chart' | 'pie-chart' | 'pie-grid-chart' |
  'polar-chart' | 'stacked-area-chart' | 'stacked-horizontal-bar-chart' |
  'stacked-vertical-bar-chart' | 'table' | 'tree-map'
>();

  handleAdd(): void {
    if (this.selectedChartType) {
      this.addChart.emit(this.selectedChartType);
    } else {
      alert('Please select a chart type.');
    }
  }

  handleClose(): void {
    this.closeModal.emit();
  }
}