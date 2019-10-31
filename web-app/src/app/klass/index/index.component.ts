import {Component, OnInit} from '@angular/core';

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
    {name: '计科1901班', teacher: {id: 1, name: '张三'}},
    {name: '软件1902班', teacher: {id: 2, name: '李四'}}
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
