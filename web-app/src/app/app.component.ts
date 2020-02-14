import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TeacherService} from './service/teacher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  isLogin = false;
  constructor(private route: Router,
              private teacherService: TeacherService) {
  }

  ngOnInit(): void {
    this.teacherService.isLogin$.subscribe(isLogin => this.isLogin = isLogin);
  }
}
