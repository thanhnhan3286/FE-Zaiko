import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesModel } from '@common/models';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
 
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },

  {
    path: 'output',
    loadChildren:() => import('./pages/output/module/output.module').then((m) => m.OutputListModule)
  },

  {
    path: 'input',
    loadChildren:() => import('./pages/input/input.module').then((m) => m.InputModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
