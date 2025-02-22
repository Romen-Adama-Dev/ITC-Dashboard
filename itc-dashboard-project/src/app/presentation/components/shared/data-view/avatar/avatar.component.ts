import { Component } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [NzAvatarModule],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AppAvatarComponent { }