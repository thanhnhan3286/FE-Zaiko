import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services';
import { Observable, map } from 'rxjs';
import { HttpProductTypeResponse } from '../models/product-type.model';
import { ApiPath } from '@core/config';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService extends HttpService {

  constructor(
    protected override http: HttpClient
  ) {
    super(http);
  }

  public getListProductType(): Observable<HttpProductTypeResponse | HttpErrorResponse> {
    // debugger;
    return this.get(ApiPath.COMMON_SETTNG_PRODUCT_TYPE).pipe(
      map((response: HttpProductTypeResponse) => response)) as Observable<HttpProductTypeResponse | HttpErrorResponse>;
  }
}
