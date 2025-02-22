import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NzButtonModule, NzListModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  loading = false;
  data = [
    { title: 'Ant Design Title 1' },
    { title: 'Ant Design Title 2' },
    { title: 'Ant Design Title 3' },
    { title: 'Ant Design Title 4' }
  ];

  change(): void {
    this.loading = true;
    if (this.data.length > 0) {
      setTimeout(() => {
        this.data = [];
        this.loading = false;
      }, 1000);
    } else {
      setTimeout(() => {
        this.data = [
          { title: 'Ant Design Title 1' },
          { title: 'Ant Design Title 2' },
          { title: 'Ant Design Title 3' },
          { title: 'Ant Design Title 4' }
        ];
        this.loading = false;
      }, 1000);
    }
  }

  trackByFn(index: number, item: any): any {
    return item.title;
  }
}