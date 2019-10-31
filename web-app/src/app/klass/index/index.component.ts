import {Component, OnInit} from '@angular/core';
import {Klass} from '../../norm/entity/Klass';
import {Teacher} from '../../norm/entity/Teacher';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {
  private message = '';
  /*查询参数*/
  params = {
    name: ''
  };
  /* 班级 */
  klasses = [
    new Klass(1, '计科1901班', new Teacher(1, 'zhagnsan', '张三')),
    new Klass(2, '软件1902班', new Teacher(2, 'lisi', '李四'))
  ];

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * 用户点击查询按钮后触发
   */
  onQuery(): void {
    console.log('综合查询');
  }

}
