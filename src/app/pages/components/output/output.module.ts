import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonAppModule } from '@common/common.module';
// import { AuthRoutingModule } from './auth-routing.module';
import { ListComponent } from './list/list.component';
import { ActualComponent } from './actual/actual.component';
import { PlanComponent } from './plan/plan.component';
import { OutputComponent } from './output.component';
import { ListModule } from './list/list.module';
import { OutputRoutingModule } from './output-routing.module';
import { PlanModule } from './plan/plan.module';


@NgModule({
  declarations: [
    OutputComponent,
    ListComponent,
    ActualComponent,
    PlanComponent
   
  ],
  imports: [
    ListModule,
    PlanModule,
    CommonModule,
    OutputRoutingModule ,
    CommonAppModule.forRoot()
  ]
})
export class OutputModule { }
