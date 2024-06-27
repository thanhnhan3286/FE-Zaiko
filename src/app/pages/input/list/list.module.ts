import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ListComponent } from './list.component';
import { FormSearchComponent } from './components/form-search/form-search.component';
import { CommonAppModule } from '@common/common.module';



@NgModule({
  declarations: [
    DataTableComponent,
    ListComponent,
    FormSearchComponent
  ],
  imports: [
    CommonModule,
    CommonAppModule
  ]
})
export class ListModule { }
