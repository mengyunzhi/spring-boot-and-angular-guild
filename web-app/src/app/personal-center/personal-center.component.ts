import {Component, OnInit} from '@angular/core';
import {Teacher} from '../norm/entity/Teacher';
import {TeacherService} from '../service/teacher.service';

@Component({
  selector: 'app-personal-center',
  templateUrl: './personal-center.component.html',
  styleUrls: ['./personal-center.component.sass']
})
export class PersonalCenterComponent implements OnInit {
  /** 绑定到V层 */
  public teacher: Teacher;
  constructor(private teacherService: TeacherService) {
    console.log('construct');
  }

  ngOnInit() {
    console.log('ngInit');
    // 调用M层的相关方法
    this.teacherService.me().subscribe((teacher) => {
      console.log('return teacher');
      this.teacher = teacher;
      console.log('set return teacher');
    });
    console.log('done');
  }
}
