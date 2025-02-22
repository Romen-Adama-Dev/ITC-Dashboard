import { Component } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-spin',
  standalone: true,
  imports: [NzSpinModule],
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.scss']
})
export class NzDemoSpinBasicComponent { }