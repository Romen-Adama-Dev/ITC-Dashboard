import { Component } from '@angular/core';
import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'app-custom-bar',
  standalone: true,
  imports: [NzProgressModule],
  templateUrl: './custom-bar.component.html',
  styleUrls: ['./custom-bar.component.scss']
})
export class ProgressGradientComponent {
  // Usamos CSS variables para definir el gradiente, que se definirá globalmente en default.less o dark.less.
  gradientColors = {
    '0%': 'var(--progress-gradient-start)',
    '100%': 'var(--progress-gradient-end)'
  };

  circleGradientColors = {
    '0%': 'var(--progress-gradient-start)',
    '50%': 'var(--progress-gradient-mid)',
    '100%': 'var(--progress-gradient-end)'
  };
}