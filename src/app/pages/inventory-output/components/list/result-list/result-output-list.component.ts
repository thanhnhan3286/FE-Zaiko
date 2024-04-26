/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { OutputListModel } from '../../../models/output-list.model';
import { SearchOutputListService } from '../../../services/search-outputList.service';

@Component({
  selector: 'app-result-output-list',
  templateUrl: './result-output-list.component.html',
  styleUrls: ['./result-output-list.component.scss']
})
export class ResultOutputListComponent implements OnInit, OnChanges{

  @Input() searchParams: any;
  public dataTable: OutputListModel[] = [];
  pageNumber = 0;
  pageSize = 20;
  totalPages = 0;
  totalElements = 0;

  public constructor(private outPutListService: SearchOutputListService) {}

  ngOnInit(): void {
    console.log('Init work');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchParams'] && changes['searchParams'].currentValue) {
      const params = changes['searchParams'].currentValue;

      console.log('Param: ', params);

      this.outPutListService.searchOutputListByCondition(params, this.pageNumber)
        .subscribe((results : any) => {
          this.totalPages = results.totalPages;
          this.totalElements = results.totalElements;
          this.dataTable = results.content;
          console.log('DU LIEU ', results);
        });
    }
  }

  loadMore(){
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.loadData();
    }
  }

  loadData(){
      this.outPutListService.searchOutputListByCondition(this.searchParams, this.pageNumber)
        .subscribe((results : any) => {
          this.totalPages = results.totalPages;
          this.totalElements = results.totalElements;
          this.dataTable = this.dataTable.concat(results.content);
          console.log('DU LIEU ', results);
        });
  }

}
