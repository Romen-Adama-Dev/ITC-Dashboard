import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [NzButtonModule, NzIconModule, CommonModule],
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent {
  @Input() nzType: 'primary' | 'default' | 'dashed' = 'primary';
  @Input() nzShape: 'circle' | null = null;
  @Input() nzSize: 'small' | 'default' | 'large' = 'default';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;

  @Input() icon: string = '';
  @Input() iconTheme: 'fill' | 'outline' | 'twotone' = 'outline';
  @Input() iconSpin: boolean = false;
  @Input() iconTwotoneColor: string = '';
  @Input() iconFont: string = '';
  @Input() iconRotate: number = 0;

  @Input() label: string = '';
}