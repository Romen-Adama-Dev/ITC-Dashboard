import { Component, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-link-button',
  standalone: true,
  imports: [NzButtonModule],
  templateUrl: './link-button.component.html',
  styleUrls: ['./link-button.component.scss']
})
export class LinkButtonComponent {
  @Input() nzSize: 'large' | 'default' | 'small' = 'default';
  @Input() nzLoading = false;
  @Input() disabled = false;
  @Input() label: string = '';
  @Input() nzDanger: boolean = false;
}