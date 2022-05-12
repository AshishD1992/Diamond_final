import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { TokenService } from "./token.service";
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor  {

  constructor(private tokenService: TokenService, private router: Router) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headersConfig = {
      // "Content-Type": "appliaction/json"
      // "Accept": "application/json"
      Token:''
    };
    const authToken = this.tokenService.getToken();
    if (authToken && req.url.indexOf('https://ips.betfair.com') < 0 && req.url.indexOf('https://api.ipify.org') < 0) {
      headersConfig["Token"] = authToken;
    }
    const _req = req.clone({ setHeaders: headersConfig });
    return next
      .handle(_req)
      .pipe(
        catchError((error: any, caught: Observable<any>) => {
          if (error.status === 401) {
            this.tokenService.loggedOut();
            this.router.navigate(["/"]);
          }
          return throwError(error);
        })
      );
  }
}
