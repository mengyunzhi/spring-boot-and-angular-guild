import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IndexComponent} from './index.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Klass} from '../../norm/entity/Klass';
import {Teacher} from '../../norm/entity/Teacher';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';

describe('klass -> IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IndexComponent],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    httpTestingController = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const req = httpTestingController.expectOne('http://localhost:8080/Klass?name=');
    const klasses = [
      new Klass(1, '计科1901班', new Teacher(1, 'zhagnsan', '张三')),
      new Klass(2, '软件1902班', new Teacher(2, 'lisi', '李四'))
    ];
    req.flush(klasses);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const debugElement: DebugElement = fixture.debugElement;
      const tableElement = debugElement.query(By.css('table'));
      const nameInput: HTMLTableElement = tableElement.nativeElement;
      expect(nameInput.rows.length).toBe(3);
      expect(nameInput.rows.item(1).cells.item(1).innerText).toBe('计科1901班');
      expect(nameInput.rows.item(1).cells.item(2).innerText).toBe('张三');
    });
  });

  it('测试V层的交互操作', () => {
    component.params.name = 'test';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const debugElement: DebugElement = fixture.debugElement;
      const nameInputElement = debugElement.query(By.css('input[name="name"]'));
      const nameInput: HTMLInputElement = nameInputElement.nativeElement;
      expect(nameInput.value).toBe('test');
    });
  });

  it('测试V层向C层绑定', () => {
    expect(component).toBeTruthy();
    fixture.whenStable().then(() => {
      const debugElement: DebugElement = fixture.debugElement;
      const nameInputElement = debugElement.query(By.css('input[name="name"]'));
      const nameInput: HTMLInputElement = nameInputElement.nativeElement;
      nameInput.value = 'test1';
      nameInput.dispatchEvent(new Event('input'));
      expect(component.params.name).toBe('test1');
    });
  });

  it('测试查询按钮', () => {
    expect(component).toBeTruthy();
    const name = 'hello';
    component.params.name = name;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const queryButton: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
      queryButton.click();
      const req = httpTestingController.expectOne(`http://localhost:8080/Klass?name=${name}`);
      req.flush([
        new Klass(1, 'hello班', new Teacher(1, 'zhagnsan', '张三'))
      ]);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const debugElement: DebugElement = fixture.debugElement;
        const tableElement = debugElement.query(By.css('table'));
        const tableHtml: HTMLTableElement = tableElement.nativeElement;
        expect(tableHtml.rows.length).toBe(2);
      });
    });
  });

  /**
   * 模拟返回班级列表
   * 找到table中的第二行（第一行为表头）中的button元素
   * 点击button元素
   * 断言发起了预期的http请求
   */
  it('测试删除按钮', () => {
    const req = httpTestingController.expectOne('http://localhost:8080/Klass?name=');
    const klasses = [
      new Klass(100, '计科1901班', new Teacher(1, 'zhagnsan', '张三')),
    ];
    req.flush(klasses);
    fixture.detectChanges();

    const htmlButtonElement: HTMLButtonElement = fixture.debugElement.query(By.css('table tr td button:first-of-type')).nativeElement;
    expect(htmlButtonElement).toBeDefined();
    htmlButtonElement.click();
    const req1 = httpTestingController.expectOne('http://localhost:8080/Klass/100');
    expect(req1.request.method).toEqual('DELETE');
    req1.flush('', {status: 204, statusText: 'No Content'});

    /*重新获取table中数据，断言table只有表头*/
    fixture.detectChanges();
    const htmlTableElement: HTMLTableElement = fixture.debugElement.query(By.css('table')).nativeElement;
    expect(htmlTableElement.rows.length).toBe(1);

    httpTestingController.verify();
  });

});
