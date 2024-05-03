import { OutputListService } from '../../service/output-list.service';
import { Component, OnInit } from '@angular/core';
import {
  OutputListModel,
  SearchCriteriaRequest,
} from '../../model/output-list';
import {
  HttpClient,
  HttpParams,
} from '@angular/common/http';

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

  constructor(
    private outputListService: OutputListService,
    protected Http: HttpClient
  ) {}

  ngOnInit(): void {}
  onSearch(searchCondition: SearchCriteriaRequest) {
    let httpParams = this.convertToHttpParams(searchCondition);
    this.outputListService
      .getSearchOutputList(httpParams)
      .subscribe((res: any) => {
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

    this.outputListService
      .getSearchOutputList(httpParams)
      .subscribe((res: any) => {
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
