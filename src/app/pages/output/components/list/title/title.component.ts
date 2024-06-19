import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
  isHidden: boolean = false;
  currentDate: string = '';
  @Output() public displaySearchArea: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {
    this.getCurrentDate();
  }

  displaySearchForm() {
    this.isHidden = !this.isHidden;
    this.displaySearchArea.emit(this.isHidden);
  }

  getCurrentDate() {
    const presentDate = new Date().toISOString();
    const dateString = presentDate.split('T')[0].replace(/-/g, '/');
    this.currentDate = dateString;
  }
}
