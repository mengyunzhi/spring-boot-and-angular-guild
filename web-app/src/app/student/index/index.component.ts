import {Component, OnInit} from '@angular/core';
import {Student} from '../../norm/entity/student';
import {Klass} from '../../norm/entity/Klass';
import {FormControl} from '@angular/forms';
import {StudentService} from '../../service/student.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {
  /* 分页数据 */
  pages: Array<number>;

  /* 查询参数 */
  params = {
    page: 0,
    size: 2,
    klass: new Klass(null, null, null),
    name: new FormControl(),
    sno: new FormControl()
  };

  /* 分页数据 */
  pageStudent = {
    totalPages: 0,
    content: new Array<Student>()
  };

  constructor(private studentService: StudentService) {
    console.log(studentService);
  }

  /**
   * 生成分页数据
   * @param currentPage 当前页
   * @param totalPages 总页数
   */
  makePagesByTotalPages(currentPage: number, totalPages: number): Array<number> {
    if (totalPages > 0) {
      /* 总页数小于5 */
      if (totalPages <= 5) {
        return this.makePages(0, totalPages - 1);
      }

      /* 首2页 */
      if (currentPage < 2) {
        return this.makePages(0, 4);
      }

      /* 尾2页 */
      if (currentPage > totalPages - 3) {
        return this.makePages(totalPages - 5, totalPages - 1);
      }

      /* 总页数大于5，且为中间页码*/
      return this.makePages(currentPage - 2, currentPage + 2);
    }

    return new Array();
  }

  /**
   * 加载数据
   */
  loadData() {
    const queryParams = {
      page: this.params.page,
      size: this.params.size,
      klassId: this.params.klass.id,
      name: this.params.name.value,
      sno: this.params.sno.value
    };

    this.studentService.page(queryParams)
      .subscribe((response: { totalPages: number, content: Array<Student> }) => {
        this.pageStudent = response;
        this.pages = this.makePagesByTotalPages(this.params.page, response.totalPages);
      });
  }

  /**
   * 生成页码
   * @param begin 开始页码
   * @param end 结束页码
   */
  makePages(begin: number, end: number): Array<number> {
    const result = new Array<number>();
    for (; begin <= end; begin++) {
      result.push(begin);
    }
    return result;
  }

  ngOnInit() {
    this.loadData();
  }

  /**
   * 点击分页按钮
   * @param page 要请求的页码
   */
  onPage(page: number) {
    this.params.page = page;
    this.loadData();
  }

  /* 查询 */
  onQuery() {
    this.loadData();
  }

  /* 选择班级 */
  onSelectKlass(klass: Klass) {
    this.params.klass = klass;
  }
}
