import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from '@core/config';
import { HttpService } from '@core/services';
import { Observable, map } from 'rxjs';
import { InputListResponse } from '../model/input-list';

@Injectable({
  providedIn: 'root',
})
export class InputListService extends HttpService {
  public constructor(protected override http: HttpClient) {
    super(http);
  }

  public getSearchInputList(
    params: HttpParams
  ): Observable<InputListResponse | HttpErrorResponse> {
    console.log(params);

    return this.http
      .get<InputListResponse>(`${ApiPath.INVENTORY_INPUT}/search-input-list`, {
        params,
      })
      .pipe(
        map((response: InputListResponse | HttpErrorResponse) => response)
      ) as Observable<InputListResponse | HttpErrorResponse>;
  }
}
