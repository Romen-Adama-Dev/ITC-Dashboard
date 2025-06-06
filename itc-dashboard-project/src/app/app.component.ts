import { Component, OnInit } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { GridsterDashboardComponent } from './presentation/gridster2/gridster2.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NzIconModule, NzLayoutModule, NzMenuModule, GridsterDashboardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  currentTheme: 'default' | 'dark' = 'default';

  ngOnInit(): void {
    this.setInitialTheme();
  }

  toggleTheme(): void {
    this.currentTheme === 'default' ? this.activateDarkTheme() : this.activateDefaultTheme();
  }

  private setInitialTheme(): void {
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    prefersDark ? this.activateDarkTheme() : this.activateDefaultTheme();
  }

  private activateDarkTheme(): void {
    this.loadThemeCss('dark.css', 'dark-theme-css')
      .then(() => {
        this.currentTheme = 'dark';
        console.log('Dark theme activated');
      })
      .catch((err) => console.error('Failed to load dark.css', err));
  }

  private activateDefaultTheme(): void {
    this.removeThemeCss('dark-theme-css');
    this.currentTheme = 'default';
    console.log('Default theme activated');
  }

  private loadThemeCss(href: string, id: string): Promise<Event> {
    return new Promise((resolve, reject) => {
      const existingLink = document.getElementById(id) as HTMLLinkElement;
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
    link?.parentNode?.removeChild(link);
  }
}
