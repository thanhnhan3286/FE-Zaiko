/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@auth/services/login.service';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { HttpClientResponse, LocationBan } from '@core/models';
import { LanguageService } from '@core/services/cache/languague.service';
import { LoadingSpinnerDialogService } from '@layout/services/loading-spinner-dialog.service';
import { isUndefined } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';


@Injectable()
export class JsonTokenWebInterceptor implements HttpInterceptor {
  public constructor(
    private dialogService: DialogConfirmService,
    private router: Router,
    private loadingDialog: LoadingSpinnerDialogService,
    private loginService: LoginService,
    private toastrService: ToastrService,
    private languageService: LanguageService
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const reqClone = this.addToHeader(request);

    return next.handle(reqClone).pipe(
      // tap((response) => {
      //   const res = (response as HttpResponse<any>).body as HttpClientResponse;

      //   if(res.meta.field === '410'){
      //     this.dialogService.customMessage('error', this.languageService.get('引当済数より小さい値で指定できません。' + res.meta.code));
      //   }
      // }),
      catchError((reason: HttpErrorResponse) => {
        if (reason.status >= 500) {
          this.loadingDialog.showSpinner(false);
          const dcm = document.getElementsByClassName('dialog-information');

          if (isUndefined(dcm)) {
            this.dialogService.customMessage('error', this.languageService.get('common.message.deploy-sever-error')).afterClosed().subscribe(() => {
              window.location.reload();
            });
          }


        } else
          if (reason.error.error === 'invalid_token') {
            this.toastrService.error(this.languageService.get('common.message.invalid-token'), '', {
              enableHtml: true
            });
            this.loginService.isLoginAsync$.next(false);
            this.router.navigate(['auth/login']);
            localStorage.removeItem('user_login');
            localStorage.removeItem('id_token');
            this.loadingDialog.showSpinner(false);
          } else
            if (reason.error.error === 'access_denied') {
              this.loginService.isLoginAsync$.next(false);
              this.router.navigate(['auth/login']);
              localStorage.removeItem('user_login');
              localStorage.removeItem('id_token');
              this.loadingDialog.showSpinner(false);
            } else
              if (reason.error.error === 'invalid_grant' || reason.error.error === 'unauthorized' || reason.error.error === 'Unauthorized') {
                this.toastrService.error(this.languageService.get('common.message.login-infor-wrong'));
                localStorage.removeItem('id_token');
                localStorage.removeItem('user_login');
                this.loadingDialog.showSpinner(false);
              } else if ((reason.error as HttpClientResponse).meta && (reason.error as HttpClientResponse).meta.code === '411') {
                this.dialogService.customMessage('error', this.languageService.get('棚卸中のため、実行できません。'));

                return throwError(() => this.loadingDialog.showSpinner(false));
              } else
                if ((reason.error as HttpClientResponse).meta && (reason.error as HttpClientResponse).meta.code === '410') {
                  this.dialogService.customMessage('error', this.languageService.get('棚卸中データのため、保存できません。<br> 指示番号：' + (reason.error as HttpClientResponse).meta.message));

                  return throwError(() => this.loadingDialog.showSpinner(false));
                } else
                  if ((reason.error as HttpClientResponse).meta && (reason.error as HttpClientResponse).meta.code === '412') {
                    let dataResponse = (reason.error as HttpClientResponse).data as LocationBan[];

                    if ((reason.error as HttpClientResponse).meta.message === 'input') {
                      this.dialogService.customMessage('error', this.languageService.get('入荷禁止のロケーションです。' + dataResponse.map((x: LocationBan) => {
                        return '<br> 倉庫：' + x.repository + ' - ロケーション : ' + x.location;
                      })));
                      this.loadingDialog.showSpinner(false);

                    } else {
                      this.dialogService.customMessage('error', this.languageService.get('出荷禁止のロケーションです。' + dataResponse.map((x: LocationBan) => {
                        return '<br> 倉庫：' + x.repository + ' - ロケーション : ' + x.location;
                      })));
                      this.loadingDialog.showSpinner(false);
                    }

                    return throwError(() => null);
                  } else

                    if (reason.error !== undefined && reason.error.code === 'TOKEN_EXPIRED') {
                      // TODO: Implement when TOKEN EXPIRED
                    }
        // else
        //   if (reason.error.meta.code >= 500 || reason.status >= 500) {
        //     this.dialogService.customMessage('error', reason.error.meta.message);
        //   }

        return throwError(() => reason);
      })
    );
  }

  /**
   * Method to add the Authorization token in header. Returns the new request
   */
  private addToHeader(request: HttpRequest<any>): HttpRequest<any> {
    const token = localStorage.getItem('id_token');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return request;
  }
}
