import {TestBed} from '@angular/core/testing';

import {StudentService} from './student.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Student} from '../norm/entity/student';
import {Klass} from '../norm/entity/Klass';
import {CanLoad} from '@angular/router';

fdescribe('service -> StudentService', () => {
  let service: StudentService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    service = TestBed.get(StudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


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
    req.flush(new Student({id: -1}));
    expect(called).toBe(true);
  });
});
