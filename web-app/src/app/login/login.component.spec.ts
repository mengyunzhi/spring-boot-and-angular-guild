import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {FormTest} from '../testing/FormTest';
import {ReactiveFormsModule} from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('表单绑定', () => {
    // 设置C层的值后重新渲染V层
    component.formGroup.get('username').setValue('testUsername');
    component.formGroup.get('password').setValue('testPassword');
    fixture.detectChanges();

    // 获取V层的值
    const usernameValue = FormTest.getInputValueByFixtureAndCss(fixture, '#username');
    const passwordValue = FormTest.getInputValueByFixtureAndCss(fixture, '#password');

    // 断言CV两层的值相等
    expect(usernameValue).toEqual('testUsername');
    expect(passwordValue).toEqual('testPassword');
  });

  fit('点击提交按钮', () => {
    spyOn(component, 'onSubmit');
    FormTest.clickButton(fixture, 'button');

    expect(component.onSubmit).toHaveBeenCalled();
  });
});
