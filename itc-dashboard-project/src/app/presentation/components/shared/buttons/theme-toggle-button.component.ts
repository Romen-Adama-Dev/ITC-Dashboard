import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-theme-toggle-button',
  standalone: true,
  imports: [NzButtonModule, NzIconModule],
  template: `
    <button nz-button (click)="onToggleTheme()" class="theme-toggle-btn">
      <nz-icon [nzType]="currentTheme === 'default' ? 'sun' : 'moon'" />
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    .theme-toggle-btn {
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: 20px;
    }
  `]
})
export class ThemeToggleButtonComponent {
  @Input() currentTheme: 'default' | 'dark' = 'default';
  @Output() toggleTheme = new EventEmitter<void>();

  onToggleTheme(): void {
    this.toggleTheme.emit();
  }
}