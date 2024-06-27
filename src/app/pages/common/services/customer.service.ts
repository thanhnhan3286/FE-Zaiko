import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services';
import { HttpCustomerResponse } from '../models/customer.model';
import { Observable, map } from 'rxjs';
import { ApiPath } from '@core/config';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends HttpService {

  constructor(
    protected override http: HttpClient
  ) {
    super(http);
  }
  // public getListCustomer(): Observable<HttpCustomerResponse | HttpErrorResponse> {
  //   // debugger;
  //   return this.get(ApiPath.CUSTOMER).pipe(
  //     map((response: HttpCustomerResponse) => response)) as Observable<HttpCustomerResponse | HttpErrorResponse>;
  // }
  public getCustomerByCode(code: string): Observable<HttpCustomerResponse | HttpErrorResponse> {
    let body: HttpParams = new HttpParams;
    body = body.set('code', code);
    // debugger;
    return this.getParam(ApiPath.GET_CUSTOMER_BY_CODE, body).pipe(
      map((response: HttpCustomerResponse) => response)) as Observable<HttpCustomerResponse | HttpErrorResponse>;
  }
}
