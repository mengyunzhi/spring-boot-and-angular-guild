import {TestBed} from '@angular/core/testing';

import {CourseService} from './course.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Course} from '../norm/entity/course';

describe('CourseService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: CourseService = TestBed.get(CourseService);
    expect(service).toBeTruthy();
  });


  it('save', () => {
    const service: CourseService = TestBed.get(CourseService);
    const testController = TestBed.get(HttpTestingController) as HttpTestingController;

    // 调用save方法被接收返回数据
    const course = new Course();
    let result: Course;
    service.save(course).subscribe((data) => {
      result = data;
    });

    // 断言请求符合预期
    const request = testController.expectOne('http://localhost:8080/Course');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual(course);

    // 数据返回符合预期
    const returnCourse = new Course();
    request.flush(returnCourse);
    expect(returnCourse).toBe(result);
  });

  it('existsByName', () => {
    const service: CourseService = TestBed.get(CourseService);
    const name = 'test';
    let result;
    service.existsByName(name).subscribe((data) => {
      result = data;
    });

    const testController = TestBed.get(HttpTestingController) as HttpTestingController;
    const request = testController.expectOne(req => req.url === 'http://localhost:8080/Course/existsByName');
    expect(request.request.params.get('name')).toEqual('test');
    expect(request.request.method).toEqual('GET');
  });

});
