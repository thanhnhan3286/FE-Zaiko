import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonAppModule } from '@common/common.module';
import { FormInputComponent } from './form-input/form-input.component';
import { TableListComponent } from './table-list/table-list.component';

@NgModule({
  declarations: [
    FormInputComponent,
    TableListComponent
  ],
  imports: [
    CommonModule,
    CommonAppModule.forRoot()
    
  ],
  exports: [
    FormInputComponent,
    TableListComponent
  ]
})
export class CorrectionModule { }
