import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services';
import { Observable, map } from 'rxjs';
import { ApiPath } from '@core/config';
import { HttpPlanOutputDetailResponse, PlanOutputForm } from '../model/plan-output-detail.model';
import { HttpClientResponse, HttpClientResponseList } from '@core/models';
import { HttpOutputDetailResponse } from 'src/app/pages/common/models/output-detail.model';

@Injectable({
  providedIn: 'root'
})
export class PlanDetailService extends HttpService {

  public constructor(
    protected override http: HttpClient
  ) {
    super(http);
  }

  public getPlanOutput(id: any, page?: any): Observable<HttpOutputDetailResponse | HttpErrorResponse> {
    let body: HttpParams = new HttpParams();
    body = body.set('id', id);
    if (page === 0 || page) {
      body = body.set('page', page);
    }
    return this.getParam(ApiPath.INVENTORY_OUTPUTPLAN, body).pipe(
      map((response: HttpOutputDetailResponse) => response)) as Observable<HttpOutputDetailResponse | HttpErrorResponse>;
  }

  public getPlanOutputDetail(id: any, page?: any): Observable<HttpPlanOutputDetailResponse | HttpErrorResponse> {
    let body: HttpParams = new HttpParams();
    body = body.set('id', id);
    if (page === 0 || page) {
      body = body.set('page', page);
    }
    return this.getParamList(ApiPath.INVENTORY_OUTPUT_PLAN_DETAIL, body).pipe(
      map((response: HttpClientResponseList) => response)
    ) as Observable<HttpPlanOutputDetailResponse | HttpErrorResponse>;
  }

  public checkSlipNo(slipNo: any): Observable<HttpClientResponse | HttpErrorResponse> {
    let body: HttpParams = new HttpParams();
    body = body.set('slipNo', slipNo);
    return this.getParam(ApiPath.CHECK_SLIP_NO, body).pipe(
      map((response: HttpClientResponse) => response)) as Observable<HttpClientResponse | HttpErrorResponse>;
  }

  public createPlanOutputDetail(data: PlanOutputForm): Observable<HttpClientResponse> {
    console.log("DATA: ", data);
    return this.post(ApiPath.CREATE_INVENTORY_OUTPUT_PLAN_DETAIL, data).pipe(
      map((response: HttpClientResponse) => response)
    ) as Observable<HttpClientResponse>;

  }
  public updatePlanOutputDetail(data: PlanOutputForm): Observable<HttpClientResponse> {
    return this.post(ApiPath.UPDATE_INVENTORY_OUTPUT_PLAN_DETAIL, data).pipe(
      map((response: HttpClientResponse) => response)
    ) as Observable<HttpClientResponse>;

  }
  public deleteInventoryOutput(id: number) {
    let body: HttpParams = new HttpParams();
    body = body.set('id', id);
    return this.delete(ApiPath.INVENTORY_OUTPUTPLAN, body).pipe(
      map((response: HttpClientResponse) => response)
    ) as Observable<HttpClientResponse>;
  }
}

