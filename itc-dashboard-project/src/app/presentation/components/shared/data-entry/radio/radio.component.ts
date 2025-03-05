import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzInputModule } from 'ng-zorro-antd/input';

export interface RadioOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [CommonModule, FormsModule, NzRadioModule, NzInputModule],
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class UnifiedRadioGroupComponent {
  // Valor seleccionado del grupo
  @Input() radioValue: any = null;
  // Nombre del grupo
  @Input() radioName: string = 'radiogroup';
  // Foco automático para cada radio
  @Input() autoFocus: boolean = false;
  // Deshabilitar radios
  @Input() disabled: boolean = false;
  // Opciones del grupo, personalizables desde el componente padre
  @Input() options: RadioOption[] = [
    { label: 'Option A', value: 'A' },
    { label: 'Option B', value: 'B' },
    { label: 'Option C', value: 'C' },
    { label: 'Option D', value: 'D' },
    { label: 'More...', value: 'M' }
  ];
}