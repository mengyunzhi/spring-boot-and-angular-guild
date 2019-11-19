import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddComponent} from './add.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FormTest} from '../../testing/FormTest';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Student} from '../../norm/entity/student';
import {Klass} from '../../norm/entity/Klass';
import {KlassSelectComponent} from '../klass-select/klass-select.component';
import {CoreModule} from '../../core/core.module';

describe('student/AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let formTest: FormTest<AddComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddComponent, KlassSelectComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        CoreModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    formTest = new FormTest(fixture);
  });

  /**
   * 1. 向表单中输入值
   * 2. 点击保存按钮
   * 3. 断言输入的值传入到了C层
   */
  it('should create', () => {
    expect(component).toBeTruthy();
    component.klass = new Klass(-1, null, null);
    formTest.setInputValue('input[name="name"]', 'testname');
    formTest.setInputValue('input[name="sno"]', 'testno');
    formTest.clickButton('button[type="submit"]');
    fixture.detectChanges();
    expect(component.student.name).toEqual('testname');
    expect(component.student.sno).toEqual('testno');

    savePostTest();
  });

  /**
   * 断言发起了相关请求
   * 断言在请求的中接收到了对应的值
   */
  const savePostTest = (): void => {
    const httpTestingController: HttpTestingController = TestBed.get(HttpTestingController);
    const req = httpTestingController.expectOne('http://localhost:8080/Student');
    expect(req.request.method).toEqual('POST');
    const student: Student = req.request.body.valueOf();
    expect(student.name).toEqual('testname');
    expect(student.sno).toEqual('testno');
    expect(student.klass.id).toEqual(-1);
  };


});
