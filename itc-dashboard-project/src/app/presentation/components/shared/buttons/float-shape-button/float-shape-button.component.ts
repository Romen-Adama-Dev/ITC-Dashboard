import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-float-shape-button',
  standalone: true,
  imports: [NzFloatButtonModule, NzIconModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './float-shape-button.component.html',
  styleUrls: ['./float-shape-button.component.scss']
})
export class FloatShapeButtonComponent {
  @Input() shape: 'circle' | 'square' = 'circle';
  @Input() nzType: 'primary' | 'default' | 'dashed' | 'link' = 'primary';
  @Input() icon: string = 'customer-service';
  @Input() iconTheme: 'outline' | 'fill' = 'outline';
  @Input() right: string = '24px';
  @Input() nzDescription: string | TemplateRef<void> = '';
  @Input() nzHref: string = '';
  @Input() nzTarget: string = '';
  @Input() disabled: boolean = false;  // <-- Propiedad agregada

  @Output() nzOnClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleClick(): void {
    if (!this.disabled) {  // Solo emite si no está deshabilitado
      this.nzOnClick.emit(true);
    }
  }
}