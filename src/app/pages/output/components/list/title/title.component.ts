import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
  isHidden: boolean = false;
  @Output() public displaySearchArea: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  displaySearchForm() {
    this.isHidden = !this.isHidden;
    this.displaySearchArea.emit(this.isHidden);
  }
}
