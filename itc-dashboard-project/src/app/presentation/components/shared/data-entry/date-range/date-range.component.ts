import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { getISOWeek } from 'date-fns';

@Component({
  selector: 'app-date-picker-range',
  standalone: true,
  imports: [FormsModule, NzDatePickerModule],
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class NzDemoDatePickerRangePickerComponent {
  date: Date[] | null = null;

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date[]): void {
    console.log('week: ', result.map(getISOWeek));
  }
}