import {TestBed} from '@angular/core/testing';

import {StudentService} from './student.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Student} from '../norm/entity/student';
import {Klass} from '../norm/entity/Klass';

fdescribe('service -> StudentService', () => {
  let service: StudentService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    service = TestBed.get(StudentService);
  });

  /* 分页测试 */
  it('page', () => {
    expect(service).toBeTruthy();
  });


  /**
   * 测试新增
   * 1. 初始化测试数据
   * 2. 调用保存方法并进行订阅
   * 2.1 断言响应中返回了学生ID信息
   * 3. 断言发起了HTTP POST请
   * 4. 断言请求数据
   * 5. 模拟HTTP响应数据
   * 6. 断言订阅的方法被调用
   */
  it('save', () => {
    const student: Student = new Student(
      {
        name: 'test',
        klass: new Klass(1, null, null)
      });

    let called = false;
    service.save(student).subscribe((returnStudent: Student) => {
      called = true;
      expect(returnStudent.id).toBe(-1);
    });

    const httpTestingController: HttpTestingController = TestBed.get(HttpTestingController);
    const req = httpTestingController.expectOne('http://localhost:8080/Student');
    expect(req.request.method).toEqual('POST');

    const studentBody: Student = req.request.body.valueOf();
    expect(studentBody.name).toEqual(student.name);
    expect(studentBody.klass.id).toEqual(student.klass.id);

    req.flush(new Student({id: -1}));

    expect(called).toBe(true);
  });
});
