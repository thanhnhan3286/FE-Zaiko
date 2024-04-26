import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualComponent } from './actual/actual.component';
import { ListComponent } from './list/list.component';
import { PlanComponent } from './plan/plan.component';
import { InputComponent } from './input.component';


const routes: Routes = [
  {
    path: '', component: InputComponent, children: [
      { path: 'actual', component: ActualComponent },
      { path: 'list', component: ListComponent },
      { path: 'plan', component: PlanComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputRoutingModule { }
