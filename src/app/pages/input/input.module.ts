import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputRoutingModule } from './input-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonAppModule } from '@common/common.module';
import { ListComponent } from './components/list/list.component';
import { SearchListComponent } from './components/list/search-list/search-list.component';
import { ShowListComponent } from './components/list/show-list/show-list.component';
import { TitleComponent } from './components/list/title/title.component';


@NgModule({
  declarations: [
    ListComponent,
    SearchListComponent,
    ShowListComponent,
    TitleComponent
  ],
  imports: [
    CommonModule,
    InputRoutingModule,
    FormsModule,
    CommonAppModule
  ]
})
export class InputModule { }
