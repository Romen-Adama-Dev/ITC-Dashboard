import { Component } from '@angular/core';
import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'app-circular-bar',
  standalone: true,
  imports: [NzProgressModule],
  templateUrl: './circular-bar.component.html',
  styleUrls: ['./circular-bar.component.scss']
})
export class NzDemoProgressFormatComponent {
  formatOne = (percent: number): string => `${percent} Days`;
  formatTwo = (): string => `Done`;
}