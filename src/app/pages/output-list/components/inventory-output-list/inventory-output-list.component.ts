import { map } from 'rxjs';
import { OutputListService } from './../../service/output-list.service';
import { Component, OnInit } from '@angular/core';
import {
  OutputListModel,
  OutputListResponse,
  SearchCriteriaRequest,
} from '../../model/output-list';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { RepositoryResponse } from '../../model/repositoryDto';

@Component({
  selector: 'app-inventory-output-list',
  templateUrl: './inventory-output-list.component.html',
  styleUrls: ['./inventory-output-list.component.scss'],
})
export class InventoryOutputListComponent implements OnInit {
  searchCriteria!: SearchCriteriaRequest;
  dataResult: OutputListModel[]=[];
  data: any;

  constructor(
    private outputListService: OutputListService,
    protected Http: HttpClient
  ) {}

  ngOnInit(): void {}
  onSearch(searchCondition: SearchCriteriaRequest) {
    //Convert searchCondition from Object to HttpParams
    let httpParams = new HttpParams();
    Object.keys(searchCondition).forEach((key) => {
      const value: string = searchCondition[key];
      if (value) {
        httpParams = httpParams.set(key, value.replace(/-/g, '/'));
      }
    });

    this.outputListService
      .getSearchOutputList(httpParams)
      .subscribe((res: any) => {
        this.dataResult = res.content;
        console.log('Inventory: ');
        console.log(res);
        if (
          (res as HttpErrorResponse).status &&
          (res as HttpErrorResponse).status !== 200
        ) {
          return;
        } else {

          console.log("123456:  ",this.dataResult);
          
        }
      });
  }
}
