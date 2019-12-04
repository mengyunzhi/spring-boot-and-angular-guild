/**
 * 学生服务测试桩
 */
import {Observable, of} from 'rxjs';
import {Student} from '../norm/entity/student';
import {Klass} from '../norm/entity/Klass';

export class StudentStubService {

  constructor() {
  }


  /* 传入参数缓存 */
  pageParamsCache: { sno?: string, name?: string, klassId?: number, page?: number, size?: number };

  /**
   * page模拟方法
   * @param params 查询参数
   */
  page(params: { sno?: string, name?: string, klassId?: number, page?: number, size?: number })
    : Observable<{ totalPages: number, content: Array<Student> }> {
    this.pageParamsCache = params;
    const mockResult = {
      totalPages: 100,
      content: new Array<Student>(
        new Student({id: 1, name: 'testStudent', sno: 'testStudentSno', klass: new Klass(1, 'testKlass', null)}),
        new Student({id: 2, name: 'testStudent1', sno: 'testStudentSno1', klass: new Klass(2, 'testKlass1', null)}))
    };
    return of(mockResult);
  }
}
