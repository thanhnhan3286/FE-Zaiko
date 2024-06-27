import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '@auth/services/login.service';
import { MENU_DATA } from '@core/config';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { now } from 'moment';
import { Title } from '../../models/title.model';

export interface DataHeader {
  parent: string;
  chilren: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges {
  @Output() popupSearchForm: EventEmitter<any> = new EventEmitter<any>();
  @Input() title!: Title;
  public dataMenu = MENU_DATA;
  // public header: string = '出庫';
  // public parent: string = '出庫一覧';
  // public children: string = '出庫予定入力'
  // public title: Title = {
  //   header: '0',
  //   parent: '0',
  //   children: '0',
  //   service: '0',
  // };
  public currentDate: Date = new Date();
  public changeIcon = false;
  public constructor(
    private loginService: LoginService,
    public dialog: MatDialog
  ) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['titleComponent.children'] && changes['titleComponent.children'].currentValue) {
    }
  }

  public btnLogOut(): void { }
  public changePassword(): void {
    let dialog = this.dialog.open(ChangePasswordComponent, {
      width: '520px'
    });
  }
  public showSearchForm(): void {
    this.changeIcon = !this.changeIcon;
    this.popupSearchForm.emit(this.changeIcon ? '1' : '0');
  }
}
