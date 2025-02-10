import { Component, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-default-button',
  standalone: true,
  imports: [NzButtonModule],
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.scss']
})
export class DefaultButtonComponent {
  @Input() nzSize: 'large' | 'default' | 'small' = 'default';
  @Input() nzLoading = false;
  @Input() disabled = false;
}