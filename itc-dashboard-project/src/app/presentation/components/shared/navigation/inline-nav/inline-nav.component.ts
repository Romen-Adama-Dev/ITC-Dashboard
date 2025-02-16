import { Component } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-inline-nav',
  standalone: true,
  imports: [NzMenuModule],
  templateUrl: './inline-nav.component.html',
  styleUrl: './inline-nav.component.scss'
})
export class InlineNavComponent {

}
