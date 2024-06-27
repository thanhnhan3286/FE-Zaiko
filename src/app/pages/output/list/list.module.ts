import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormSearchComponent } from './components/form-search/form-search.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ListComponent } from './list.component';
import { CommonAppModule } from "../../../common/common.module";
import { LayoutModule } from "../../../layout/layout.module";





@NgModule({
    declarations: [
        ListComponent,
        DataTableComponent,
        FormSearchComponent
    ],
    imports: [
        // CoreModule.forRoot(),
        CommonModule,
        CommonAppModule.forRoot(),
        LayoutModule,
    ]
})
export class ListModule { }
