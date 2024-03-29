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

  /* 是否全部选中 */
  isCheckedAll = false;

  /*缓存要删除的学生*/
  cacheDeleteStudent: Student;

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
  showPopWindow = false;

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
   * 删除学生
   * @param student 学生
   */
  onDelete(student: Student): void {
    this.cacheDeleteStudent = student;
    this.showPopWindow = true;
  }

  /**
   * 删除缓存的学生后，隐藏弹窗
   */
  deleteCacheStudent() {
    const student = this.cacheDeleteStudent;
    this.studentService.deleteById(student.id)
      .subscribe(() => {
        this.pageStudent.content.forEach((value, key) => {
          if (value === student) {
            this.pageStudent.content.splice(key, 1);
          }
        });
      });
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
   * 全选框被用户点击时触发
   * @param $event checkBox弹射值
   */
  onCheckAllBoxChange($event: Event) {
    const checkbox = $event.target as HTMLInputElement;
    this.isCheckedAll = checkbox.checked;
    this.pageStudent.content.forEach((student) => {
      student.isChecked = checkbox.checked;
    });
  }

  /**
   * 单选框被用户点击时
   * @param $event 弹射值
   * @param student 当前学生
   */
  onCheckBoxChange($event: Event, student: Student) {
    const checkbox = $event.target as HTMLInputElement;
    student.isChecked = checkbox.checked;
    if (checkbox.checked) {
      let checkedAll = true;
      this.pageStudent.content.forEach((value) => {
        if (!value.isChecked) {
          checkedAll = false;
        }
      });
      this.isCheckedAll = checkedAll;
    } else {
      this.isCheckedAll = false;
    }
  }

  /**
   * 点击分页按钮
   * @param page 要请求的页码
   */
  onPage(page: number) {
    if (page < 0 || page >= this.pageStudent.totalPages) {
      return;
    }
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

  /**
   * 点击确认
   */
  confirm() {
    this.deleteCacheStudent();
    this.showPopWindow = false;
  }

  /**
   * 点击取消
   */
  cancel() {
    this.showPopWindow = false;
  }
}
