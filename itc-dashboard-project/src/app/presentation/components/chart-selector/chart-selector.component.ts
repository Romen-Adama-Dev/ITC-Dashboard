import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChartOption {
  label: string;
  value: string;
  category: string;
}

@Component({
  selector: 'app-chart-selector-vanilla',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chart-selector.component.html',
  styleUrls: ['./chart-selector.component.scss']
})
export class ChartSelectorVanillaComponent {
  @Input() selectedChartCategory?: string;
  @Input() selectedChartVariant?: string;
  @Output() selectedChartVariantChange = new EventEmitter<string>();

  chartOptions: ChartOption[] = [
    { label: 'Line Chart', value: 'line-chart', category: 'line-chart' },
    { label: 'Area Chart', value: 'area-chart', category: 'line-chart' },
    { label: 'Box Chart', value: 'box-chart', category: 'line-chart' },
    { label: 'Normalized Area Chart', value: 'normalized-area-chart', category: 'line-chart' },
    { label: 'Stacked Area Chart', value: 'stacked-area-chart', category: 'line-chart' },
    { label: 'Advanced Pie Chart', value: 'advanced-pie-chart', category: 'pie-chart' },
    { label: 'Pie Chart', value: 'pie-chart', category: 'pie-chart' },
    { label: 'Pie Grid Chart', value: 'pie-grid-chart', category: 'pie-chart' },
    { label: 'Horizontal Bar Chart', value: 'horizontal-bar', category: 'bar-chart' },
    { label: 'Grouped Horizontal Bar Chart', value: 'grouped-horizontal-bar', category: 'bar-chart' },
    { label: 'Stacked Horizontal Bar Chart', value: 'stacked-horizontal-bar-chart', category: 'bar-chart' },
    { label: 'Normalized Horizontal Bar Chart', value: 'normalized-horizontal-chart', category: 'bar-chart' },
    { label: 'Vertical Bar Chart', value: 'vertical-bar', category: 'bar-chart' },
    { label: 'Grouped Vertical Bar Chart', value: 'grouped-vertical-bar', category: 'bar-chart' },
    { label: 'Stacked Vertical Bar Chart', value: 'stacked-vertical-bar-chart', category: 'bar-chart' },
    { label: 'Normalized Vertical Bar Chart', value: 'normalized-vertical-chart', category: 'bar-chart' },
    { label: 'Gauge Chart', value: 'gauge-chart', category: 'gauge-chart' },
    { label: 'Linear Gauge Chart', value: 'linear-gauge-chart', category: 'gauge-chart' },
    { label: 'Percent Gauge Chart', value: 'percent-gauge-chart', category: 'gauge-chart' },
    { label: 'Bubble Chart', value: 'bubble-chart', category: 'bubble-chart' },
    { label: 'Polar Chart', value: 'polar-chart', category: 'polar-chart' },
    { label: 'Graph custom', value: 'graph-custom', category: 'graph-custom' },
    { label: 'Heat Map', value: 'heat-map', category: 'other' },
    { label: 'Number Cards', value: 'number-chart', category: 'other' },
    { label: 'Tree Map', value: 'tree-map', category: 'other' },
    { label: 'Table', value: 'table', category: 'table' }
  ];

  get filteredOptions(): ChartOption[] {
    if (!this.selectedChartCategory) {
      return [];
    }
    return this.chartOptions.filter(option => option.category === this.selectedChartCategory);
  }

  onSelectionChange(newValue: string): void {
    this.selectedChartVariantChange.emit(newValue);
  }
}