import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {MultipleSelectComponent} from './multiple-select.component';
import {Subject} from 'rxjs';
import {Course} from '../../norm/entity/course';
import {By} from '@angular/platform-browser';

describe('MultipleSelectComponent', () => {
  let component: MultipleSelectComponent;
  let fixture: ComponentFixture<MultipleSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultipleSelectComponent],
      imports: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('数据绑定测试', () => {
    const subject = new Subject<Course[]>();
    component.list$ = subject.asObservable();
    // 由于V层直接使用了异步async管道绑定的观察者
    // 所以在给C层对list$赋值后
    // 使用detectChanges将此值传送给V层
    fixture.detectChanges();

    // 当V层成功的绑定到数据源后，使用以下代码发送数据，才能够被V层接收到
    subject.next([new Course({id: 1, name: 'test1'}),
      new Course({id: 2, name: 'test2'})]);
    fixture.detectChanges();

    // 断言生成了两个label
    const div = fixture.debugElement.query(By.css('div'));
    expect(div.children.length).toBe(2);
  });

  it('点选测试', () => {
    // 准备观察者
    const subject = new Subject<Course[]>();
    component.list$ = subject.asObservable();
    fixture.detectChanges();

    // 发送数据
    const course = new Course({id: 1, name: 'test1'});
    subject.next([course]);
    fixture.detectChanges();

    // 获取checkbox并点击断言
    const checkBox: HTMLInputElement = fixture.debugElement.query(By.css('input[type="checkbox"]')).nativeElement as HTMLInputElement;
    spyOn(component, 'onChange');
    checkBox.click();
    expect(component.onChange).toHaveBeenCalledWith(course);
  });

  it('onChange -> 选中', () => {
    expect(component.selectedObjects.length).toBe(0);
    const course = new Course();
    component.onChange(course);
    expect(component.selectedObjects.length).toBe(1);
    expect(component.selectedObjects[0]).toBe(course);
  });

  it('onChange -> 取消选中', () => {
    const course = new Course();
    component.selectedObjects.push(course);
    expect(component.selectedObjects.length).toBe(1);
    component.onChange(course);
    expect(component.selectedObjects.length).toBe(0);
  });

  it('onChange -> 弹射数据', () => {
    let result: Array<any>;
    component.changed.subscribe((data) => {
      result = data;
    });

    const course = new Course();
    component.onChange(course);
    expect(result[0]).toBe(course);
  });

});
