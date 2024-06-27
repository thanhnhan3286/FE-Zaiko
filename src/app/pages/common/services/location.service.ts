import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services';
import { Observable, map } from 'rxjs';
import { HttpLocationResponse } from '../models/location.model';
import { ApiPath } from '@core/config';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends HttpService {

  constructor(
    protected override http: HttpClient
  ) {
    super(http);
  }

  public getListLocation(id: number): Observable<HttpLocationResponse | HttpErrorResponse> {
    let body: HttpParams = new HttpParams;
    body = body.set('id', id);
    return this.getParam(ApiPath.LOCATION, body).pipe(
      map((response: HttpLocationResponse) => response)) as Observable<HttpLocationResponse | HttpErrorResponse>;
  }
}
