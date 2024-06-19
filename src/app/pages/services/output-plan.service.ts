import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientCourseResponse, HttpClientLocationRespone, HttpClientPlanOutputDetailResponse, HttpClientPlanOutputResponse, HttpClientRouteResponse, inventoryPlanData } from '../models/output/plan.model';
import { HttpService } from '@core/services';
import { ApiPath } from '@core/config';
import { finalize, map } from 'rxjs/operators';
import { HttpClienRepositorytResponse } from '../models/output/list.model';
import { HttpClientResponse } from '@core/models';
import { LoadingSpinnerDialogService } from '@layout/services';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class OutputPlanService extends HttpService {

  public constructor(
    protected override http: HttpClient,
    private loadingDialog: LoadingSpinnerDialogService,
    private dialog: MatDialog
  ) {
    super(http);
  }


  public findPlanOutputWithKey(id: number): Observable<HttpClientPlanOutputResponse | HttpErrorResponse> {
    const url = `${ApiPath.INVENTORY_OUTPUT_PLAN}/${id}`;
    return this.get(url).pipe(
      map((response: HttpClientPlanOutputResponse) => response)
    ) as Observable<HttpClientPlanOutputResponse | HttpErrorResponse>;
  }

  
  public checkSlipNo(slipNo: String): Observable<HttpClientResponse> {
    const url = `${ApiPath.CHECK_SLIP_NO}/${slipNo}`;
    return this.get(url).pipe(
      map((response: HttpClientResponse) => response)
    ) as Observable<HttpClientResponse>;
  }

  public getCustomerByCode(customerCode: String): Observable<HttpClientResponse> {
    const url = `${ApiPath.GET_CUSTOMER_BY_CODE}/${customerCode}`;
    return this.get(url).pipe(
      map((response: HttpClientResponse) => response)
    ) as Observable<HttpClientResponse>
  }

  public getCustomerDestByCode(destinationCode: String): Observable<HttpClientResponse> {
    const url = `${ApiPath.CUSTOMER_DESTINATION_BY_CODE}/${destinationCode}`;
    return this.get(url).pipe(
      map((response: HttpClientResponse) => response)

    ) as Observable<HttpClientResponse>
  }

  public getProductInventoryById(productInventoryId: number): Observable<HttpClientResponse> {
    const url = `${ApiPath.PRODUCT_INVENTORY}/${productInventoryId}`;
    return this.get(url).pipe(
      map((response: HttpClientResponse) => response)
    ) as Observable<HttpClientResponse>
  }

  public getProductByCode(productCode: String): Observable<HttpClientResponse> {
    const url = `${ApiPath.GET_PRODUCT_BY_CODE}/${productCode}`;
    return this.get(url).pipe(
      map((response: HttpClientResponse) => response)
    ) as Observable<HttpClientResponse>
  }
  public getProductById(productId: number): Observable<HttpClientResponse> {
    const url = `${ApiPath.GET_PRODUCT_BY_ID}/${productId}`;
    return this.get(url).pipe(
      map((response: HttpClientResponse) => response)
    ) as Observable<HttpClientResponse>
  }

  public getLocationByRepo(repo_id : number): Observable<HttpClientLocationRespone> {
    const url =`${ApiPath.LOCATION}/${repo_id}`;
    return this.get(url).pipe(
      map((response : HttpClientLocationRespone) => response)
    ) as Observable<HttpClientLocationRespone>
  }

  public getNextAutomaticSlipNo(): Observable<String> {
    return this.get(ApiPath.GET_AUTOMATIC_SLIP_NO).pipe(
      map((response: any) => response as string)
    );
 }

  public getAllCourse(): Observable<HttpClientCourseResponse> {
    return this.get(ApiPath.COURSE).pipe(
      map((response: HttpClientCourseResponse) => response)
    ) as Observable<HttpClientCourseResponse>
  }

  public getAllRoute(): Observable<HttpClientRouteResponse> {
    return this.get(ApiPath.ROUTE).pipe(
      map((response: HttpClientRouteResponse) => response)
    ) as Observable<HttpClientRouteResponse>
  }

  public getAllRepository(): Observable<HttpClienRepositorytResponse> {
    return this.get(ApiPath.REPOSITORY).pipe(
      map((response: HttpClienRepositorytResponse) => response)
    ) as Observable<HttpClienRepositorytResponse>
  }

  public getAllLocation(): Observable<HttpClientLocationRespone> {
    return this.get(ApiPath.LOCATION).pipe(
      map((response: HttpClientLocationRespone) => response)

    ) as Observable<HttpClientLocationRespone>
  }
  public getPlanOutputDetail(id :number): Observable<HttpClientPlanOutputDetailResponse | HttpErrorResponse>{
    const url = `${ApiPath.INVENTORY_OUTPUT_PLAN}-detail/${id}`;   
     return this.get(url).pipe(
      map((response: HttpClientPlanOutputDetailResponse) => response)
    ) as Observable<HttpClientPlanOutputDetailResponse | HttpErrorResponse>;
  }
  public saveOutputPlanData(planForm : inventoryPlanData) : Observable<HttpClientResponse | HttpErrorResponse> {
   this.loadingDialog.showSpinner(true);
    return this.post(ApiPath.INVENTORY_OUTPUT_PLAN,planForm).pipe(
      map((response: HttpClientResponse ) =>response),
      finalize(() => this.loadingDialog.showSpinner(false) )
    ) as Observable<HttpClientResponse | HttpErrorResponse>

  }
  public getPlanOutPutDetail(id:Number) :Observable<HttpClientResponse | HttpErrorResponse > {
     this.loadingDialog.showSpinner(true);
     const url = `${ApiPath.INVENTORY_OUTPUT_PLAN}/${id}`;
     return this.get(url).pipe(
      map((response: HttpClientResponse ) => response),finalize(()=>this.loadingDialog.showSpinner(false) ) 
     ) as Observable<HttpClientResponse | HttpErrorResponse>
  }
  


}
