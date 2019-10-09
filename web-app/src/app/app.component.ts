import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
/**
 * 实现OnInit接口，该接口规定了ngOnInit方法。
 * angular在组件准备完毕后，将自动调用ngOnInit方法
 */
export class AppComponent implements OnInit {

  // 定义教师数组
  teachers = new Array();

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 该方法将在组件准备完毕后被调用
   */
  ngOnInit() {
    const self = this;
    /* 后台数据的请求地址，如果变量定义后不再重新赋值，则应该使用const来定义 */
    const url = 'http://localhost:8080/Teacher/';

    /* 使用get方法请求url，请求一旦成功后，将调用传入success方法；如果请求失败，将调用error方法 */
    this.httpClient.get(url)
      .subscribe((response: any) => {
        console.log(response);
        this.teachers = response;
      }, (response) => {
        console.log(response);
        console.error('请求出错');
      });
  }

}
