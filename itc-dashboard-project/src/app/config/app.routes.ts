import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'Gridster Example' },
  { path: 'Gridster Example', loadChildren: () => import('../presentation/pages/gridster2-example/gridster2-example').then(m => m.GRIDSTER_ROUTES) },
];
