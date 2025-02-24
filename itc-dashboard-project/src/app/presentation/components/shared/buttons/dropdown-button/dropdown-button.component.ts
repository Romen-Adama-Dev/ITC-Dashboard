import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-dropdown-button',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzDropDownModule, NzIconModule],
  templateUrl: './dropdown-button.component.html',
  styleUrls: ['./dropdown-button.component.scss']
})
export class DropdownButtonComponent {
  @Input() disabled: boolean = false;
  @Input() nzGhost: boolean = false;
  @Input() nzLoading: boolean = false;
  @Input() nzShape: 'circle' | 'round' = 'round';
  @Input() nzSize: 'large' | 'small' | 'default' = 'default';
  @Input() nzType: 'primary' | 'dashed' | 'text' | 'link' = 'primary';
  @Input() nzBlock: boolean = false;
  @Input() nzDanger: boolean = false;
  @Input() nzIcon: string | null = null;

  @Input() label: string = 'Actions';
}