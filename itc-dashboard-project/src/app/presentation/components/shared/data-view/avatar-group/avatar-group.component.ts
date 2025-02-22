import { Component } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-avatar-group',
  standalone: true,
  imports: [NzAvatarModule, NzDividerModule, NzToolTipModule],
  templateUrl: './avatar-group.component.html',
  styleUrl: './avatar-group.component.scss'
})
export class AvatarGroupComponent {

}
