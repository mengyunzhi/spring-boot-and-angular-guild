import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddComponent} from './add.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TestModule} from '../../test/test.module';
import {FormTest} from '../../testing/FormTest';
import {By} from '@angular/platform-browser';
import {TeacherSelectService} from '../../test/component/teacher-select/teacher-select.service';
import {Teacher} from '../../norm/entity/Teacher';
import {Klass} from '../../norm/entity/Klass';
import {CourseTestingModule} from '../course-testing/course-testing.module';
import {CourseTestingController} from '../course-testing/course-testing-controller';
import {KlassMultipleSelectComponent} from '../klass-multiple-select/klass-multiple-select.component';
import {CourseService} from '../../service/course.service';
import {CourseStubService} from '../../service/course-stub.service';
import {Course} from '../../norm/entity/course';
import {of} from 'rxjs';


describe('course -> AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddComponent],
      imports: [
        ReactiveFormsModule,
        TestModule,
        CourseTestingModule
      ],
      providers: [
        {provide: CourseService, useClass: CourseStubService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('requried校验', () => {
    // 初次渲染页面时，不显示校验信息
    expect(fixture.debugElement.query(By.css('#nameRequired'))).toBeNull();

    // 输入了长度为1的名称，显示校验信息
    const formTest: FormTest<AddComponent> = new FormTest(fixture);
    formTest.setInputValue('#name', '1');
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#nameRequired'))).toBeNull();

    // 删除输入，显示required
    formTest.setInputValue('#name', '');
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#nameRequired'))).toBeDefined();
  });

  it('minLength校验', () => {
    // 输入长度小于2的，显示
    const formTest: FormTest<AddComponent> = new FormTest(fixture);
    formTest.setInputValue('#name', '1');
    expect(fixture.debugElement.query(By.css('#nameMixLength'))).toBeDefined();
  });

  it('button校验', () => {
    // 初始化时，不能点击
    let button: HTMLButtonElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(button.disabled).toBeTruthy();

    // 输入合格的内容后可点击
    component.formGroup.get('name').setValue('1234');
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(button.disabled).toBeFalsy();
  });

  it('点击保存按钮', () => {
    component.formGroup.get('name').setValue('1234');
    fixture.detectChanges();

    spyOn(component, 'onSubmit');
    FormTest.clickButton(fixture, 'button[type="submit"]');
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('嵌入TeacherSelect组件测试', () => {
    // 获取组件替身的专用服务
    const teacherSelectService: TeacherSelectService = TestBed.get(TeacherSelectService);
    const teacher = new Teacher(null, null, null);

    // 服务弹出teacher，断言组件接收到teacher
    teacherSelectService.selected.emit(teacher);
    expect(component.course.teacher).toBe(teacher);
  });

  it('嵌入KlassMultipleSelect组件测试', () => {
    const courseTestController: CourseTestingController
      = TestBed.get(CourseTestingController);
    const klassMultipleSelectComponent: KlassMultipleSelectComponent
      = courseTestController.get(KlassMultipleSelectComponent);
    spyOn(component, 'onKlassesChange');
    const klasses = [new Klass(null, null, null)];
    klassMultipleSelectComponent.changed.emit(klasses);
    expect(component.onKlassesChange).toHaveBeenCalledWith(klasses);
  });

  /**
   * 在beforeEach的组件初始化代码中。
   * 当fixture.detectChanges();被首次执行时，会自动执行一次ngOnInit方法
   */
  it('ngOnInit', () => {
    expect(component.formGroup).toBeDefined();
    expect(component.course).toBeDefined();
  });

  it('onTeacherSelect', () => {
    const teacher = new Teacher(null, null, null);
    component.onTeacherSelect(teacher);
    expect(component.course.teacher).toBe(teacher);
  });

  it('onKlassesChange', () => {
    const klasses = [new Klass(null, null, null)];
    component.onKlassesChange(klasses);
    expect(component.course.klasses).toBe(klasses);
  });

  it('onSubmit', () => {
    component.formGroup.get('name').setValue('test');
    const course = new Course();
    component.course = course;
    const courseService: CourseService = TestBed.get(CourseService);

    const returnCourse = new Course();
    spyOn(courseService, 'save').and.returnValue(of(returnCourse));
    spyOn(console, 'log');

    component.onSubmit();

    expect(courseService.save).toHaveBeenCalledWith(course);
    expect(console.log).toHaveBeenCalledWith(returnCourse);
    expect(course.name).toEqual('test');
  });
});
