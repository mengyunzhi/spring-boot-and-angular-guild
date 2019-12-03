import {Injectable} from '@angular/core';
import {Student} from '../norm/entity/student';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Klass} from '../norm/entity/Klass';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 分页
   * @param params name:名称,sno:学号,klassId:班级ID,page:第几页,size:每页大小
   */
  page(params: { name?: string, sno?: string, klassId?: number, page?: number, size?: number}):
    Observable<{ totalPages: number, content: Array<Student> }> {
    return null;
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
