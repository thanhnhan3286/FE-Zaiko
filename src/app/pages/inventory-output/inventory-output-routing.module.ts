import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryOutputComponent } from './inventory-output.component';
import { OutputListComponent } from './components/list/output-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'output' },
  {
    path: '', component: InventoryOutputComponent
    , children: [
        { path: 'list', component: OutputListComponent }
      ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InventoryOutputRoutingModule { }
