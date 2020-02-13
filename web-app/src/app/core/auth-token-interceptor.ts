import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CacheService} from '../service/cache.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const reqClone = req.clone({
      setHeaders: {'auth-token': CacheService.getAuthToken()}
    });
    return next.handle(reqClone).pipe(map((httpEvent) => {
      if (httpEvent instanceof HttpResponse) {
        const httpResponse = httpEvent as HttpResponse<any>;
        const authToken = httpResponse.headers.get('auth-token');
        CacheService.setAuthToken(authToken);
      }

      return httpEvent;
    }));
  }
}


