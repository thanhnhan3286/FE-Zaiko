import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services';
import { Observable, map } from 'rxjs';
import { HttpProductResponse } from '../models/product.model';
import { ApiPath } from '@core/config';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends HttpService {

  constructor(
    protected override http: HttpClient
  ) {
    super(http);
  }

  public getProductByCode(code: string): Observable<HttpProductResponse | HttpErrorResponse> {
    let body: HttpParams = new HttpParams;
    body = body.set('code', code);
    return this.getParam(ApiPath.GET_PRODUCT_BY_CODE, body).pipe(
      map((response: HttpProductResponse) => response)) as Observable<HttpProductResponse | HttpErrorResponse>;
  }
}
