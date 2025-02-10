import { Component, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-primary-button',
  standalone: true,
  imports: [NzButtonModule],
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss']
})
export class PrimaryButtonComponent {
  @Input() nzSize: 'large' | 'default' | 'small' = 'default';
  @Input() nzLoading = false;
  @Input() disabled = false;
}