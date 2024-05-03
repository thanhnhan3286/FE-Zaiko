import {
  OutputListModel,
  OutputListResponse,
  SearchCriteriaRequest,
} from '../../../model/output-list';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss'],
})
export class ShowListComponent implements OnInit, OnChanges {
  // @Input()
  // searchCriteria!: SearchCriteriaRequest;
  @Input()
  dataResult: OutputListModel[] = [];
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
