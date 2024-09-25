// src/app/api-interceptor-fn.ts
import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { NbAuthService } from '@nebular/auth';
import { v4 as uuidv4 } from 'uuid';

export const apiInterceptorFn: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(NbAuthService);
  const token = authService.getToken();
  const transactionId = uuidv4();

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
      'Transaction-Id': transactionId
    }
  });

  return next(clonedRequest);
};