import {Injectable} from '@angular/core';
import {Student} from '../norm/entity/student';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';

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
  page(params: { name?: string, sno?: string, klassId?: number, page?: number, size?: number }):
    Observable<{ totalPages: number, content: Array<Student> }> {
    const url = 'http://localhost:8080/Student';

    /* 设置默认值 */
    if (params.page === undefined) {
      params.page = 0;
    }
    if (params.size === undefined) {
      params.size = 10;
    }

    /* 初始化查询参数 */
    const queryParams = new HttpParams()
      .set('name', params.name ? params.name : '')
      .set('sno', params.sno ? params.sno : '')
      .set('klassId', params.klassId ? params.klassId.toString() : '')
      .set('page', params.page.toString())
      .set('size', params.size.toString());
    console.log(queryParams);

    return this.httpClient.get<{ totalPages: number, content: Array<Student> }>(url, {params: queryParams});
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


  /**
   * 获取某个学生
   * @param id 学生ID
   */
  getById(id: number): Observable<Student> {
    const url = `http://localhost:8080/Student/${id}`;
    return this.httpClient.get<Student>(url);
  }

  /**
   * 更新学生
   * @param id id
   * @param student 学生
   */
  update(id: number, student: Student): Observable<Student> {
    const url = `http://localhost:8080/Student/${id}`;
    return this.httpClient.put<Student>(url, student);
  }

  /**
   * 删除学生
   * @param id 学生id
   */
  deleteById(id: number): Observable<void> {
    return null;
  }
}
