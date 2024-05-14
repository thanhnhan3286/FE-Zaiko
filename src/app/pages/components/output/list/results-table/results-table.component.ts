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
        console.log("changes",changes)
      this.data.results = [...this.data.results]; 
    }
  } 
  isButtonDisabled(item: any): boolean {
    let isDisabled: boolean=true;

    // if (item.slipNo !== null) {
    //     isDisabled = true;
    // }
    if (item.planOutputDate !== null) {
        if (item.actualOutputDate !== null) {
            if (item.closed === 1) {
                isDisabled = true;
            } else {
                isDisabled = false;
            }
        }
        else if (item.closed === 0) {
            isDisabled = false;
        }
    }
    else {
        if (item.actualOutputDate !== null) {
            isDisabled = true;
        }
    }
    return isDisabled;
}


  

  triggerLoadMore() {
    this.isHeightLimited = false;
    this.tableEvent.emit({ action: 'loadMore' }); 
  }
  Plan(id :number){
    this.tableEvent.emit({ action: 'plan', payload: id }); 


  }

  // Actual(id :String){
  // this.Event.emit(id); 

  // }
  // Correction(id :String){
  //   this.Event.emit(id); 
  // }
  
}
