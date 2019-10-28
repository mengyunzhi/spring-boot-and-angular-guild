import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  templateUrl: './teacher-index.component.html',
})
export class TeacherIndexComponent implements OnInit {

  // 定义教师数组
  teachers = new Array();

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 该方法将在组件准备完毕后被调用
   */
  ngOnInit() {
    /* 后台数据的请求地址，如果变量定义后不再重新赋值，则应该使用const来定义 */
    const url = 'http://localhost:8080/Teacher/';

    /* 使用get方法请求url，请求一旦成功后，将调用传入的第一个方法；如果请求失败，将调用传入的第二个方法 */
    this.httpClient.get(url)
      .subscribe((response: any) => {
        console.log(response);
        this.teachers = response;
      }, (response) => {
        console.log(response);
        console.error('请求出错');
      });
  }

  /**
   * 点击删除按钮时删除对应的教师
   * @param teacher 要删除的教师
   */
  onDelete(teacher: { id: string }): void {
    const url = 'http://localhost:8080/Teacher/' + teacher.id;
    this.httpClient.delete(url)
      .subscribe(() => {
        console.log('删除成功');
        this.ngOnInit();
      }, () => {
        console.log('删除失败');
      });
  }

}
