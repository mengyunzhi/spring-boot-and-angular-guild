import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavComponent} from './nav.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormTest} from '../testing/FormTest';
import {TestModule} from '../test/test.module';
import {TeacherService} from '../service/teacher.service';
import {of} from 'rxjs';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [RouterTestingModule,
        TestModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('点击注销按钮', () => {
    spyOn(component, 'onLogout');
    FormTest.clickButton(fixture, 'form button');
    expect(component.onLogout).toHaveBeenCalled();

  });

  it('onLogout', () => {
    const service = TestBed.get(TeacherService) as TeacherService;
    spyOn(service, 'setIsLogin');
    spyOn(service, 'logout').and.returnValue(of(null));

    component.onLogout();
    expect(service.logout).toHaveBeenCalled();
    expect(service.setIsLogin).toHaveBeenCalledWith(false);
  });
});
