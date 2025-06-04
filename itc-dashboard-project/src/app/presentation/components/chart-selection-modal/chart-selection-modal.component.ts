import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { HttpClient, HttpClientModule } from '@angular/common/http'
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
    HttpClientModule,
    DefaultButtonComponent,
    PrimaryButtonComponent,
    ChartSelectorVanillaComponent,
    TranslateModule
  ],
  templateUrl: './chart-selection-modal.component.html',
  styleUrls: ['./chart-selection-modal.component.scss']
})
export class ChartSelectionModalComponent implements OnInit {
  @Input() isVisible: boolean = false

  selectedChartCategory?: string
  selectedChartVariant?: string
  @Input() selectedDataSource: string = ''
  selectedDataCount: string = 'all'

  dataSources: string[] = []

  @Output() addChart = new EventEmitter<{ chartType: string; dataSource: string; dataCount: string }>()
  @Output() closeModal = new EventEmitter<void>()

  constructor(
    private readonly translate: TranslateService,
    private readonly http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http.get<string[]>('/assets/data-sources.json').subscribe(files => {
      this.dataSources = files.map(f => `/assets/datasets/${f}`)
      if (this.dataSources.length) {
        this.selectedDataSource = this.dataSources[0]
      }
    })
  }

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