import { Component, Input, Output, EventEmitter } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { DefaultButtonComponent } from '../shared/buttons/default-button/default-button.component'
import { PrimaryButtonComponent } from '../shared/buttons/primary-button/primary-button.component'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-edit-widget-modal',
  standalone: true,
  imports: [FormsModule, CommonModule, DefaultButtonComponent, PrimaryButtonComponent],
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

  handleSave(): void {
    if (this.dataCount && Number(this.dataCount) <= 0) {
      this.warningMessage = 'Please enter a valid positive number, or leave empty for all.'
      return
    }
    const newDataCount = this.dataCount && Number(this.dataCount) > 0 ? this.dataCount : 'all'
    this.save.emit({ dataCount: newDataCount, dataSource: this.dataSource })
    this.handleClose()
  }

  handleClose(): void {
    this.close.emit()
  }
}