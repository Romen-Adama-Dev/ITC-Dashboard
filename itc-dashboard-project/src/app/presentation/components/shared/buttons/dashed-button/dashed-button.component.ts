import { Component, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-dashed-button',
  standalone: true,
  imports: [NzButtonModule],
  templateUrl: './dashed-button.component.html',
  styleUrls: ['./dashed-button.component.scss']
})
export class DashedButtonComponent {
  @Input() nzSize: 'large' | 'default' | 'small' = 'default';
  @Input() nzLoading = false;
  @Input() disabled = false;
}