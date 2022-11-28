import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { TokenService } from '../../backend/service/token.service';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root',
})
export class HeadersInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService, private spinnerService: SpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnerService.show()
    let intReq = req;
    const token = this.tokenService.getToken();

    if (token != null) {
      intReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer' + token),
      });
    }
    return next.handle(intReq).pipe(
      finalize(()=>this.spinnerService.hide())
    )
  }
}
export const interceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HeadersInterceptor,
    multi: true,
  },
];
