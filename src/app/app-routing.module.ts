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
    path: 'output-list',
    loadChildren:() => import('./pages/output/module/output.module').then((m) => m.OutputListModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
