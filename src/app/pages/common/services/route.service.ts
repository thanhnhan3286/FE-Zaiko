import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services';
import { Observable, map } from 'rxjs';
import { HttpRouteResponse } from '../models/route-entity.model';
import { ApiPath } from '@core/config';

@Injectable({
  providedIn: 'root'
})
export class RouteService extends HttpService {

  constructor(
    protected override http: HttpClient
  ) {
    super(http);
  }
  public getListRoute(): Observable<HttpRouteResponse | HttpErrorResponse> {
    // debugger;
    return this.get(ApiPath.ROUTE).pipe(
      map((response: HttpRouteResponse) => response)) as Observable<HttpRouteResponse | HttpErrorResponse>;
  }
}
