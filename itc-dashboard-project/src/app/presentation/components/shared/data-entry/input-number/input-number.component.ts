import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'app-input-number',
  standalone: true,
  imports: [FormsModule, NzInputNumberModule],
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss']
})
export class NzDemoInputNumberBasicComponent {
  value = 0;
}