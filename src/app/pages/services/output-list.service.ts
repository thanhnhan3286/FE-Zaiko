import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from '@core/config';
import { HttpService } from '@core/services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClienOutputListputResponse, HttpClienRepositorytResponse } from 'src/app/pages/models/output/list.model';


@Injectable({
  providedIn: 'root'
})
export class OutputListService extends HttpService  {
  public constructor(
    protected override http: HttpClient
  ) {
    super(http);
  }

  getOuputListWithFilters(params: any): Observable<HttpClienOutputListputResponse | HttpErrorResponse> {
    let httpParams = new HttpParams();
    
    Object.keys(params).forEach(key => {
      httpParams = httpParams.set(key, params[key]);
    });

    return this.getWithParams<HttpClienOutputListputResponse>(ApiPath.INVENTORY_OUTPUT, httpParams).pipe(
      map((response: HttpClienOutputListputResponse) => response)
    )as Observable<HttpClienOutputListputResponse | HttpErrorResponse>;

    
  }
  public getAllRepository(): Observable<HttpClienRepositorytResponse> {
    return this.get(ApiPath.REPOSITORY).pipe(
      map((response: HttpClienRepositorytResponse) => response)
    ) as Observable<HttpClienRepositorytResponse>;
  }
}
