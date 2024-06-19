import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutputComponent } from './output.component';
import { ActualComponent } from './actual/actual.component';
import { ListComponent } from './list/list.component';
import { PlanComponent } from './plan/plan.component';
import { CorrectionComponent } from './correction/correction.component';


const routes: Routes = [
  {
    path: '', component: OutputComponent, children: [
      { path: 'inventory-output-actual', component: ActualComponent },
      { path: 'inventory-output-list', component: ListComponent },
      { path: 'inventory-output-plan', component: PlanComponent },
      { path: 'inventory-output-correction', component: CorrectionComponent },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutputRoutingModule { }
