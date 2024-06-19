import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonAppModule } from '@common/common.module';
// import { AuthRoutingModule } from './auth-routing.module';

import { InputComponent } from './input.component';
import { ListComponent } from './list/list.component';
import { ActualComponent } from './actual/actual.component';
import { PlanComponent } from './plan/plan.component';
import { InputRoutingModule } from './input-routing.module';
import { ListModule } from './list/list.module';


@NgModule({
  declarations: [
    InputComponent,
    ListComponent, 
    ActualComponent,
    PlanComponent,
    
   
  ],
  imports: [
    ListModule,
    CommonModule,
    InputRoutingModule,
    CommonAppModule.forRoot()
  ]
})
export class InputModule { }
