import {Component, OnInit} from '@angular/core';
import {Student} from '../../norm/entity/student';
import {Klass} from '../../norm/entity/Klass';
import {FormControl, FormGroup} from '@angular/forms';
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
    klass: Klass,
    name: new FormControl(),
    sno: new FormControl()
  };

  /* 分页数据 */
  pageStudent = {
    totalPages: 0,
    content: new Array<Student>()
  };

  constructor(private studentService: StudentService) {
  }

  ngOnInit() {
    this.pageStudent.totalPages = 2;
    this.pageStudent.content.push(
      new Student(
        {
          id: 1,
          name: 'testNName',
          sno: 'testSno',
          klass: new Klass(1, 'testKlass', null)
        }));
  }

  /* 查询 */
  onQuery() {
    console.log('query');
  }
}
