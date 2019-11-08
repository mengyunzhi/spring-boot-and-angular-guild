import {Component, OnInit} from '@angular/core';
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

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 获取所有的教师，并传给V层
   */
  ngOnInit() {
    this.teacherSelect = new FormControl();
    const url = 'http://localhost:8080/Teacher';
    this.httpClient.get(url)
      .subscribe((teachers: Array<Teacher>) => {
        this.teachers = teachers;
      });
  }

}
