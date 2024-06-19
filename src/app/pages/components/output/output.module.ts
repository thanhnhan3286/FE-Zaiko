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
import { ActualModule } from './actual/actual.module';
import { CorrectionModule } from './correction/correction.module';
import { CorrectionComponent } from './correction/correction.component';


@NgModule({
  declarations: [
    OutputComponent,
    ListComponent,
    ActualComponent,
    CorrectionComponent,
    PlanComponent
   
  ],
  imports: [
    ListModule,
    ActualModule,
    CommonModule,
    CorrectionModule,
    OutputRoutingModule ,
    CommonAppModule.forRoot()
  ]
})
export class OutputModule { }
