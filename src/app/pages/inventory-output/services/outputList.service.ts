/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services';
import { HttpClientOutputListResponse } from '../models/output-list.model';
import { Observable, map } from 'rxjs';
import { ApiPath } from '@core/config';
import { HttpClientRepositoryResponse } from '../models/repository.model';

@Injectable({
    providedIn: 'root'
})
export class OutputListService extends HttpService{

    public constructor(
        protected override http: HttpClient
      ) {
        super(http);
      }

    public searchOutputListByCondition(formData: any): 
        Observable<HttpClientOutputListResponse | HttpErrorResponse>{
        
            let params = new HttpParams();
            // if(page === 0 || page){
            //     params = params.set('page', page);
            // }

            Object.keys(formData).forEach(key =>{
                if(formData[key]){
                    params = params.set(key, formData[key]);
                }
            });

        console.log('queryString ',params);

     
        return this.getWithParams(ApiPath.INVENTORY_OUTPUT, params).pipe(
            map((response: HttpClientOutputListResponse) => response )         
        ) as Observable<HttpClientOutputListResponse | HttpErrorResponse>;
        

    }

    public getAllRepository() : 
    Observable<HttpClientRepositoryResponse | HttpErrorResponse>{

        return this.get(ApiPath.REPOSITORY).pipe(
            map((response: HttpClientRepositoryResponse) => response)
        ) as Observable<HttpClientRepositoryResponse | HttpErrorResponse>;
    }

    private buildFilterQuery(formData: any) : string{
        let queryString = '';

        for(const key in formData){
            if(formData[key]){
                queryString += `${key}=${formData[key]}&`;
            }
        }
        
        return queryString.slice(0, -1);
    }
}