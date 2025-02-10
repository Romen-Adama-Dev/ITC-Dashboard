import { Component } from '@angular/core';
import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-float-shape-button',
  standalone: true,
  imports: [NzFloatButtonModule, NzIconModule],
  templateUrl: './float-shape-button.component.html',
  styleUrl: './float-shape-button.component.scss'
})
export class FloatShapeButtonComponent {

}
