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
      });
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
