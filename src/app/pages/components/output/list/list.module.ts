import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ResultsTableComponent } from './results-table/results-table.component';
import { CommonAppModule } from '@common/common.module';
import { FormSearchComponent } from './form-search/form-search.component';
import { HeaderTopComponent } from '@layout/components/header-top/header-top.component';

@NgModule({
  declarations: [
    FormSearchComponent,
    ResultsTableComponent,
    HeaderTopComponent
  ],
  imports: [
    CommonModule,
    CommonAppModule.forRoot()
  ],
  exports: [
    FormSearchComponent,
    ResultsTableComponent,
    HeaderTopComponent
  ]
})
export class ListModule { }
