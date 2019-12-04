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
        HttpClientTestingModule],
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
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('');
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
    expect(text).toContain(`第${component.params.page}/${component.pageStudent.totalPages}页`);
    expect(text).toContain(`每页${component.params.size}条`);
  });

  fit('分页 -> 首页样式测试', () => {
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

});
