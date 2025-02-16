import { Component } from '@angular/core';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-pagination-nav',
  standalone: true,
  imports: [NzPaginationModule],
  templateUrl: './pagination-nav.component.html',
  styleUrl: './pagination-nav.component.scss'
})
export class PaginationNavComponent {
  current = 1;
}
