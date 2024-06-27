import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Utils } from '@common/utils/utils';
import { Title } from '@layout/models/title.model';

@Component({
  selector: 'app-actual',
  templateUrl: './actual.component.html',
  styleUrls: ['./actual.component.scss']
})
export class ActualComponent implements OnInit {
  public titleActual!: Title;

  public utils = Utils;
  public actualOutputForm: FormGroup = new FormGroup({});
  constructor() { }

  ngOnInit(): void {
    this.initialTitle();
  }
  public initialTitle() {
    this.titleActual = {
      header: '出庫',
      parent: '出庫一覧',
      children: '出庫実績登録',
      service: '0',
    }
  }
}
