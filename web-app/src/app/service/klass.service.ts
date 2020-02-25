import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Klass} from '../norm/entity/Klass';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KlassService {
  private url = 'http://localhost:8080/Klass';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 获取所有班级
   */
  all(): Observable<Klass[]> {
    const httpParams = new HttpParams().append('name', '');
    return this.httpClient.get<Klass[]>(this.url, {params: httpParams});
  }
}
