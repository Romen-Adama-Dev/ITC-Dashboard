import { Component } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

@Component({
  selector: 'app-avatar-badge',
  standalone: true,
  imports: [NzBadgeModule, NzAvatarModule],
  templateUrl: './avatar-badge.component.html',
  styleUrls: ['./avatar-badge.component.scss']
})
export class NzDemoAvatarBadgeComponent { }