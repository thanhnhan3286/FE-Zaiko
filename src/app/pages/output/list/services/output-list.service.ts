import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpOutputListResponse, OuputModelRequest } from './../model/output-list.model'
import { HttpService } from '@core/services';

import { environment } from '@env/environment';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ApiPath } from '@core/config';
import { isEmpty, isNumber } from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class OutputService extends HttpService {
  public constructor(
    protected override http: HttpClient
  ) {
    super(http);
  }

  public getListOutputSearch(jsonData: any, page?: any): Observable<HttpOutputListResponse | HttpErrorResponse> {

    // Tạo đối tượng HttpParams
    let body: HttpParams = new HttpParams();
    // const data = JSON.parse(jsonData);
    const data = jsonData;
    // kiểm tra page
    if (page === 0 || page) {
      body = body.set('page', page);
    }
    // Set param vào body
    Object.keys(data).forEach(key => {
      if (data[key] != null) {
        body = body.set(key, data[key]);
      }
    });
    console.log(body);

    return this.getParam(ApiPath.INVENTORY_OUTPUT, body).pipe(
      map((response: HttpOutputListResponse) => response)) as Observable<HttpOutputListResponse | HttpErrorResponse>;
  }

}