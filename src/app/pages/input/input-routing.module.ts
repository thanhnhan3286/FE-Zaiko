import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputComponent } from './input.component';
import { ListComponent } from '../input/list/list.component';
// import { OutputComponent } from './output.component';
// import { ListComponent } from './list/list.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'list' },
    {
        path: '', component: InputComponent, children: [
            { path: 'list', component: ListComponent },
            //   { path: 'forgot-password', component: ForgotPaswordComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InputRoutingModule { }
