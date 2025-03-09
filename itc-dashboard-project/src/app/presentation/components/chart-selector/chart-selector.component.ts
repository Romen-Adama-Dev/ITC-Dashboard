import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chart-selector-vanilla',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chart-selector.component.html',
  styleUrls: ['./chart-selector.component.scss']
})
export class ChartSelectorVanillaComponent {
  // Valor seleccionado (two-way binding)
  @Input() selectedChartType?: string;
  @Output() selectedChartTypeChange = new EventEmitter<string>();

  // Opciones disponibles para seleccionar el gráfico
  chartOptions = [
    { label: 'Line Chart', value: 'line-chart' },
    { label: 'Advanced Pie Chart', value: 'advanced-pie-chart' }
    // Puedes agregar más opciones si es necesario
  ];

  onSelectionChange(newValue: string): void {
    this.selectedChartTypeChange.emit(newValue);
  }
}