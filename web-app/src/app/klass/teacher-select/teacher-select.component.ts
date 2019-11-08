import {Component, OnInit} from '@angular/core';
import {Teacher} from '../../norm/entity/Teacher';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-teacher-select',
  templateUrl: './teacher-select.component.html',
  styleUrls: ['./teacher-select.component.sass']
})
export class TeacherSelectComponent implements OnInit {
  /*所有教师*/
  teachers: Array<Teacher>;

  teacherSelect: FormControl;

  constructor() {
  }

  /**
   * 获取所有的教师，并传给V层
   */
  ngOnInit() {
    this.teacherSelect = new FormControl();
    this.teachers = new Array(new Teacher(1, 'panjie', '潘杰'),
      new Teacher(2, 'zhangxishuo', '张喜硕'));
  }

}
