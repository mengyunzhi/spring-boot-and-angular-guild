import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditComponent} from './edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ActivatedRouteStub} from './activated-route-stub';
import {Klass} from '../../norm/entity/Klass';
import {Teacher} from '../../norm/entity/Teacher';
import {FormTest} from '../../testing/FormTest';

describe('klass EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
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
  fit('should create', () => {
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
      expect(FormTest.getInputValueByFixtureAndCss(fixture, '#teacherId')).toEqual('1');
    });
  };

  /**
   * 测试数据提交
   * @param id 请求的班级ID
   */
  const testSubmit = (id: number) => {

  };


});

