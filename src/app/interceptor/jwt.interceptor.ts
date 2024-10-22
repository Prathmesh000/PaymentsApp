import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { switchMap, take } from 'rxjs/operators';
import { AuthserviceService } from '../service/auth-services.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthserviceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    console.log('Request intercepted:', request.url);
    
    return this.authService.userToken.pipe(
      take(1),
      switchMap((token: string | null) => {
        const isApiUrl = request.url.startsWith('http://localhost:5223');
        
        
        if (token && isApiUrl) {
          console.log('Attaching token:', token); 
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
        }

        // Pass the request to the next handler
        return next.handle(request);
      })
    );
  }
}
