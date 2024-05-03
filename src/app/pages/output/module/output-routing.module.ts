import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutputListComponent } from './output.component';
import { ListComponent } from '../components/list/list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  {
    path: '',
    component: OutputListComponent,
    children: [
      { path: 'list', component: ListComponent }
      // {path:'plan',component: },
      // {path: 'actual', component: },
      // {path: 'correction',component: }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutputListRoutingModule {}
