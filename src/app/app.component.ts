import { AfterViewChecked, Component, HostListener, OnInit } from '@angular/core';
import { LoginService } from '@auth/services/login.service';
import { IconService } from './core/services/icon/icon.service';
import { LocalizationService } from './core/services/localization/localization.service';
import { HandelSpaceService } from '@common/services/handel-space.service';
import { HandelTabindexService } from '@common/services/handel-tabindex.service';
import { NgSelectConfig } from '@ng-select/ng-select';
import { TitleService } from '@common/services/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {
  public title = 'Zaiko';

  public constructor(
    private icon: IconService,
    private localizationService: LocalizationService,
    public loginService: LoginService,
    public handelSpaceService : HandelSpaceService,
    public handelTabindexService : HandelTabindexService,
    private config: NgSelectConfig,
    private titleService: TitleService
  ) {
    this.config.bindValue = 'value';
    this.config.bindLabel = 'label';
    this.config.notFoundText= 'データがありません。';
  }

  @HostListener('document:keydown.Space', ['$event'])
  public escape(event: KeyboardEvent): void {
    this.handelSpaceService.handelSpace(event);

  }


  public ngOnInit(): void {
    this.icon.init();
    this.localizationService.init();
  }

  public ngAfterViewChecked(): void {
    this.handelTabindexService.handelTabindex();
    this.titleService.updateTitle();
  }


}
