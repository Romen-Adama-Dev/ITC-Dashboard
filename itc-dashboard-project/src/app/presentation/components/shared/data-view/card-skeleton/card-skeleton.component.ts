import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'app-card-skeleton',
  standalone: true,
  imports: [
    FormsModule,
    NzAvatarModule,
    NzCardModule,
    NzIconModule,
    NzSwitchModule,
    NzSkeletonModule
  ],
  templateUrl: './card-skeleton.component.html',
  styleUrl: './card-skeleton.component.scss'
})
export class CardSkeletonComponent {
  loading = true;
}
