import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private auth: AuthService) {}
  intercept(req: any, next: any) {
    // console.log(this.auth.getToken());

    const TokenReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.auth.getToken(),
      },
    });
    return next.handle(TokenReq);
  }
}
