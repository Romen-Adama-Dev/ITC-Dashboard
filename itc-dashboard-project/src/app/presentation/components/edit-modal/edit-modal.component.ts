// edit-modal.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

import { DefaultButtonComponent } from '../shared/buttons/default-button/default-button.component'
import { PrimaryButtonComponent } from '../shared/buttons/primary-button/primary-button.component'

@Component({
  selector: 'app-edit-widget-modal',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    DefaultButtonComponent,
    PrimaryButtonComponent,
    TranslateModule
  ],
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditWidgetModalComponent implements OnInit {
  @Input() isVisible: boolean = false
  @Input() dataCount: string = 'all'
  @Input() dataSource: string = ''
  @Output() save = new EventEmitter<{ dataCount: string; dataSource: string }>()
  @Output() close = new EventEmitter<void>()

  warningMessage: string = ''
  dataSources: string[] = []

  constructor(
    private readonly translate: TranslateService,
    private readonly http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http.get<string[]>('/assets/data-sources.json').subscribe(files => {
      this.dataSources = files.map(f => `/assets/datasets/${f}`)
      if (!this.dataSource && this.dataSources.length) {
        this.dataSource = this.dataSources[0]
      }
    })
  }

  handleSave(): void {
    if (this.dataCount && Number(this.dataCount) <= 0) {
      this.warningMessage = this.translate.instant('EDIT_WIDGET_MODAL.WARNING_INVALID_COUNT')
      return
    }
    const newDataCount = this.dataCount && Number(this.dataCount) > 0 ? this.dataCount : 'all'
    this.save.emit({ dataCount: newDataCount, dataSource: this.dataSource })
    this.handleClose()
  }

  handleClose(): void {
    this.warningMessage = ''
    this.close.emit()
  }
}