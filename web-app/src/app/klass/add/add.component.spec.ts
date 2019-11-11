import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddComponent} from './add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Klass} from '../../norm/entity/Klass';
import {TeacherSelectComponent} from '../teacher-select/teacher-select.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Teacher} from '../../norm/entity/Teacher';

describe('Klass/AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddComponent, TeacherSelectComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * 测试C层向V层数据绑定
   * 在C层中使用setValue方法对表单项赋值
   * 重新渲染V层后，使用CSS选择器来获取元素
   * 获取元素的值并断言
   */
  it('测试C层向V层数据绑定', () => {
    expect(component).toBeTruthy();
    component.name.setValue('test');
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const debugElement: DebugElement = fixture.debugElement;
      const nameElement = debugElement.query(By.css('#name'));
      const nameInput: HTMLInputElement = nameElement.nativeElement;
      expect(nameInput.value).toBe('test');
    });
  });

  /**
   * 测试V层向C层绑定
   * 获取V层的元素，并设置元素的值
   * 断言在C层中获取到了元素的值
   */
  it('测试V层向C层绑定', () => {
    expect(component).toBeTruthy();
    const debugElement: DebugElement = fixture.debugElement;
    const nameElement = debugElement.query(By.css('#name'));
    const nameInput: HTMLInputElement = nameElement.nativeElement;
    nameInput.value = 'test2';
    nameInput.dispatchEvent(new Event('input'));
    expect(component.name.value).toBe('test2');
  });

  /**
   * 设置表单数据
   * 点击按钮发起请求
   * 断言：请求地址、请求方法、发送的数据
   */
  it('保存按钮点击后，提交相应的http请求', () => {
    httpTestingController = TestBed.get(HttpTestingController);
    expect(component).toBeTruthy();
    component.name.setValue('test3');
    component.teacher = new Teacher(2, null, null, null);
    fixture.whenStable().then(() => {
      const debugElement: DebugElement = fixture.debugElement;
      const submitButtonElement = debugElement.query(By.css('button'));
      const submitButton: HTMLButtonElement = submitButtonElement.nativeElement;
      submitButton.click();

      const req = httpTestingController.expectOne('http://localhost:8080/Klass');
      expect(req.request.method).toEqual('POST');
      const klass: Klass = req.request.body.valueOf();
      expect(klass.name).toEqual('test3');
      expect(klass.teacher.id).toEqual(2);

      req.flush(null, {status: 201, statusText: 'Accepted'});
    });

  });
});
