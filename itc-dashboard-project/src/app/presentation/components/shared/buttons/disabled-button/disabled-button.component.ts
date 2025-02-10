import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-disabled-button',
  standalone: true,
  imports: [NzButtonModule],
  templateUrl: './disabled-button.component.html',
  styleUrls: ['./disabled-button.component.scss']
})
export class DisabledButtonsComponent { }