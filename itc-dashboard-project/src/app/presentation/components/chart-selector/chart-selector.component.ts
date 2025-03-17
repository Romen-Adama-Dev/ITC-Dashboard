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
  @Input() selectedChartType?: string;
  @Output() selectedChartTypeChange = new EventEmitter<string>();

  chartOptions = [
    { label: 'Advanced Pie Chart', value: 'advanced-pie-chart' },
    { label: 'Area Chart', value: 'area-chart' },
    { label: 'Box Chart', value: 'box-chart' },
    { label: 'Bubble Chart', value: 'bubble-chart' },
    { label: 'Gauge Chart', value: 'gauge-chart' },
    { label: 'Graph custom', value: 'graph-custom' },
    { label: 'Grouped Horizontal Bar Chart', value: 'grouped-horizontal-bar' },
    { label: 'Grouped Vertical Bar Chart', value: 'grouped-vertical-bar' },
    { label: 'Heat Map', value: 'heat-map' },
    { label: 'Horizontal Bar Chart', value: 'horizontal-bar' },
    { label: 'Line Chart', value: 'line-chart' },
    { label: 'Linear Gauge Chart', value: 'linear-gauge-chart' },
    { label: 'Normalized Area Chart', value: 'normalized-area-chart' },
    { label: 'Normalized Horizontal Bar Chart', value: 'normalized-horizontal-chart' },
    { label: 'Normalized Vertical Bar Chart', value: 'normalized-vertical-chart' },
    { label: 'Number Cards', value: 'number-chart' },
    { label: 'Percent Gauge Chart', value: 'percent-gauge-chart' },
    {label: 'Pie Chart', value: 'pie-chart'},
    {label: 'Pie Grid Chart', value: 'pie-grid-chart'},
    {label: 'Polar Chart', value: 'polar-chart'},
    {label: 'Stacked Area Chart', value: 'stacked-area-chart'},
    {label: 'Stacked Horizontal Bar Chart', value: 'stacked-horizontal-bar-chart'},
    {label: 'Stacked Vertical Bar Chart', value: 'stacked-vertical-bar-chart'},
    {label: 'Table', value: 'table'},
    {label: 'Tree Map', value: 'tree-map'},
    {label: 'Vertical Bar Chart', value: 'vertical-bar'}
  ];

  onSelectionChange(newValue: string): void {
    this.selectedChartTypeChange.emit(newValue);
  }
}