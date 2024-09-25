// src/app/auth-simple-interceptor.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NbAuthService } from '@nebular/auth';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private authService: NbAuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    // Personaliza la lógica del interceptor aquí
    const token = this.authService.getToken();
    const transactionId = uuidv4(); 


      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Transaction-Id': transactionId
        }
      });
    return next.handle(req);
  }
}