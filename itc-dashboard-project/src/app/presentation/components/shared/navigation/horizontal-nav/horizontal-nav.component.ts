import { Component } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-horizontal-nav',
  standalone: true,
  imports: [NzMenuModule, NzIconModule],
  templateUrl: './horizontal-nav.component.html',
  styleUrl: './horizontal-nav.component.scss'
})
export class HorizontalNavComponent {

}
