import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppComponent} from './app.component';

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


  constructor(private httpClient: HttpClient, private appComponent: AppComponent) {
  }

  ngOnInit(): void {
  }

  /**
   * 将要保存的教师信息提交给后台
   * 当声明方法为public（此关键字可省略）时，相当于绑定到了V层，V层中可以进行调用或是绑定操作。
   */
  public onSubmit(): void {
    const url = 'http://localhost:8080/Teacher';
    const teacher = {
      name: this.name,
      username: this.username,
      email: this.email,
      sex: this.sex
    };

    console.log(teacher);

    this.httpClient.post(url, teacher)
      .subscribe(() => {
        console.log('添加成功');
        this.appComponent.ngOnInit();
      }, (response) => {
        console.error('请求发生错误', response);
      });
  }
}
