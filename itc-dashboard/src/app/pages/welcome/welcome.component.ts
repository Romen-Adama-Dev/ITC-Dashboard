import { Component } from '@angular/core';
import { GridsterDashboardComponent } from '../../components/gridster-dashboard/gridster-dashboard.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [GridsterDashboardComponent],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  dashboard = [
    { cols: 2, rows: 1, y: 0, x: 0, content: 'Widget 1' },
    { cols: 2, rows: 2, y: 0, x: 2, content: 'Widget 2' },
    { cols: 1, rows: 1, y: 1, x: 4, content: 'Widget 3' }
  ];
}
