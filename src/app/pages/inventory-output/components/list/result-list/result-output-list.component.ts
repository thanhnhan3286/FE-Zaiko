/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { OutputListModel, OutputListSearchModel } from '../../../models/output-list.model';
import { OutputListService } from '../../../services/outputList.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingSpinnerDialogService } from '@layout/services';

@Component({
  selector: 'app-result-output-list',
  templateUrl: './result-output-list.component.html',
  styleUrls: ['./result-output-list.component.scss']
})
export class ResultOutputListComponent implements OnInit, OnChanges{

  @Input() searchParams!: OutputListSearchModel;
  public dataTable: OutputListModel[] = [];

  pageNumber = 0;
  pageSize = 20;
  totalPages = 0;
  totalElements = 0;

  public constructor(private outPutListService: OutputListService,
                    private loadingDialog: LoadingSpinnerDialogService

  ) {}

  ngOnInit(): void {
    console.log('Init work');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchParams'] && changes['searchParams'].currentValue) {
      const params = changes['searchParams'].currentValue;

      console.log('Param: ', params);

      this.loadingDialog.showSpinner(true);
      this.outPutListService.searchOutputListByCondition(params)
        .subscribe((results) => {
          this.loadingDialog.showSpinner(false);

          if((results as HttpErrorResponse).status === 403){
            return;
          }else{
            this.pageNumber = JSON.parse(JSON.stringify(results)).pageNumber;
            this.pageSize = JSON.parse(JSON.stringify(results)).pageSize;
            this.totalPages = JSON.parse(JSON.stringify(results)).totalPages;
            this.totalElements = JSON.parse(JSON.stringify(results)).totalElements;
            this.dataTable = JSON.parse(JSON.stringify(results)).content;
          }

          console.log('DU LIEU ', results);
          console.log('searparam: ',this.searchParams.page);
        });
    }
  }

  loadMore(){
    if (this.pageNumber < this.totalPages) {
      this.searchParams.page = ++this.pageNumber;
      console.log('searchParamPage: ',this.searchParams.page);
      this.loadData();
    }
  }

  loadData(){
      this.outPutListService.searchOutputListByCondition(this.searchParams)
        .subscribe((results) => {
          this.totalPages = JSON.parse(JSON.stringify(results)).totalPages;
          this.totalElements = JSON.parse(JSON.stringify(results)).totalElements;
          this.dataTable = this.dataTable.concat(JSON.parse(JSON.stringify(results)).content);
          console.log('DU LIEU ', results);
        });
  }

}
