import { OutputListService } from '../../service/output-list.service';
import { Component, OnInit } from '@angular/core';
import {
  OutputListModel,
  SearchCriteriaRequest,
} from '../../model/output-list';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoadingSpinnerDialogService } from '@layout/services/loading-spinner-dialog.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  searchCriteria!: SearchCriteriaRequest;
  dataResult: OutputListModel[] = [];
  totalItems: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  isHiddenSearch: boolean = false;

  constructor(
    private outputListService: OutputListService,
    protected Http: HttpClient,
    private loadingDialog: LoadingSpinnerDialogService
  ) {}

  ngOnInit(): void {}

  displaySearchForm(isHidden: boolean) {
    this.isHiddenSearch = isHidden;
    console.log(this.isHiddenSearch);
    
  }

  onSearch(searchCondition: SearchCriteriaRequest) {
    let httpParams = this.convertToHttpParams(searchCondition);
    this.loadingDialog.showSpinner(true);
    this.outputListService
      .getSearchOutputList(httpParams)
      .subscribe((res: any) => {
        this.loadingDialog.showSpinner(false);
        if (res === undefined || res === null) {
          this.dataResult = [];
          this.totalItems = 0;
          return;
        } else {
          this.dataResult = res.content;
          this.totalItems = res.totalElements;
          this.totalPages = res.totalPages;
        }
      });

    this.searchCriteria = searchCondition;
  }
  loadMore() {
    this.currentPage += 1;
    this.searchCriteria.page = this.currentPage;
    let httpParams = this.convertToHttpParams(this.searchCriteria);
    this.loadingDialog.showSpinner(true);

    this.outputListService
      .getSearchOutputList(httpParams)
      .subscribe((res: any) => {
        this.loadingDialog.showSpinner(false);
        if (res === undefined || res === null) {
          this.dataResult = [];
          return;
        } else {
          this.dataResult = [...this.dataResult, ...res.content];
        }
      });
  }

  //Convert searchCondition from Object to HttpParams
  convertToHttpParams(searchCondition: SearchCriteriaRequest) {
    let httpParams = new HttpParams();
    Object.keys(searchCondition).forEach((key) => {
      if (searchCondition[key]) {
        if (typeof searchCondition[key] === 'string') {
          httpParams = httpParams.set(
            key,
            searchCondition[key].replace(/-/g, '/')
          );
        } else {
          httpParams = httpParams.set(key, searchCondition[key]);
        }
      }
    });
    return httpParams;
  }
}
