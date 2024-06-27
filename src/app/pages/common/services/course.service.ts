import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services';
import { HttpCourseResponse } from '../models/course.model';
import { Observable, map } from 'rxjs';
import { ApiPath } from '@core/config';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends HttpService {

  constructor(
    protected override http: HttpClient
  ) {
    super(http);
  }

  public getListCourse(): Observable<HttpCourseResponse | HttpErrorResponse> {
    // debugger;
    return this.get(ApiPath.COURSE).pipe(
      map((response: HttpCourseResponse) => response)) as Observable<HttpCourseResponse | HttpErrorResponse>;
  }
  public getListCourseByRoute(code: string): Observable<HttpCourseResponse | HttpErrorResponse> {
    let body: HttpParams = new HttpParams;
    body = body.set('code', code);
    // debugger;
    return this.getParam(ApiPath.COURSE.concat('/by-route'), body).pipe(
      map((response: HttpCourseResponse) => response)) as Observable<HttpCourseResponse | HttpErrorResponse>;
  }
}
