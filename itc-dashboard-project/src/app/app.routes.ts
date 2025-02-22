import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'Button Example' },
  { path: 'Button Example', loadChildren: () => import('./presentation/pages/button-example/button-example.routes').then(m => m.BUTTONEXAMPLE_ROUTES) },
  { path: 'Nav Example', loadChildren: () => import('./presentation/pages/nav-example/nav-example.routes').then(m => m.NAV_EXAMPLES_ROUTES) },
  { path: 'Data Entry Example', loadChildren: () => import('./presentation/pages/data-entry-example/data-entry-example.routes').then(m => m.DATAENTRYEXAMPLE_ROUTES) },
  { path: 'Data View Example', loadChildren: () => import('./presentation/pages/data-view-example/data-view-example.routes').then(m => m.DATAVIEWEXAMPLE_ROUTES) },
  { path: 'Feedback Example', loadChildren: () => import('./presentation/pages/feedback-example/feedback-example.routes').then(m => m.FEEDBACKEXAMPLE_ROUTES) },
  { path: 'Gridster Example', loadChildren: () => import('./presentation/pages/gridster2-example/gridster2-example').then(m => m.GRIDSTER_ROUTES) },
];
