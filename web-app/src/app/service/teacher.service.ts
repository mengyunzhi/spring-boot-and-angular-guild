import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  /** 数据源 */
  private isLogin = new BehaviorSubject<boolean>(false);

  /** 数据源对应的订阅服务 */
  public isLogin$ = this.isLogin.asObservable();

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

  /**
   * 设置登录状态
   * @param isLogin 登录状态
   */
  setIsLogin(isLogin: boolean) {
    this.isLogin.next(isLogin);
  }
}
