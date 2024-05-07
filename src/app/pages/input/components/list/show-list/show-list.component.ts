import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { InputListModel } from 'src/app/pages/input/model/input-list';


@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent implements OnInit {

  @Input()
  dataResult: InputListModel[] = [];
  @Input()
  totalItems: number = 0;
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  @Output() loadMoreEvent = new EventEmitter<void>();

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) console.log(this.dataResult);
  }

  ngOnInit(): void {}

  loadMoreContent() {
    this.loadMoreEvent.emit();
  }


}
