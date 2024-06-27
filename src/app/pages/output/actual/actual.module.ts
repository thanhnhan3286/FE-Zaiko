import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonAppModule } from '@common/common.module';
import { LayoutModule } from "../../../layout/layout.module";
import { ActualComponent } from './actual.component';



@NgModule({
  declarations: [
    ActualComponent
  ],
  imports: [
    CommonModule,
    CommonAppModule.forRoot(),
    LayoutModule
  ]
})
export class ActualModule { }
