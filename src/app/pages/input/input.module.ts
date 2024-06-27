import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { InputRoutingModule } from './input-routing.module';
import { ListModule } from './list/list.module';
import { LayoutModule } from "../../layout/layout.module";
import { RouterModule } from '@angular/router';
import { CommonAppModule } from '@common/common.module';



@NgModule({
    declarations: [
        InputComponent
    ],
    providers: [],
    bootstrap: [InputComponent],
    imports: [
        CommonModule,
        InputRoutingModule,
        ListModule,
        LayoutModule,
        RouterModule,
        CommonAppModule.forRoot(),
    ]
})
export class InputModule { }
