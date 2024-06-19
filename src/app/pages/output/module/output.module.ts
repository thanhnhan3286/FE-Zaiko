import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutputListRoutingModule } from './output-routing.module';
import { OutputListComponent } from './output.component';
import { ListComponent } from '../components/list/list.component';
import { FormsModule } from '@angular/forms';
import { CommonAppModule } from '../../../common/common.module';
import { SearchListComponent } from '../components/list/search/search-list.component';
import { ShowListComponent } from '../components/list/show-list/show-list.component';
import { TitleComponent } from '../components/list/title/title.component';

@NgModule({
  declarations: [
    OutputListComponent,
    ListComponent,
    ShowListComponent,
    SearchListComponent,
    TitleComponent,
  ],
  imports: [
    CommonModule,
    OutputListRoutingModule,
    FormsModule,
    CommonAppModule.forRoot(),
  ],
})
export class OutputListModule {}
