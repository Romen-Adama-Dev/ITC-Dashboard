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
  
  selectedChartCategory?: string;
  selectedChartVariant?: string;
  @Input() selectedDataSource: string = '/assets/data-set-1.json';
  selectedDataCount: string = 'all';

  @Output() addChart = new EventEmitter<{ chartType: string, dataSource: string, dataCount: string }>();
  @Output() closeModal = new EventEmitter<void>();

  selectChartCategory(category: string): void {
    this.selectedChartCategory = category;
    this.selectedChartVariant = undefined;
  }

  handleAdd(): void {
    const dataCount = this.selectedDataCount && Number(this.selectedDataCount) > 0 ? this.selectedDataCount : 'all';
    if (this.selectedChartVariant && this.selectedDataSource) {
      this.addChart.emit({ 
        chartType: this.selectedChartVariant, 
        dataSource: this.selectedDataSource, 
        dataCount: dataCount 
      });
    } else {
      alert('Please select a chart variant and data source.');
    }
  }

  handleClose(): void {
    this.closeModal.emit();
  }
}