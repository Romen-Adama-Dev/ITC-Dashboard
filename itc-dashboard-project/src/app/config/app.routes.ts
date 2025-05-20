import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'Gridster' },
  { path: 'Gridster', loadChildren: () => import('../app.component').then(m => m.AppComponent) },
];
