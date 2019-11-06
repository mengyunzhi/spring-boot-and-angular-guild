import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Klass} from '../../norm/entity/Klass';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  formGroup: FormGroup;
  private url: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private httpClient: HttpClient) {
  }

  private getUrl(): string {
    return this.url;
  }

  /**
   * 加载要编辑的班级数据
   */
  loadData(): void {
    this.httpClient.get(this.getUrl())
      .subscribe((klass: Klass) => {
        this.formGroup.setValue({name: klass.name, teacherId: klass.teacher.id});
      }, () => {
        console.error(`${this.getUrl()}请求发生错误`);
      });
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(),
      teacherId: new FormControl()
    });
    this.route.params.subscribe((param: { id: number }) => {
      this.setUrlById(param.id);
      this.loadData();
    });
  }

  /**
   * 用户提交时执行的操作
   */
  onSubmit(): void {
    const data = {
      name: this.formGroup.value.name,
      teacher: {id: this.formGroup.value.teacherId}
    };
    this.httpClient.put(this.getUrl(), data)
      .subscribe(() => {
        this.router.navigateByUrl('', {relativeTo: this.route});
      }, () => {
        console.error(`在${this.getUrl()}上的PUT请求发生错误`);
      });
  }


  private setUrlById(id: number): void {
    this.url = `http://localhost:8080/Klass/${id}`;
  }
}

