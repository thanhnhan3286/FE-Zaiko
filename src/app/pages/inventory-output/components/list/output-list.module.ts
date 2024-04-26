import { NgModule } from '@angular/core';
import { SearchOutputListComponent } from './search-list/search-output-list.component';
import { ResultOutputListComponent } from './result-list/result-output-list.component';
import { OutputListComponent } from './output-list.component';
import { CommonAppModule } from '@common/common.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [
        OutputListComponent,
        SearchOutputListComponent,
        ResultOutputListComponent
    ],
    imports: [
      CommonAppModule.forRoot(),
      CommonModule
    ]
  })
  export class OutputListModule { }