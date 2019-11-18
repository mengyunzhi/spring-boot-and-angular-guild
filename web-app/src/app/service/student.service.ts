import {Injectable} from '@angular/core';
import {Student} from '../norm/entity/student';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 保存学生
   * 直接调用HttpClient post方法
   * @param student 学生
   * @return 此返回值是个可观察对象：
   * 1. 其它人可以通过 订阅 操作来获取该对象后续发送的值。
   * 2. 该对象如果发送值，那么该值的类型必然是Student。
   */
  save(student: Student): Observable<Student> {
    const url = 'http://localhost:8080/Student';
    return this.httpClient.post<Student>(url, student);
  }
}
