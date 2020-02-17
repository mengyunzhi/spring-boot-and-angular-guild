import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CacheService} from '../service/cache.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const reqClone = req.clone({
      // 请在测试时将af1c0c77-67d0-4ec2-8321-2f88e32f76af替换为后台发送的有效token
      setHeaders: {'auth-token': 'af1c0c77-67d0-4ec2-8321-2f88e32f76af'}
    });
    return next.handle(reqClone);
  }
}


