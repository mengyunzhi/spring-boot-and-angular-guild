import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddComponent} from './add.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FormTest} from '../../testing/FormTest';

describe('student/AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let formTest: FormTest<AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddComponent],
      imports: [
        ReactiveFormsModule
      ]
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
    formTest.setInputValue('input[name="name"]', 'testname');
    formTest.setInputValue('input[name="sno"]', 'testno');
    formTest.clickButton('button[type="submit"]');
    fixture.detectChanges();
    expect(component.student.name).toEqual('testname');
    expect(component.student.sno).toEqual('testno');
  });
});
