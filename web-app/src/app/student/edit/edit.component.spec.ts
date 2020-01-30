import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditComponent} from './edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {KlassSelectComponent} from '../klass-select/klass-select.component';
import {ActivatedRoute} from '@angular/router';
import {ActivatedRouteStub} from '../../klass/edit/activated-route-stub';
import {StudentService} from '../../service/student.service';
import SpyObj = jasmine.SpyObj;
import {Student} from '../../norm/entity/student';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';

@Component({
  selector: 'app-klass-select',
  template: '',
})
// tslint:disable:component-class-suffix
class KlassSelectComponentStub extends KlassSelectComponent implements OnInit {
  ngOnInit(): void {
  }
}

describe('student -> EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async(() => {
    const studentServiceSpy: SpyObj<StudentService> = jasmine.createSpyObj<StudentService>(['getById', 'update']);
    TestBed.configureTestingModule({
      declarations: [EditComponent, KlassSelectComponentStub],
      imports: [
        ReactiveFormsModule,
      ],
      providers: [
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
        {provide: StudentService, useValue: studentServiceSpy}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('通过路由获取要编辑的学生ID', () => {
    expect(component.student.id).toBeUndefined();
    spyOn(component, 'loadStudentById');

    const activatedRoute: ActivatedRouteStub = TestBed.get(ActivatedRoute);
    const id = Math.floor(Math.random() * 100);
    activatedRoute.subject.next({id});

    expect(component.student.id).toBe(id);
    expect(component.loadStudentById).toHaveBeenCalledWith(id);
  });

  it('通过学生ID调用M层来获取要编辑的学生信息 loadStudentById', () => {
    console.log('测试准备');
    spyOn(component, 'setFormGroupValue');
    const studentServiceSpy: SpyObj<StudentService> = TestBed.get(StudentService);
    const id = Math.floor(Math.random() * 100);
    const mockResultStudent = new Student();
    studentServiceSpy.getById.and.returnValue(of(mockResultStudent));

    console.log('调用方法。并断言参数传值正确，接收返回值正确');
    component.loadStudentById(id);
    expect(studentServiceSpy.getById).toHaveBeenCalledWith(id);
    expect(component.student).toBe(mockResultStudent);
    expect(component.setFormGroupValue).toHaveBeenCalledWith(mockResultStudent);
  });

  it('C层向V层绑定表单是否成功 setFormGroupValue', () => {
    console.log('数据准备及方法调用');
    const student = new Student();
    student.name = Math.random().toString(36).slice(-10);
    student.sno = Math.floor(Math.random() * 100).toString();
    component.setFormGroupValue(student);

    console.log('重新渲染V层，获取表单的值并进行断言');
    fixture.detectChanges();
    const nameInput: HTMLInputElement = fixture.debugElement.query(By.css('input[name="name"]')).nativeElement;
    expect(nameInput.value).toEqual(student.name);
    const snoInput: HTMLInputElement = fixture.debugElement.query(By.css('input[name="sno"]')).nativeElement;
    expect(snoInput.value).toEqual(student.sno);
  });

  it('点击保存按钮', () => {
    spyOn(component, 'onSubmit');
    const button: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('onSubmit', () => {
    // 设置formGroup的值
    const name = Math.random().toString(36).slice(-10);
    const sno = Math.random().toString(36).slice(-10);
    component.formGroup.get('name').setValue(name);
    component.formGroup.get('sno').setValue(sno);

    // 设置班级选择组件的值
    // todo: 在官方文档中暂未找到相应的示例代码

    // 调用onSubmit方法
    component.onSubmit();

    // 断言已使用formGroup及班级选择组件的值更新了学生信息
    expect(component.student.name).toBe(name);
    expect(component.student.sno).toBe(sno);
    // expect(component.student.klass).toBe(null); todo: 原则上这里要测试发射值

    // 断言调用 向M层传入更新的学生ID及更新的学生信息 方法
  });

  it('向M层传入更新的学生ID及更新的学生信息', () => {
    // 在M层对应的方法上建立间谍 （见foreach)
    // 为间谍准备返回值
    const studentService: SpyObj<StudentService> = TestBed.get(StudentService);
    const student = new Student();
    studentService.update.and.returnValue(of(student));

    // 方法调用
    const student1 = new Student();
    student1.id = Math.floor(Math.random() * 100);
    component.update(student1);

    // 断言间谍调用成功，间谍接收参数符合预期
    expect(studentService.update).toHaveBeenCalledWith(student1.id, student1);

    // 断言接收返回值符合预期
    expect(component.student).toBe(student);
  });
});
