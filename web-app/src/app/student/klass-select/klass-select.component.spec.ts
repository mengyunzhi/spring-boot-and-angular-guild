import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {KlassSelectComponent} from './klass-select.component';
import {CoreModule} from '../../core/core.module';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Klass} from '../../norm/entity/Klass';
import {By} from '@angular/platform-browser';

describe('student KlassSelectComponent', () => {
  let component: KlassSelectComponent;
  let fixture: ComponentFixture<KlassSelectComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KlassSelectComponent],
      imports: [CoreModule, HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlassSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * 1. 断言发请了请求
   * 2. 模拟返回数据
   * 3. 订阅弹出的班级
   * 4. 改变select的值
   * 5. 断言订阅的语句被成功的执行过了
   */
  it('should create', () => {
    expect(component).toBeTruthy();
    httpTestingController = TestBed.get(HttpTestingController);
    const req = httpTestingController.expectOne(component.url);
    req.flush(new Array(
      new Klass(1, '测试1', null),
      new Klass(2, '测试2', null)));
    fixture.detectChanges();

    let called = false;
    component.selected.subscribe((klass: Klass) => {
      expect(klass.id).toBe(1);
      called = true;
    });

    const htmlSelectElement: HTMLSelectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    htmlSelectElement.value = htmlSelectElement.options[0].value;
    htmlSelectElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(called).toBe(true);


  });
});
