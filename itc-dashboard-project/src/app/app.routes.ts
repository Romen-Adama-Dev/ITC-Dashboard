import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'Button Example' },
  { path: 'Button Example', loadChildren: () => import('./presentation/pages/button-example/button-example.routes').then(m => m.BUTTONEXAMPLE_ROUTES) },
  { path: 'Nav Example', loadChildren: () => import('./presentation/pages/nav-example/nav-example.routes').then(m => m.NAV_EXAMPLES_ROUTES) },
];
