import { environment } from '@env/environment';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services';
import { map, Observable } from 'rxjs';
import { ApiPath } from '@core/config';
import { OutputListResponse } from '../model/output-list';

@Injectable({
  providedIn: 'root',
})
export class OutputListService extends HttpService {
  public constructor(protected override http: HttpClient) {
    super(http);
  }

  public getAllOutputList(): Observable<OutputListResponse | HttpErrorResponse> {
    return this.get(`${ApiPath.INVENTORY_OUTPUT} + '/list-output'`).pipe(
      map((response: OutputListResponse | HttpErrorResponse) => response)
    ) as Observable<OutputListResponse| HttpErrorResponse>;
  }

  // public getSearchOutputList(): Observable<OutputListResponse | HttpErrorResponse> {
  //   return this.get(`${ApiPath.INVENTORY_OUTPUT}/search-output-list`).pipe(
  //     map((response: OutputListResponse | HttpErrorResponse) => response)
  //   ) as Observable<OutputListResponse| HttpErrorResponse>;
  // }

  public getSearchOutputList(params: HttpParams): Observable<OutputListResponse | HttpErrorResponse> {
    console.log(params);
    
    return this.http.get<OutputListResponse>(`${ApiPath.INVENTORY_OUTPUT}/search-output-list`, {params}).pipe(
      map((response: OutputListResponse | HttpErrorResponse) => response)
    ) as Observable<OutputListResponse| HttpErrorResponse>;
  }
}
