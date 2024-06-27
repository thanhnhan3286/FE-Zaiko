import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanDetailComponent } from './plan-detail.component';
import { InfoFormComponent } from './components/info-form/info-form.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { CommonAppModule } from '@common/common.module';
import { LayoutModule } from "../../../layout/layout.module";
import { PlanComponent } from './components/plan/plan.component';



@NgModule({
  declarations: [
    PlanDetailComponent,
    InfoFormComponent,
    DataTableComponent,
    PlanComponent
  ],
  imports: [
    CommonModule,
    CommonAppModule.forRoot(),
    LayoutModule
  ]
})
export class PlanDetailModule { }
