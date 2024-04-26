import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutputListComponent } from './output-list.component';
import { InventoryOutputListComponent } from '../components/inventory-output-list/inventory-output-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  {
    path: '',
    component: OutputListComponent,
    children: [
      { path: 'list', component: InventoryOutputListComponent }
      // {path:'plan',component: },
      // {path: 'actual', component: },
      // {path: 'correction',component: }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutputListRoutingModule {}
