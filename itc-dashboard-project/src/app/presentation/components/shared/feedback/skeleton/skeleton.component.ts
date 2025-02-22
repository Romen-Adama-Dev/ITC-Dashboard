import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [
    FormsModule,
    NzSkeletonModule,
    NzDividerModule,
    NzGridModule,
    NzRadioModule,
    NzSpaceModule,
    NzSwitchModule,
    NzListModule,
    NzIconModule
  ],
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class UnifiedSkeletonDemoComponent {
  // Para el Skeleton Element
  elementActive = false;
  buttonShape: 'default' | 'square' | 'circle' | 'round' = 'default';
  avatarShape: 'circle' | 'square' = 'circle';
  elementSize: 'default' | 'large' | 'small' = 'default';

  // Para el Skeleton List
  loading = true;
  listData = new Array(3).fill({}).map((_i, index) => ({
    href: 'https://ng.ant.design',
    title: `Lorem ipsum ${index}`,
    avatar: 'https://zos.alipayobjects.com/zos/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in neque et nisl.'
  }));
}