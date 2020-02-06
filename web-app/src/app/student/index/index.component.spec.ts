import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IndexComponent} from './index.component';
import {KlassSelectComponent} from '../klass-select/klass-select.component';
import {CoreModule} from '../../core/core.module';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StudentService} from '../../service/student.service';
import {StudentStubService} from '../../service/student-stub.service';
import {By} from '@angular/platform-browser';
import {Klass} from '../../norm/entity/Klass';
import {FormTest} from '../../testing/FormTest';
import {RouterTestingModule} from '@angular/router/testing';
import {BehaviorSubject} from 'rxjs';

describe('Student -> IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IndexComponent, KlassSelectComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        CoreModule,
        HttpClientTestingModule,
        RouterTestingModule],
      providers: [
        {provide: StudentService, useClass: StudentStubService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('组件初始化发起请求测试', () => {
    /* 获取请求参数 */
    const studentService: StudentStubService = TestBed.get(StudentService);
    const queryParam = studentService.pageParamsCache;

    /* 断言传入的参数值与组件中的参数值相同 */
    expect(queryParam.name).toEqual(component.params.name.value);
    expect(queryParam.sno).toEqual(component.params.sno.value);
    expect(queryParam.klassId).toEqual(component.params.klass.id);
    expect(queryParam.page).toEqual(component.params.page);
    expect(queryParam.size).toEqual(component.params.size);
  });

  it('组件初始化V层渲染', () => {
    /* 获取table元素 */
    const tableElement = fixture.debugElement.query(By.css('table'));
    const table: HTMLTableElement = tableElement.nativeElement;

    /* 断言总行数及第一行的内容绑定符合预期 */
    const row = 1;
    let col = 0;
    expect(table.rows.length).toBe(3);
    expect(table.rows.item(row).cells.length).toBe(6);
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('1');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('testStudent');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('testStudentSno');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('testKlass');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('编辑删除');
  });

  it('选择班级组件', () => {
    /* 获取请求 */
    const httpTestingController = TestBed.get(HttpTestingController);
    const req: TestRequest = httpTestingController.expectOne('http://localhost:8080/Klass?name=');
    expect(req.request.method).toEqual('GET');

    /* 模拟返回值 */
    const mockResult = new Array<Klass>(
      new Klass(1, 'testKlass', null),
      new Klass(2, 'testKlass2', null)
    );
    req.flush(mockResult);
    fixture.detectChanges();

    /* 获取select元素 */
    const debugElement = fixture.debugElement.query(By.css('select'));
    const select: HTMLSelectElement = debugElement.nativeElement;

    /* 选中首个选项 */
    select.value = select.options[0].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    /* 断言选中的值传给了C层 */
    expect(component.params.klass).toEqual(mockResult[0]);
  });

  it('姓名、学号input输入测试', () => {
    /* 利用前期抽向出的表单测试类，对表单进行测试 */
    const formTest = new FormTest(fixture);
    expect(formTest.setInputValue('input[name="name"]', 'studentName')).toBe(true);
    expect(formTest.setInputValue('input[name="sno"]', 'studentSno')).toBe(true);
    fixture.detectChanges();

    /* 断言选中的值传给了C层 */
    expect(component.params.name.value).toEqual('studentName');
    expect(component.params.sno.value).toEqual('studentSno');
  });

  it('查询按钮点击测试', () => {
    spyOn(component, 'onQuery');

    /* 点击按钮 */
    const formTest = new FormTest(fixture);
    formTest.clickButton('button');
    expect(component.onQuery).toHaveBeenCalled();
    // expect(component.loadData).toHaveBeenCalled();
  });

  it('onQuery', () => {
    spyOn(component, 'loadData');

    component.onQuery();
    expect(component.loadData).toHaveBeenCalled();
  });

  it('当前页、总页数、每页大小', () => {
    /* 获取分页信息 */
    const debugElement = fixture.debugElement.query(By.css('#pageInfo'));
    const pageInfoDiv: HTMLDivElement = debugElement.nativeElement;
    const text = pageInfoDiv.textContent;
    console.log(text);

    /* 断言绑定了C层的分页值 */
    expect(text).toContain(`第${component.params.page + 1}/${component.pageStudent.totalPages}页`);
    expect(text).toContain(`第${component.params.page + 1}/${component.pageStudent.totalPages}页 每页${component.params.size}条`);
  });

  it('分页 -> 首页样式测试', () => {
    /* 获取首页按钮 */
    const debugElement = fixture.debugElement.query(By.css('ul.pagination > li:first-child'));
    const htmlliElement: HTMLLIElement = debugElement.nativeElement;
    console.log(htmlliElement);

    /* 当前页为首页，则添加禁用样式 */
    component.params.page = 0;
    fixture.detectChanges();
    expect(htmlliElement.classList.contains('disabled')).toBe(true);

    /* 当前页非首页，则移除禁用样式 */
    component.params.page = 1;
    fixture.detectChanges();
    expect(htmlliElement.classList.contains('disabled')).toBe(false);
  });

  it('分页 -> 点击首页测试', () => {
    spyOn(component, 'onPage');

    /* 获取首页按钮并点击 */
    const formTest = new FormTest(fixture);
    formTest.clickButton('ul.pagination > li:first-child');

    expect(component.onPage).toHaveBeenCalledWith(0);
  });

  it('onPage 功能测试', () => {
    spyOn(component, 'loadData');
    component.params.page = 4;
    component.onPage(3);
    expect(component.params.page).toEqual(3);
    expect(component.loadData).toHaveBeenCalled();

    /* 越界测试：期望不改变当前页码值，loadData仅被前面的代码调用了1次（本次未调用）*/
    component.onPage(-1);
    expect(component.params.page).toEqual(3);
    expect(component.loadData).toHaveBeenCalledTimes(1);

    /* 越界测试：期望不改变当前页码值，loadData仅被前面的代码调用了1次（本次未调用）*/
    component.pageStudent.totalPages = 5;
    component.onPage(5);
    expect(component.params.page).toEqual(3);
    expect(component.loadData).toHaveBeenCalledTimes(1);
  });

  it('上一页 样式测试', () => {
    /* 获取首页按钮 */
    const debugElement = fixture.debugElement.query(By.css('ul.pagination > li:nth-child(2)'));
    const htmlliElement: HTMLLIElement = debugElement.nativeElement;
    console.log(htmlliElement);

    /* 当前页为首页，则添加禁用样式 */
    component.params.page = 0;
    fixture.detectChanges();
    expect(htmlliElement.classList.contains('disabled')).toBe(true);

    /* 当前页非首页，则移除禁用样式 */
    component.params.page = 1;
    fixture.detectChanges();
    expect(htmlliElement.classList.contains('disabled')).toBe(false);
  });


  it('上一页 点击测试', () => {
    spyOn(component, 'onPage');

    component.params.page = 3;
    fixture.detectChanges();

    /* 获取上一页按钮并点击 */
    const formTest = new FormTest(fixture);
    formTest.clickButton('ul.pagination > li:nth-child(2)');

    expect(component.onPage).toHaveBeenCalledWith(2);
  });

  it('makePages', () => {
    /* 更好的做法是使用两个随机的数字进行测试 */
    const result = component.makePages(0, 4);
    expect(result.length).toEqual(5);

    /* 断言起始为0 */
    expect(result[0]).toEqual(0);

    /* 断言后一个元素比前一个元素大1 */
    for (let i = 0; i < 4; i++) {
      expect(result[i] + 1).toEqual(result[i + 1]);
    }
  });

  it('makePagesByTotalPages', () => {
    /* 总页数为0 */
    expect(component.makePagesByTotalPages(0, 0).length).toEqual(0);

    /* 总页数小于等于5 */
    expect(component.makePagesByTotalPages(2, 5).length).toEqual(5);
    expect(component.makePagesByTotalPages(2, 5)[0]).toEqual(0);

    /* 总页数大于5，首2页 */
    expect(component.makePagesByTotalPages(1, 10).length).toEqual(5);
    expect(component.makePagesByTotalPages(1, 10)[4]).toEqual(4);

    /* 总页数大于5，尾2页 */
    expect(component.makePagesByTotalPages(8, 10).length).toEqual(5);
    expect(component.makePagesByTotalPages(8, 10)[4]).toEqual(9);

    /* 总页数大于5， 中间页 */
    expect(component.makePagesByTotalPages(5, 10).length).toEqual(5);
    expect(component.makePagesByTotalPages(5, 10)[0]).toEqual(3);
  });

  it('loadData', () => {
    const mockResult = new Array<number>();
    spyOn(component, 'makePagesByTotalPages').and.returnValue(mockResult);
    component.loadData();
    expect(component.makePagesByTotalPages).toHaveBeenCalled();
    expect(component.pages).toBe(mockResult);
  });

  /**
   * V层分页测试BEFORE
   */
  const viewPageBefore = (): HTMLUListElement => {
    component.pages = new Array<number>(3, 4, 5, 6, 7);
    fixture.detectChanges();

    /* 获取分页 */
    const debugElement = fixture.debugElement.query(By.css('ul.pagination'));
    return HTMLUListElement = debugElement.nativeElement;
  };

  it('页码渲染个数', () => {
    const ulElement: HTMLUListElement = viewPageBefore();

    /* 断言分页个数 */
    console.log(ulElement.getElementsByTagName('li'));
    expect(ulElement.getElementsByTagName('li').length).toEqual(9);
  });

  it('测试页码号', () => {
    const ulElement: HTMLUListElement = viewPageBefore();
    const liElements: HTMLCollection = ulElement.getElementsByTagName('li');

    /* 依次获取第3 4 5 6 7页，断言对应的页码为4，5，6，7，8 */
    for (let i = 2; i < 7; i++) {
      console.log(liElements[i].textContent);
      expect(liElements[i].textContent).toContain((i + 2).toString());
    }
  });

  it('页码点击测试', () => {
    const ulElement: HTMLUListElement = viewPageBefore();
    const liElements: HTMLCollection = ulElement.getElementsByTagName('li');

    spyOn(component, 'onPage');

    for (let i = 2; i < 7; i++) {
      const htmlLiElement = liElements[i] as HTMLLIElement;
      htmlLiElement.click();
      expect(component.onPage).toHaveBeenCalledWith(i + 1);
    }
  });

  it('选中当前页测试', () => {
    component.params.page = 4;
    const ulElement: HTMLUListElement = viewPageBefore();
    const liElements: HTMLCollection = ulElement.getElementsByTagName('li');

    /* 断言只有ul元素下只有一个active子元素，且该子元素的位置符合预期 */
    expect(ulElement.getElementsByClassName('active').length).toBe(1);
    const htmlLiElement = liElements[3] as HTMLLIElement;
    expect(htmlLiElement.classList.contains('active')).toBe(true);

    /* 断言该li元素中存在class为sr-only的元素 */
    const elements = htmlLiElement.getElementsByClassName('sr-only');
    console.log(elements);
    expect(elements.length).toEqual(1);
    expect(elements[0].textContent).toContain('(current)');
  });

  it('点击下一页', () => {
    /* 获取分页元素 */
    const debugElement = fixture.debugElement.query(By.css('ul.pagination>li:nth-last-child(2)'));
    const liElement: HTMLLIElement = debugElement.nativeElement;
    expect(liElement.textContent).toContain('下一页');

    spyOn(component, 'onPage');
    const currentPage = component.params.page;
    liElement.click();
    expect(component.onPage).toHaveBeenCalledWith(currentPage + 1);
  });

  it('下一页(尾页）样式', () => {
    /* 定义两个选择器后缀 */
    const cssSelector = new Array<string>('nth-last-child(2)', 'last-of-type');

    /* 循环测试下一页及尾页 */
    cssSelector.forEach((value) => {
      /* 当前第3页，总共4页 */
      component.params.page = 2;
      component.pageStudent.totalPages = 4;
      fixture.detectChanges();

      /* 下一页（尾页）可点击 */
      const debugElement = fixture.debugElement.query(By.css(`ul.pagination>li:${value}`));
      const liElement: HTMLLIElement = debugElement.nativeElement;
      expect(liElement.classList.contains('disabled')).toBe(false);

      /* 总页数为3页，下一页（尾页)不可点击 */
      component.pageStudent.totalPages = 3;
      fixture.detectChanges();
      expect(liElement.classList.contains('disabled')).toBe(true);
    });
  });

  it('点击尾页', () => {
    /* 获取分页元素 */
    const debugElement = fixture.debugElement.query(By.css('ul.pagination>li:last-of-type'));
    const liElement: HTMLLIElement = debugElement.nativeElement;
    expect(liElement.textContent).toContain('尾页');

    spyOn(component, 'onPage');
    liElement.click();
    expect(component.onPage).toHaveBeenCalledWith(component.pageStudent.totalPages - 1);
  });


  it('单选', () => {
    const trDebugElement = fixture.debugElement.query(By.css(`table tr:nth-child(2)`));
    const checkBoxDebugElement = trDebugElement.query(By.css('input[type=checkBox]'));
    const checkBoxElement: HTMLInputElement = checkBoxDebugElement.nativeElement;
    console.log(checkBoxElement);
    console.log(checkBoxElement.checked);
    expect(checkBoxElement.checked).toBe(false);

    /* 设置第一个学生的isCheck为true，并重新渲染V层 */
    component.pageStudent.content[0].isChecked = true;
    fixture.detectChanges();

    /* 断言checkBox的值为true */
    expect(checkBoxElement.checked).toEqual(true);
  });

  it('单选点击后绑定到C层', () => {
    const trDebugElement = fixture.debugElement.query(By.css(`table tr:nth-child(2)`));
    const checkBoxDebugElement = trDebugElement.query(By.css('input[type=checkBox]'));
    const checkBoxElement: HTMLInputElement = checkBoxDebugElement.nativeElement;
    expect(checkBoxElement.checked).toBe(false);

    /* 点击第一个学生对应的checkBox，断言checkBox的值是true，同时对应学生的相应字段值为true */
    checkBoxElement.click();
    expect(checkBoxElement.checked).toBeTruthy();
    expect(component.pageStudent.content[0].isChecked).toBeTruthy();
  });

  it('多选C->V', () => {
    /* 获取到 全选 并断言其状态为：未选中 */
    const trDebugElement = fixture.debugElement.query(By.css(`table tr:nth-child(1)`));
    const checkBoxDebugElement = trDebugElement.query(By.css('input[type=checkBox]'));
    const checkBoxElement: HTMLInputElement = checkBoxDebugElement.nativeElement;
    expect(component.isCheckedAll).toBeFalsy();
    expect(checkBoxElement.checked).toBe(false);

    /* 改变C层的值，断言绑定生效 */
    component.isCheckedAll = true;
    fixture.detectChanges();
    expect(component.isCheckedAll).toBeTruthy();
  });

  it('多选V->C', () => {
    /* 获取到 全选 并断言其状态为：未选中 */
    const trDebugElement = fixture.debugElement.query(By.css(`table tr:nth-child(1)`));
    const checkBoxDebugElement = trDebugElement.query(By.css('input[type=checkBox]'));
    const checkBoxElement: HTMLInputElement = checkBoxDebugElement.nativeElement;
    expect(component.isCheckedAll).toBeFalsy();

    /* 第一次点击 false -> true */
    checkBoxElement.click();
    expect(component.isCheckedAll).toBeTruthy();
    component.pageStudent.content
      .forEach((student) => {
        expect(student.isChecked).toBeTruthy();
      });

    /* 再次点击 true -> false */
    checkBoxElement.click();
    expect(component.isCheckedAll).toBeFalsy();
    component.pageStudent.content
      .forEach((student) => {
        expect(student.isChecked).toBeFalsy();
      });
  });

  it('点击单选对多选值的影响', () => {
    for (let i = 2; i <= 3; i++) {
      /* 依次点击2个student的单选 */
      const trDebugElement = fixture.debugElement.query(By.css(`table tr:nth-child(${i})`));
      const checkBoxDebugElement = trDebugElement.query(By.css('input[type=checkBox]'));
      const checkBoxElement: HTMLInputElement = checkBoxDebugElement.nativeElement;
      checkBoxElement.click();

      /* 按是否为最后一个学生进行不同的断言 */
      if (i === 3) {
        expect(component.isCheckedAll).toBeTruthy();
        checkBoxElement.click();
        expect(component.isCheckedAll).toBeFalsy();
      } else {
        expect(component.isCheckedAll).toBeFalsy();
      }
    }
  });

  it('删除按钮点击测试', () => {
    // 将C层的onDelete方法设置为替身
    spyOn(component, 'onDelete');

    // 点击第一行的删除按钮
    FormTest.clickButton(fixture, '#root1 > table > tr:nth-child(2) > td:nth-child(6) > button');

    // 断言onDelete替身被成功调用
    expect(component.onDelete).toHaveBeenCalledWith(component.pageStudent.content[0]);
  });

  it('onDelete -> 取消删除', () => {
    // 替身及模似数据的准备
    const studentService: StudentService = TestBed.get(StudentService);
    spyOn(studentService, 'deleteById');
    spyOn(window, 'confirm').and.returnValue(false);

    // 调用方法
    component.onDelete(null);

    // 断言
    expect(studentService.deleteById).toHaveBeenCalledTimes(0);
  });

  fit('onDelete -> 确认删除', () => {
    // 替身及模似数据的准备
    const studentService = TestBed.get(StudentService);
    const subject = new BehaviorSubject<void>(undefined);
    spyOn(studentService, 'deleteById').and.returnValue(subject);
    spyOn(window, 'confirm').and.returnValue(true);

    // 调用方法，删除第一个学生
    const student = component.pageStudent.content[0];
    component.onDelete(student);

    // 断言
    expect(studentService.deleteById).toHaveBeenCalledWith(student.id);
    // 断言删除的学生成功的由前台移除
    let found = false;
    component.pageStudent.content.forEach(value => {
      if (value === student) {
        found = true;
      }
    });
    expect(found).toBeFalsy();
  });

});
