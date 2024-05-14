import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { format } from 'date-fns';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.scss']
})
export class HeaderTopComponent implements OnInit {
  public currentDate: string; // Ngày hiện tại
  public isFormVisible: boolean = true;

  @Output() toggleSearchForm = new EventEmitter<boolean>(); 

  constructor() {  const today = new Date();
    this.currentDate = format(today, 'yyyy/MM/dd');
  }
  public titelHeader: string = '出庫一覧';
  public ReceiptList: String ="";
  public userName: string = 'VanHai';


  ngOnInit() {
  }
onToggleForm() {
    this.isFormVisible = !this.isFormVisible; 
    this.toggleSearchForm.emit(this.isFormVisible); 
  }

}
