import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AppComponent} from './app.component';

@Component({
  templateUrl: './teacher-edit.component.html'
})
export class TeacherEditComponent implements OnInit {
  public teacher: any = {};
  private url: string;

  constructor(private route: ActivatedRoute,
              private httpClient: HttpClient,
              private appComponent: AppComponent,
              private router: Router) {
  }

  /**
   * 获取与后台对接的URL
   */
  getUrl(): string {
    if (this.url === undefined) {
      const id = this.route.snapshot.paramMap.get('id');
      this.url = 'http://localhost:8080/Teacher/' + id;
    }
    return this.url;
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      console.log(data);
    });
    this.httpClient.get(this.getUrl())
      .subscribe((data) => {
        this.teacher = data;
      }, () => {
        console.log(`请求 ${this.getUrl()} 时发生错误`);
      });
  }

  /**
   * 提交表单
   */
  onSubmit(): void {
    this.httpClient.put(this.getUrl(), this.teacher)
      .subscribe(() => {
          console.log('更新成功');
          this.appComponent.ngOnInit();
          this.router.navigate(['/']);
        },
        () => {
          console.error(`更新数据时发生错误,url:${this.getUrl()}`);
        });
  }
}
