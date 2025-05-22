import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'Gridster' },
  { path: 'Gridster', loadComponent: () => import('../app.component').then(m => m.AppComponent) },
];
