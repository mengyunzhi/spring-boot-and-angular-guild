import {TestBed} from '@angular/core/testing';

import {StudentService} from './student.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Student} from '../norm/entity/student';
import {Klass} from '../norm/entity/Klass';
import {HttpRequest} from '@angular/common/http';

describe('service -> StudentService', () => {
  let service: StudentService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    service = TestBed.get(StudentService);
  });

  /* 分页测试 */
  fit('page', () => {
    /* 模拟返回数据 */
    const mockResult = {
      totalPages: 10,
      content: new Array(new Student({}), new Student({}))
    };

    /* 进行订阅，发送数据后将called置true */
    let called = false;
    service.page({}).subscribe((success: { totalPages: number, content: Array<Student> }) => {
      called = true;
      expect(success.totalPages).toEqual(10);
      expect(success.content.length).toBe(2);
    });

    /* 断言发起了http请求，方法为get；请求参数值符合预期 */
    const req = TestBed.get(HttpTestingController).expectOne((request: HttpRequest<any>) => {
      return request.url === 'http://localhost:8080/Student';
    });
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('name')).toEqual('');
    expect(req.request.params.get('sno')).toEqual('');
    expect(req.request.params.get('klassId')).toEqual('');
    expect(req.request.params.get('page')).toEqual('0');
    expect(req.request.params.get('size')).toEqual('10');

    req.flush(mockResult);
    expect(called).toBe(true);
  });


  /* 分页参数测试 */
  fit('page params test', () => {
    service.page({name: 'name', sno: 'sno', klassId: 1, page: 2, size: 20}).subscribe();
    /* 断言发起了http请求，方法为get；请求参数值符合预期 */
    const req = TestBed.get(HttpTestingController).expectOne(
      request => request.url === 'http://localhost:8080/Student'
    );
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('name')).toEqual('name');
    expect(req.request.params.get('sno')).toEqual('sno');
    expect(req.request.params.get('klassId')).toEqual('1');
    expect(req.request.params.get('page')).toEqual('2');
    expect(req.request.params.get('size')).toEqual('20');

    req.flush({});
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
