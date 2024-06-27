import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesModel } from '@common/models';
import { OutputComponent } from './pages/output/output.component';
import { DataTableComponent } from './pages/output/list/components/data-table/data-table.component';


const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  // },
  // { path: 'output', pathMatch: 'full', redirectTo: '/output/list' },
  // {
  //   path: 'output', component: OutputComponent, children: [
  //     { path: 'list', component: OutputListComponent }
  //   ]
  // },
  { path: 'output', pathMatch: 'full', redirectTo: 'output/lists' },
  {
    path: 'output',
    loadChildren: () => import('./pages/output/output.module').then((m) => m.OutputModule)
  },
  { path: 'input', pathMatch: 'full', redirectTo: 'input/lists' },
  {
    path: 'input',
    loadChildren: () => import('./pages/input/input.module').then((m) => m.InputModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
