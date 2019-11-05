import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Teacher} from '../../norm/entity/Teacher';
import {Klass} from '../../norm/entity/Klass';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {
  /*当发生请求错误时，显示该信息*/
  public static errorMessage = '数据保存失败，这可能是由于网络的原因引起的';
  name: FormControl;
  teacherId: FormControl;
  /*当该值不为空时，可以显示在前台并提示用户*/
  message: string;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.name = new FormControl('');
    this.teacherId = new FormControl();
  }

  onSubmit(): void {
    const url = 'http://localhost:8080/Klass';
    const klass = new Klass(undefined, this.name.value,
      new Teacher(parseInt(this.teacherId.value, 10), undefined, undefined)
    );
    this.httpClient.post(url, klass)
      .subscribe(() => {
        console.log('保存成功');
      }, (response) => {
        console.log(`向${url}发起的post请求发生错误` + response);
        this.setMessage(AddComponent.errorMessage);
      });
  }

  /**
   * 使用传的值来设置message，并在1.5秒后将消息置空
   * @param message 消息
   */
  private setMessage(message: string): void {
    this.message = message;
    setTimeout(() => {
      this.message = '';
    }, 1500);
  }

}
