import { Component } from '@angular/core';
import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'app-linear-bar',
  standalone: true,
  imports: [NzProgressModule],
  templateUrl: './linear-bar.component.html',
  styleUrls: ['./linear-bar.component.scss']
})
export class NzDemoProgressLineComponent { }