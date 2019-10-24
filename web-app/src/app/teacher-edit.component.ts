import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AppComponent} from './app.component';

@Component({
  templateUrl: './teacher-edit.component.html'
})
export class TeacherEditComponent implements OnInit {
  public teacher: any = {};

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private appComponent: AppComponent) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const url = 'http://localhost:8080/Teacher/' + id;
    this.httpClient.get(url)
      .subscribe((data) => {
        this.teacher = data;
      }, () => {
        console.log(`请求 ${url} 时发生错误`);
      });
  }

  /**
   * 提交表单
   */
  onSubmit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const url = 'http://localhost:8080/Teacher/' + id;
    this.httpClient.put(url, this.teacher)
      .subscribe(() => {
          console.log('更新成功');
          this.appComponent.ngOnInit();
        },
        () => {
          console.error(`更新数据时发生错误,url:${url}`);
        });
  }

}
