import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd/radio';

export interface RadioOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-radio-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, NzRadioModule],
  templateUrl: './radio-selector.component.html',
  styleUrls: ['./radio-selector.component.scss']
})
export class RadioSelectorComponent {
  @Input() nzName: string = 'radiogroup';
  @Input() nzAutoFocus: boolean = false;
  @Input() nzDisabled: boolean = false;
  @Input() ngModel: any;
  @Output() ngModelChange = new EventEmitter<any>();
  @Input() nzValue: any;
  @Input() label: string = '';
}