import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services';
import { Observable, map } from 'rxjs';
import { HttpRepositoryResponse, HttpRepositoryResponseOne } from '../models/repository.model';
import { ApiPath } from '@core/config';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService extends HttpService {

  constructor(
    protected override http: HttpClient
  ) {
    super(http);
  }

  public getListRepo(): Observable<HttpRepositoryResponse | HttpErrorResponse> {
    // debugger;
    return this.get(ApiPath.REPOSITORY).pipe(
      map((response: HttpRepositoryResponse) => response)) as Observable<HttpRepositoryResponse | HttpErrorResponse>;
  }
  public getRepoById(id: number): Observable<HttpRepositoryResponseOne | HttpErrorResponse> {
    let body: HttpParams = new HttpParams;
    body = body.set('id', id);
    return this.getParam(ApiPath.REPOSITORY_FIND_ONE_BY_ID, body).pipe(
      map((response: HttpRepositoryResponseOne) => response)) as Observable<HttpRepositoryResponseOne | HttpErrorResponse>;
  }
}
