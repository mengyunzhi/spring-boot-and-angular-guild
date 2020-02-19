import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Teacher} from '../norm/entity/Teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  /** 数据源 */
  private isLogin: BehaviorSubject<boolean>;

  /** 数据源对应的订阅服务 */
  public isLogin$: Observable<boolean>;
  private isLoginCacheKey = 'isLogin';
  constructor(private httpClient: HttpClient) {
    const isLogin: string = window.sessionStorage.getItem(this.isLoginCacheKey);
    this.isLogin = new BehaviorSubject(this.convertStringToBoolean(isLogin));
    this.isLogin$ = this.isLogin.asObservable();
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
    window.sessionStorage.setItem(this.isLoginCacheKey, this.convertBooleanToString(isLogin));
    this.isLogin.next(isLogin);
  }

  /**
   * 字符串转换为boolean
   * @param value 字符串
   * @return 1 true; 其它 false
   */
  convertStringToBoolean(value: string) {
    return value === '1';
  }

  /**
   * boolean转string
   * @param value boolean
   * @return '1' true; '0' false;
   */
  convertBooleanToString(value: boolean) {
    return value ? '1' : '0';
  }

  /**
   * 获取当前登录的教师
   */
  me(): Observable<Teacher> {
    const url = 'http://localhost:8080/Teacher/me';
    return this.httpClient.get<Teacher>(url);
  }
}
