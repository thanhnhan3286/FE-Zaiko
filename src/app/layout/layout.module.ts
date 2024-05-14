import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthModule } from '@auth/auth.module';
import { AngularMaterialModule } from '@common/angular-material.module';
import { CommonAppModule } from '@common/common.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingSpinnerDialogComponent } from './components/loading-spinner-dialog/loading-spinner-dialog.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { CommonService } from './services/common.service';
import { LoadingSpinnerDialogService } from './services/loading-spinner-dialog.service';
import { OutputModule } from '../pages/components/output/output.module';
import { InputModule } from '../pages/components/input/input.module';


@NgModule({
  declarations: [
    HeaderComponent,
  
    FooterComponent,
    SideNavComponent,
    ChangePasswordComponent,
    LoadingSpinnerDialogComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommonAppModule.forRoot(),
    OutputModule,
    InputModule,
    AuthModule
  ],
  exports: [
    FooterComponent,
    SideNavComponent,
    NzLayoutModule,
    FormsModule
  ],
  providers: [
    CommonService,
    LoadingSpinnerDialogService
  ]
})
export class LayoutModule { }
