import { Component, Input, Output, EventEmitter } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { TranslateModule, TranslateService } from '@ngx-translate/core'

import { DefaultButtonComponent } from '../shared/buttons/default-button/default-button.component'
import { PrimaryButtonComponent } from '../shared/buttons/primary-button/primary-button.component'

@Component({
  selector: 'app-edit-widget-modal',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    DefaultButtonComponent,
    PrimaryButtonComponent,
    TranslateModule
  ],
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditWidgetModalComponent {
  @Input() isVisible: boolean = false
  @Input() dataCount: string = 'all'
  @Input() dataSource: string = '/assets/data-set-1.json'
  @Output() save = new EventEmitter<{ dataCount: string; dataSource: string }>()
  @Output() close = new EventEmitter<void>()

  warningMessage: string = ''

  constructor(private translate: TranslateService) {}

  handleSave(): void {
    if (this.dataCount && Number(this.dataCount) <= 0) {
      this.warningMessage = this.translate.instant('EDIT_WIDGET_MODAL.WARNING_INVALID_COUNT')
      return
    }
    const newDataCount =
      this.dataCount && Number(this.dataCount) > 0
        ? this.dataCount
        : 'all'
    this.save.emit({ dataCount: newDataCount, dataSource: this.dataSource })
    this.handleClose()
  }

  handleClose(): void {
    this.warningMessage = ''
    this.close.emit()
  }
}