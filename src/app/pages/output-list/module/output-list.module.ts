import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutputListRoutingModule } from './output-list-routing.module';
import { OutputListComponent } from './output-list.component';
import { InventoryOutputListComponent } from '../components/inventory-output-list/inventory-output-list.component';
import { SearchOutputListComponent } from '../components/search-output-list/search-output-list.component';
import { ShowOutputListComponent } from '../components/show-output-list/show-output-list.component';
import { TitleSearchListComponent } from '../components/title-search-list/title-search-list.component';
import { FormsModule } from '@angular/forms';
import { CommonAppModule } from "../../../common/common.module";


@NgModule({
    declarations: [
        OutputListComponent,
        InventoryOutputListComponent,
        ShowOutputListComponent,
        SearchOutputListComponent,
        TitleSearchListComponent
    ],
    imports: [
        CommonModule,
        OutputListRoutingModule,
        FormsModule,
        CommonAppModule,

    ],
})
export class OutputListModule { }
