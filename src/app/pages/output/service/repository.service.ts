import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services';
import { map, Observable } from 'rxjs';
import { ApiPath } from '@core/config';
import { RepositoryResponse } from '../model/repositoryDto';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService extends HttpService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  public getAllRepository(): Observable<
    RepositoryResponse | HttpErrorResponse
  > {
    return this.get(`${ApiPath.REPOSITORY}/get-all`).pipe(
      map((res: RepositoryResponse) => res)
    ) as Observable<RepositoryResponse | HttpErrorResponse>;
  }
}
