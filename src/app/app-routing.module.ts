import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule), 
  },
  {
    path: 'input',
    loadChildren: () => import('./pages/components/input/input.module').then((m) => m.InputModule), 
  },
  {
    path: 'delivery',
    loadChildren: () => import('./pages/components/output/output.module').then((m) => m.OutputModule), 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule], 
})
export class AppRoutingModule {}
