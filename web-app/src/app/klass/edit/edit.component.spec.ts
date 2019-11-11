import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {EditComponent} from './edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ActivatedRouteStub} from './activated-route-stub';
import {Klass} from '../../norm/entity/Klass';
import {Teacher} from '../../norm/entity/Teacher';
import {FormTest} from '../../testing/FormTest';
import SpyObj = jasmine.SpyObj;
import {Test} from 'tslint';
import {TeacherSelectComponent} from '../teacher-select/teacher-select.component';

describe('klass EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [EditComponent, TeacherSelectComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
        {provide: Router, useValue: routerSpy}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * 组件初始化
   * 发送路由参数
   * 断言发起了HTTP请求
   * 断言请求的方法为PUT
   */
  it('should create', () => {
    expect(component).toBeTruthy();
    let route: ActivatedRouteStub;
    route = TestBed.get(ActivatedRoute);
    route.subject.next({id: 1});
    testGetHttp(1);
  });

  /**
   * 测试组件发起的GET请求
   * 断言请求地址及方法
   * 返回数据后，断言input项成功绑定返回数据
   * @param id 请求的班级ID
   */
  const testGetHttp = (id: number) => {
    const httpTestingController: HttpTestingController = TestBed.get(HttpTestingController);
    const req = httpTestingController.expectOne(`http://localhost:8080/Klass/${id}`);
    expect(req.request.method).toEqual('GET');
    req.flush(new Klass(id, '测试编辑班级', new Teacher(1, null, null)));

    fixture.whenStable().then(() => {
      expect(FormTest.getInputValueByFixtureAndCss(fixture, '#name')).toEqual('测试编辑班级');
      onSubmitTest(1);
    });
  };

  /**
   * 数据更新测试，步骤：
   * 1. 设置路由参数
   * 2. 输入input的值
   * 3. 点击提交扭钮：断言向预期的地址以对应的方法提交了表单中的数据
   * 4. 断言跳转到''路由地址
   */
  const onSubmitTest = (id: number) => {
    FormTest.setInputValue(fixture, '#name', '测试更新班级');
    component.teacher = new Teacher(100, null, null, null);

    fixture.whenStable().then(() => {
      FormTest.clickButton(fixture, 'button');
      const httpTestController: HttpTestingController = TestBed.get(HttpTestingController);
      const req = httpTestController.expectOne(`http://localhost:8080/Klass/${id}`);
      expect(req.request.method).toEqual('PUT');
      const klass: Klass = req.request.body.valueOf();
      expect(klass.name).toEqual('测试更新班级');
      expect(klass.teacher.id).toEqual(100);

      const routerSpy: SpyObj<Router> = TestBed.get(Router);
      expect(routerSpy.navigateByUrl.calls.any()).toBe(false);
      req.flush(null, {status: 204, statusText: 'No Content'});
      expect(routerSpy.navigateByUrl.calls.any()).toBe(true);

      httpTestController.verify();
    });
  };

});

