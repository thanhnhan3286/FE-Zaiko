import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonAppModule } from '@common/common.module';
import { CoreModule } from '@core/core.module';
import { LayoutModule } from '@layout/layout.module';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { PlanComponent } from './pages/output/components/plan/plan.component';
import { TitleComponent } from './pages/output/components/plan/components/title/title.component';
import { DetailComponent } from './pages/output/components/plan/components/detail/detail.component';
import { GeneralInfoComponent } from './pages/output/components/plan/components/general-info/general-info.component';


@NgModule({
  declarations: [
    AppComponent,
    PlanComponent,
    TitleComponent,
    DetailComponent,
    GeneralInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatIconModule,

    // App core, common & dependency modules
    CoreModule.forRoot(),
    CommonAppModule.forRoot(),
    LayoutModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
