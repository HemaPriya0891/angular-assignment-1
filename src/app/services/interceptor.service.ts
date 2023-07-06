import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  moduleConfig: any;

  constructor(private router: Router) {
  

    this.moduleConfig = {
      resourceServer: {
        allowedUrls: [
          environment.apiUrl
        ],
        sendAccessToken: true,
      },
    };
  }
  private checkUrl(url: string): boolean {
    const found = this.moduleConfig.resourceServer.allowedUrls.find((u: any) => url.startsWith(u));
    return !!found;
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    let url = req.url;

    if (!url.startsWith('http') && !url.startsWith('https') && url.indexOf('/assets/') < 0) {
      url = environment.apiUrl;
      req = req.clone({ url });
    }

    if (!this.moduleConfig) {
      console.log('Module Config');
      return next.handle(req);
    }
    if (!this.moduleConfig.resourceServer) {
      console.log('resource Server');
      return next.handle(req);
    }
    if (!this.moduleConfig.resourceServer.allowedUrls) {
      console.log('allowed URls');
      return next.handle(req);
    }
    if (!this.checkUrl(url)) {
      console.log('check URLS');
      return next.handle(req);
    }

    // set header type
    let header: any = {};
      header = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
    

    //Set Auth Token inside header
    const sendAccessToken = this.moduleConfig.resourceServer.sendAccessToken;

    console.log('Send Access Token ::' + sendAccessToken);
    if (sendAccessToken) {
      let token;
      token = localStorage.getItem('email');
      
      if (url.startsWith(environment?.apiUrl)) {
        header['Authorization'] = 'Bearer ' + token; //Add the environment config values added in yaml files
      }

      req = req.clone({ setHeaders: header });
      console.log(req);
    }

    return next.handle(req).pipe(
      tap({
        next: () => null,
        error: (err: HttpErrorResponse) => {
          console.log(JSON.stringify(err));

          const error = err.error?.message || err.status;
          if (err.status === 401) {
            console.log('status ::: ' + err.status);
            localStorage.setItem('session', 'expired');
            window.location.href = '/logout';
            return;
          } else {
            return throwError(() => error);
          }
        },
      }),
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    let header: any = {};
    header['Authorization'] = 'Bearer ' + token;
    return request.clone({ setHeaders: header });
  }
}
