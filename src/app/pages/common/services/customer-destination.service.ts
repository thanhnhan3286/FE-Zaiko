import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services';
import { Observable, map } from 'rxjs';
import { HttpCustomerDestinationResponse } from '../models/customer-destination.model';
import { ApiPath } from '@core/config';

@Injectable({
  providedIn: 'root'
})
export class CustomerDestinationService extends HttpService {

  constructor(
    protected override http: HttpClient
  ) {
    super(http);
  }
  public getCustomerDestinationByCode(code: string): Observable<HttpCustomerDestinationResponse | HttpErrorResponse> {
    let body: HttpParams = new HttpParams;
    body = body.set('code', code);
    return this.getParam(ApiPath.GET_DESTINATION_CUSTOMER, body).pipe(
      map((response: HttpCustomerDestinationResponse) => response)) as Observable<HttpCustomerDestinationResponse | HttpErrorResponse>;
  }
}
