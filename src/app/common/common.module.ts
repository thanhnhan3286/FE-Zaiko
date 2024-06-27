import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NumberDefaultZeroDirective } from 'src/directive/input-default-zero.directive';
import { NumberZeroNullDirective } from 'src/directive/input-zero-null.directive';
import { MaticonDefaultValueDirective } from 'src/directive/maticon-default-value.directive';
import { NumberNegAndPosDirective } from 'src/directive/neg-pos-number.directive';
import { NumberDirective } from 'src/directive/numbers-only.directive';
import { ValidateNumberDirective } from 'src/directive/only-input-number.directive';
import { SeparatorDirective } from 'src/directive/separator.directive';
import { AngularMaterialModule } from './angular-material.module';
import { DatatableComponent } from './components/datatable/datatable.component';
import { DialogInformationComponent } from './components/dialog-information/dialog-information.component';
import { DialogSeachApiComponent } from './components/dialog-seach-api/dialog-search-api.component';
import { DialogSearchComponent } from './components/dialog-seach/dialog-seach.component';
import { GroupSearchComponent } from './components/group-search/group-search.component';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { DateTimeUtc2LocalFormat, DateTimeUtcFormat, DateTimeformat2Pipe, DateTimeformat3Pipe, DateTimeformatPipe } from './pipe/date-time-format.pipe';
import { CurrencyFormatPipe, DecimalFormatPipe, TooltipListPipe } from './pipe/string-format.pipe';
import { BreadcrumbService } from './services/breadcrumb.service';
import { DialogConfirmService } from './services/dialog-confirm.service';
import { HandelSpaceService } from './services/handel-space.service';
import { HandelTabindexService } from './services/handel-tabindex.service';
import { TitleService } from './services/title.service';

const globalRippleConfig: RippleGlobalOptions = {
  disabled: true,
  animation: {
    enterDuration: 300,
    exitDuration: 0
  }
};

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'MM/DD/YYYY',
    monthYearA11yLabel: 'YYYY'
  }
};

const CommonComponents = [
  DatatableComponent,
  GroupSearchComponent,
  DialogSearchComponent,
  DialogInformationComponent,
  DialogSeachApiComponent,
  ValidateNumberDirective,
  NumberDefaultZeroDirective,
  NumberDirective,
  NumberZeroNullDirective,
  SeparatorDirective,
  MaticonDefaultValueDirective,
  NumberNegAndPosDirective
];

const CustomPipes = [
  DateTimeformatPipe,
  DateTimeformat2Pipe,
  DateTimeformat3Pipe,
  DateTimeUtcFormat,
  DateTimeUtc2LocalFormat,
  TooltipListPipe,
  DecimalFormatPipe,
  CurrencyFormatPipe
];


@NgModule({
  declarations: [
    ...CommonComponents,
    ...CustomPipes
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    TranslateModule,
    FormsModule,
    OverlayModule,
    NgZorroAntdModule,
    NgxFileDropModule,
    NgSelectModule
  ],
  exports: [
    ...CommonComponents,
    ...CustomPipes,
    AngularMaterialModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    TranslateModule,
    FormsModule,
    NgxFileDropModule,
    NgSelectModule
  ],
  bootstrap: [
    ...CommonComponents
  ]
})
export class CommonAppModule {
  public static forRoot(): ModuleWithProviders<CommonAppModule> {
    return {
      ngModule: CommonAppModule,
      providers: [
        /* ALL SERVICES HERE! */
        BreadcrumbService,
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always', appearance: 'outline' } },
        { provide: MAT_DATE_LOCALE, useValue: 'ja-JP' },
        { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
        DialogConfirmService,
        HandelSpaceService,
        HandelTabindexService,
        TitleService
      ]
    };
  }
}
