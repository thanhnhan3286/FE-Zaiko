import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services';
import { map, Observable } from 'rxjs';
import { ApiPath } from '@core/config';
import { CourseResponse, OutputListResponse, OutputResponse, PlanOutputDetailListResponse, RouteResponse } from '../model/output-list';

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

  public getOutputById(id: number): Observable<OutputResponse | HttpErrorResponse> {
    return this.get(`${ApiPath.INVENTORY_OUTPUT_PLAN}/detail?id=${id}`).pipe(
      map((res: OutputResponse| HttpErrorResponse) => res)
    )
  }

  public getPlanOutputDetailList(id: number): Observable<PlanOutputDetailListResponse | HttpErrorResponse> {
    return this.get(`${ApiPath.INVENTORY_OUTPUT_PLAN}/get-plan-detail?id=${id}`).pipe(
      map((response: PlanOutputDetailListResponse | HttpErrorResponse) => response)
    ) as Observable<PlanOutputDetailListResponse| HttpErrorResponse>;
  }



  public getSearchOutputList(params: HttpParams): Observable<OutputListResponse | HttpErrorResponse> {
    console.log(params);
    
    return this.http.get<OutputListResponse>(`${ApiPath.INVENTORY_OUTPUT}/search-output-list`, {params}).pipe(
      map((response: OutputListResponse | HttpErrorResponse) => response)
    ) as Observable<OutputListResponse| HttpErrorResponse>;
  }

  public getAllRoute(): Observable<RouteResponse | HttpErrorResponse> {
    return this.get(`${ApiPath.ROUTE}/get-all`).pipe(
      map((res: RouteResponse ) => res)
    ) as Observable<RouteResponse | HttpErrorResponse>;
  }

  public getAllCourse(): Observable<CourseResponse | HttpErrorResponse> {
    return this.get(`${ApiPath.COURSE}/get-all`).pipe(
      map((res: CourseResponse ) => res)
    ) as Observable<CourseResponse | HttpErrorResponse>;
  }
}
