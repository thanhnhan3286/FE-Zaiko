import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ResultsTableComponent } from './results-table/results-table.component';
import { CommonAppModule } from '@common/common.module';
import { FormSearchComponent } from './form-search/form-search.component';

@NgModule({
  declarations: [
    FormSearchComponent,
    ResultsTableComponent,
  ],
  imports: [
    CommonModule,
    CommonAppModule.forRoot()
    
  ],
  exports: [
    FormSearchComponent,
    ResultsTableComponent
  ]
})
export class ListModule { }
