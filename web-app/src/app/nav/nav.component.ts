import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {
  /*标题*/
  title: string;
  /*菜单项*/
  menus = new Array<{ url: string; name: string }>();

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.title = '教务管理系统';
    this.menus.push({url: 'teacher', name: '教师管理'});
    this.menus.push({url: 'klass', name: '班级管理'});
    this.menus.push({url: 'student', name: '学生管理'});
  }

}
