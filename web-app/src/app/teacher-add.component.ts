import {Component, OnInit} from '@angular/core';

/**
 * 教师添加组件
 */
@Component({
  selector: 'app-teacher-add',
  templateUrl: './teacher-add.component.html'
})
export class TeacherAddComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  sex: boolean;
  ngOnInit(): void {
  }
}
