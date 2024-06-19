import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
  currentDate: string = '';
  constructor() {}

  ngOnInit(): void {
    this.getCurrentDate();
  }

  getCurrentDate() {
    const presentDate = new Date().toISOString();
    const dateString = presentDate.split('T')[0].replace(/-/g, '/');
    this.currentDate = dateString;
  }
}
