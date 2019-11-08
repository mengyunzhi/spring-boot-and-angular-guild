import {async, ComponentFixture, flush, TestBed} from '@angular/core/testing';

import {TeacherSelectComponent} from './teacher-select.component';
import {BrowserModule, By} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Teacher} from '../../norm/entity/Teacher';

describe('TeacherSelectComponent', () => {
  let component: TeacherSelectComponent;
  let fixture: ComponentFixture<TeacherSelectComponent>;
  const teachers = new Array(new Teacher(1, 'panjie', '潘杰'),
    new Teacher(2, 'zhangxishuo', '张喜硕'));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherSelectComponent],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*断言发请了后台请求，模拟返回数据后，断言V层的select个数为2*/
  fit('获取教师列表后选择教师', () => {
    expect(component).toBeTruthy();
    const httpTestingController: HttpTestingController = TestBed.get(HttpTestingController);
    const req = httpTestingController.expectOne('http://localhost:8080/Teacher');
    expect(req.request.method).toEqual('GET');
    req.flush(teachers);
    fixture.detectChanges();

    const htmlSelectElement: HTMLSelectElement = fixture.debugElement.query(By.css('#teacherSelect')).nativeElement;
    expect(htmlSelectElement.length).toBe(2);
    testOptionValue(htmlSelectElement);
  });

  /**
   * 断言option的值与teacher中name的相同
   * 循环teachers数组。断言与option的值一一相等
   * @param htmlSelectElement html元素
   */
  const testOptionValue = (htmlSelectElement: HTMLSelectElement) => {
    const htmlOptionElements: HTMLCollectionOf<HTMLOptionElement> = htmlSelectElement.options;
    for (let i = 0; i < teachers.length; i++) {
      const htmlOptionElement: HTMLOptionElement = htmlOptionElements.item(i);
      console.log(htmlOptionElement.text);
      expect(htmlOptionElement.text).toEqual(teachers[i].name);
    }
  };
});
