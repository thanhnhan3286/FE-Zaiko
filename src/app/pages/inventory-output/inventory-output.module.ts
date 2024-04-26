import { NgModule } from '@angular/core';
import { CommonAppModule } from '@common/common.module';
import { InventoryOutputRoutingModule } from './inventory-output-routing.module';
import { InventoryOutputComponent } from './inventory-output.component';
import { RouterModule } from '@angular/router';
import { OutputListModule } from './components/list/output-list.module';
import { LayoutModule } from '@layout/layout.module';

@NgModule({
    declarations: [
      InventoryOutputComponent
      // OutputListComponent,
      // SearchOutputListComponent,
      // ResultOutputListComponent
    ],
    imports: [
      LayoutModule,
      RouterModule,
      InventoryOutputRoutingModule,
      OutputListModule,
      CommonAppModule.forRoot()
    ]
  })
  export class InventoryOutputModule { }