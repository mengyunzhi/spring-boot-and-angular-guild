import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddComponent} from './add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('Klass/AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule
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
  fit('测试C层向V层数据绑定', () => {
    expect(component).toBeTruthy();
    component.name.setValue('test');
    component.teacherId.setValue(1);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const debugElement: DebugElement = fixture.debugElement;
      const nameElement = debugElement.query(By.css('#name'));
      const nameInput: HTMLInputElement = nameElement.nativeElement;
      expect(nameInput.value).toBe('test');

      const teacherIdElement = debugElement.query(By.css('#teacherId'));
      const teacherIdInput: HTMLInputElement = teacherIdElement.nativeElement;
      expect(teacherIdInput.value).toBe('1');
    });
  });

  /**
   * 测试V层向C层绑定
   * 获取V层的元素，并设置元素的值
   * 断言在C层中获取到了元素的值
   */
  it('测试V层向C层绑定', () => {
    expect(component).toBeTruthy();
    fixture.whenStable().then(() => {
      const debugElement: DebugElement = fixture.debugElement;
      const nameElement = debugElement.query(By.css('#name'));
      const nameInput: HTMLInputElement = nameElement.nativeElement;
      nameInput.value = 'test2';
      nameInput.dispatchEvent(new Event('input'));
      expect(component.name.value).toBe('test2');

      const teacherIdElement = debugElement.query(By.css('#teacherId'));
      const teacherIdInput: HTMLInputElement = teacherIdElement.nativeElement;
      teacherIdInput.value = '2';
      teacherIdInput.dispatchEvent(new Event('input'));
      expect(component.teacherId.value).toBe(2);
    });
  });
});
