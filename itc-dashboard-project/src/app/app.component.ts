import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ThemeToggleButtonComponent } from './presentation/components/shared/theme-toggle-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, ThemeToggleButtonComponent,],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  currentTheme: 'default' | 'dark' = 'default';

  ngOnInit(): void {
    this.detectUserThemePreference();
  }

  toggleTheme(): void {
    this.currentTheme === 'default' ? this.activateDarkTheme() : this.activateDefaultTheme();
  }

  private detectUserThemePreference(): void {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    prefersDark ? this.activateDarkTheme() : this.activateDefaultTheme();
  }

  private activateDarkTheme(): void {
    this.loadThemeCss('dark.css', 'dark-theme-css')
      .then(() => {
        this.currentTheme = 'dark';
        console.log('Tema dark activado');
      })
      .catch(err => console.error('Error al cargar dark.css', err));
  }

  private activateDefaultTheme(): void {
    this.removeThemeCss('dark-theme-css');
    this.currentTheme = 'default';
    console.log('Tema default activado');
  }

  private loadThemeCss(href: string, id: string): Promise<Event> {
    return new Promise((resolve, reject) => {
      const existingLink = document.getElementById(id);
      if (existingLink) {
        resolve(new Event('load'));
        return;
      }
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.id = id;
      link.onload = resolve;
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  private removeThemeCss(id: string): void {
    const link = document.getElementById(id);
    if (link && link.parentNode) {
      link.parentNode.removeChild(link);
    }
  }
}
