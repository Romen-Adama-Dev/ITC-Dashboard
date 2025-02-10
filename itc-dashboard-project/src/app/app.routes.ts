import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'Button Example', loadChildren: () => import('./presentation/pages/button-example/button-example.routes').then(m => m.WELCOME_ROUTES) },
  { path: 'welcome copy', loadChildren: () => import('./presentation/pages/welcome copy/welcome.routes').then(m => m.WELCOME_ROUTES) }
];
