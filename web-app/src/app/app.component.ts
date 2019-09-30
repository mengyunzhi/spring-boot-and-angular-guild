import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'web-app';
  // 定义教师数组
  teachers = new Array(
    {
      id: 1,
      name: '张三',
      username: 'zhangsan',
      email: 'zhangsan@yunzhiclub.com',
      sex: '男',
    }
  );
}
