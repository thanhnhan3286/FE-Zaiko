import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesModel } from '@common/models';

const routes: Routes = [
  { path: 'output', pathMatch: 'full', redirectTo: 'output/list' },
  {
    path: 'output',
    // Sử dụng loadChildren là đang dùng lazy loading
    loadChildren: () => import('./pages/inventory-output/inventory-output.module')
                                .then((m) => m.InventoryOutputModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
