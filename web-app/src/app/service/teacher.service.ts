import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 用户登录
   * @param username 用户名
   * @param password 密码
   * @return 登录成功:true; 登录失败: false。
   */
  login(username: string, password: string): Observable<boolean> {
    const url = 'http://localhost:8080/Teacher/login';
    return this.httpClient.post<boolean>(url, {username, password});
  }
}
