import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [FormsModule, NzRadioModule, NzInputModule, CommonModule],
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class UnifiedRadioGroupComponent {
  radioValue: string = 'A';
  radioName: string = 'radiogroup';
}