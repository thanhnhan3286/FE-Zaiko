import { HttpClientResponse } from './../../../core/models/http-response.model';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services';
import { map, Observable } from 'rxjs';
import { ApiPath } from '@core/config';
import {
  CommonSettingResponse,
  CourseResponse,
  CustomerDestResponse,
  CustomerInfoResponse,
  InventoryOutput,
  InventoryOutputData,
  LocationResponse,
  OutputListResponse,
  OutputResponse,
  PlanOutputDetailListResponse,
  ProductInfoResponse,
  RouteResponse,
} from '../model/output-list';

@Injectable({
  providedIn: 'root',
})
export class OutputListService extends HttpService {
  public constructor(protected override http: HttpClient) {
    super(http);
  }

  public getAllOutputList(): Observable<
    OutputListResponse | HttpErrorResponse
  > {
    return this.get(`${ApiPath.INVENTORY_OUTPUT} + '/list-output'`).pipe(
      map((response: OutputListResponse | HttpErrorResponse) => response)
    ) as Observable<OutputListResponse | HttpErrorResponse>;
  }

  public getOutputById(
    id: number
  ): Observable<OutputResponse | HttpErrorResponse> {
    return this.get(`${ApiPath.INVENTORY_OUTPUT_PLAN}/detail?id=${id}`).pipe(
      map((res: OutputResponse | HttpErrorResponse) => res)
    );
  }

  public getPlanOutputDetailList(
    id: number
  ): Observable<PlanOutputDetailListResponse | HttpErrorResponse> {
    return this.get(
      `${ApiPath.INVENTORY_OUTPUT_PLAN}/get-plan-detail?id=${id}`
    ).pipe(
      map(
        (response: PlanOutputDetailListResponse | HttpErrorResponse) => response
      )
    ) as Observable<PlanOutputDetailListResponse | HttpErrorResponse>;
  }

  public getSearchOutputList(
    params: HttpParams
  ): Observable<OutputListResponse | HttpErrorResponse> {
    console.log(params);

    return this.http
      .get<OutputListResponse>(
        `${ApiPath.INVENTORY_OUTPUT}/search-output-list`,
        { params }
      )
      .pipe(
        map((response: OutputListResponse | HttpErrorResponse) => response)
      ) as Observable<OutputListResponse | HttpErrorResponse>;
  }

  public getAllRoute(): Observable<RouteResponse | HttpErrorResponse> {
    return this.get(`${ApiPath.ROUTE}/get-all`).pipe(
      map((res: RouteResponse) => res)
    ) as Observable<RouteResponse | HttpErrorResponse>;
  }

  public getAllCourse(): Observable<CourseResponse | HttpErrorResponse> {
    return this.get(`${ApiPath.COURSE}/get-all`).pipe(
      map((res: CourseResponse) => res)
    ) as Observable<CourseResponse | HttpErrorResponse>;
  }

  public checkSlipNoExist(slipNo: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${ApiPath.INVENTORY_OUTPUT_PLAN}/check-output-exist/${slipNo}`
    );
  }

  public getCustomerInfo(code: string): Observable<CustomerInfoResponse> {
    return this.get(
      `${ApiPath.INVENTORY_OUTPUT_PLAN}/get-customer-info/${code}`
    ).pipe(map((res: CustomerInfoResponse) => res));
  }

  public getCustomerDestAddress(
    code: string
  ): Observable<CustomerDestResponse> {
    return this.get(
      `${ApiPath.INVENTORY_OUTPUT}/get-customer-dest-address/${code}`
    ).pipe(map((res: CustomerDestResponse) => res));
  }

  public getProductInfo(postCode: string): Observable<ProductInfoResponse> {
    return this.get(
      `${ApiPath.INVENTORY_OUTPUT_PLAN}/get-product-info/${postCode}`
    ).pipe(map((res: ProductInfoResponse) => res));
  }

  public getAllLocation(): Observable<LocationResponse | HttpErrorResponse> {
    return this.get(`${ApiPath.LOCATION}/get-all`).pipe(
      map((res: LocationResponse) => res)
    ) as Observable<LocationResponse | HttpErrorResponse>;
  }

  public getLocationByRepo(
    repositoryId: number
  ): Observable<LocationResponse | HttpErrorResponse> {
    return this.get(`${ApiPath.LOCATION}/get-by-repo/${repositoryId}`).pipe(
      map((res: LocationResponse) => res)
    ) as Observable<LocationResponse | HttpErrorResponse>;
  }

  public getAllCommonSetting(): Observable<
    CommonSettingResponse | HttpErrorResponse
  > {
    return this.get(`${ApiPath.COMMON_SETTNG}/get-all`).pipe(
      map((res: CommonSettingResponse) => res)
    ) as Observable<CommonSettingResponse | HttpErrorResponse>;
  }

  public saveOutputPlan(
    output: InventoryOutputData
  ): Observable<HttpClientResponse> {
    let inventoryOutput = output.outputPlan;
    let planDetail = output.detailList;
    console.log('output plan', inventoryOutput);
    console.log('detail', planDetail);
    return this.http
      .post(`${ApiPath.INVENTORY_OUTPUT}/save-output`, output)
      .pipe(map((res) => res)) as Observable<HttpClientResponse>;
  }

  deleteOutputAndDetail(inventoryOutputId: number): Observable<HttpClientResponse> {
    console.log(inventoryOutputId);
    let param = new HttpParams().set('id',inventoryOutputId);
    console.log(param);
    
    
    return this.http
      .post(`${ApiPath.INVENTORY_OUTPUT}/delete-output-and-detail`, param)
      .pipe(map((res) =>  res )) as Observable<HttpClientResponse>;
  }
}
