import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

import { DefaultButtonComponent } from '../shared/buttons/default-button/default-button.component'
import { PrimaryButtonComponent } from '../shared/buttons/primary-button/primary-button.component'
import { ChartSelectorVanillaComponent } from '../chart-selector/chart-selector.component'

@Component({
  selector: 'app-chart-selection-modal',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    DefaultButtonComponent,
    PrimaryButtonComponent,
    ChartSelectorVanillaComponent,
    TranslateModule
  ],
  templateUrl: './chart-selection-modal.component.html',
  styleUrls: ['./chart-selection-modal.component.scss']
})
export class ChartSelectionModalComponent {
  @Input() isVisible: boolean = false

  selectedChartCategory?: string
  selectedChartVariant?: string
  @Input() selectedDataSource: string = '/assets/data-set-1.json'
  selectedDataCount: string = 'all'

  @Output() addChart = new EventEmitter<{ chartType: string; dataSource: string; dataCount: string }>()
  @Output() closeModal = new EventEmitter<void>()

  constructor(private readonly translate: TranslateService) {}

  selectChartCategory(category: string): void {
    this.selectedChartCategory = category
    this.selectedChartVariant = undefined
  }

  handleAdd(): void {
    const dataCount =
      this.selectedDataCount && Number(this.selectedDataCount) > 0
        ? this.selectedDataCount
        : 'all'

    if (this.selectedChartVariant && this.selectedDataSource) {
      this.addChart.emit({
        chartType: this.selectedChartVariant,
        dataSource: this.selectedDataSource,
        dataCount
      })
    } else {
      alert(this.translate.instant('WARNING'))
    }
  }

  handleClose(): void {
    this.closeModal.emit()
  }
}