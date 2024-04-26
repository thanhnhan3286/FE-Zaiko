import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.scss']
})
export class HeaderTopComponent implements OnInit {

  constructor() { }
  public titelHeader: string = '出庫一覧';
  public userName: string = 'VanHai';


  ngOnInit() {
  }

}
