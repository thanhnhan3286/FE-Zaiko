import { OutputListModel } from '../../../model/output-list';
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
  @Input()
  dataResult: OutputListModel[] = [];
  @Input()
  totalItems: number = 0;
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  @Input() isHiddenSearch: boolean = false;
  @Output() loadMoreEvent = new EventEmitter<void>();


  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) console.log(this.dataResult);
  }

  ngOnInit(): void {}

  loadMoreContent() {
    this.loadMoreEvent.emit();
  }

  public statusBatch(batchStatus: string): string {
    let value = '';
    switch (batchStatus) {
      case '0':
        value = '未処理';
        break;
      case '1':
        value = '処理中';
        break;

      case '3':
        value = '処理中<br/>未あり';
        break;
      case '9':
        value = '処理済み';
        break;
      default:
        break;
    }
    return value;
  }
}
