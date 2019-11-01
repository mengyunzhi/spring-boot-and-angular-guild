import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {
  private message = '';
  private url = 'http://localhost:8080/Klass';
  /*查询参数*/
  params = {
    name: ''
  };

  /* 班级 */
  klasses;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.onQuery();
  }

  /**
   * 用户点击查询按钮后触发
   */
  onQuery(): void {
    console.log('执行onQuery');
    this.httpClient.get(this.url, {params: this.params})
      .subscribe(data => {
        console.log('成功执行请求', data);
        this.klasses = data;
      }, () => {
        console.log(`请求${this.url}发生错误`);
      });
  }

}
