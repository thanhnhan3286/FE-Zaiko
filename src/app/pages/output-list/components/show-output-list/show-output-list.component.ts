import { OutputListModel, OutputListResponse, SearchCriteriaRequest } from './../../model/output-list';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-show-output-list',
  templateUrl: './show-output-list.component.html',
  styleUrls: ['./show-output-list.component.scss']
})
export class ShowOutputListComponent implements OnInit ,OnChanges{
  // @Input()
  // searchCriteria!: SearchCriteriaRequest;
  @Input() 
  dataResult:OutputListModel[]=[]

  



  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes) 
      console.log(this.dataResult);
  }

  ngOnInit(): void { 

  }

  // get data(): any { 
  //   if (this.dataResult) {
  //     return this.newData;      
  //   }
  //   return [];
  // }
  



  

}
