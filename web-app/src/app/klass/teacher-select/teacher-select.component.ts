import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Teacher} from '../../norm/entity/Teacher';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-teacher-select',
  templateUrl: './teacher-select.component.html',
  styleUrls: ['./teacher-select.component.sass']
})
export class TeacherSelectComponent implements OnInit {
  /*所有教师*/
  teachers: Array<Teacher>;

  teacherSelect: FormControl;

  @Output() selected = new EventEmitter<Teacher>();
  @Input() teacher: { id: number };

  constructor(private httpClient: HttpClient) {
  }


  /**
   * 获取所有的教师，并传给V层
   */
  ngOnInit() {
    this.teacherSelect = new FormControl(this.teacher);
    const url = 'http://localhost:8080/Teacher';
    this.httpClient.get(url)
      .subscribe((teachers: Array<Teacher>) => {
        this.teachers = teachers;
      });
  }

  /**
   * 比较函数，标识用哪个字段来比较两个教师是否为同一个教师
   * @param t1 源
   * @param t2 目标
   */
  compareFn(t1: Teacher, t2: Teacher) {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }

  onChange() {
    this.selected.emit(this.teacherSelect.value);
  }
}
