import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DataOutputListputModel, DataSearchModel, TableEvent } from 'src/app/pages/models/output/list.model';

@Component({
  selector: 'results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss']
})
export class ResultsTableComponent implements OnChanges {
  @Input() data: DataSearchModel = new DataSearchModel();
  @Output() tableEvent = new EventEmitter<TableEvent>();
  isHeightLimited = true;

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      console.log("changes", changes)
      this.data.results = [...this.data.results];
    }
  }
  isActualButtonDisabled(item: any): boolean {
    // if (item.batchStatus !== null) {
    //   return true;
    // } else 
    if (item.planOutputDate !== null) {
      if (item.closed === '1') {
        return true;
      } else if (item.actualOutputDate !== null) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }





  triggerLoadMore() {
    this.isHeightLimited = false;
    this.tableEvent.emit({ action: 'loadMore' });
  }
  Plan(id: number) {
    this.tableEvent.emit({ action: 'plan', payload: id });
  }



}
