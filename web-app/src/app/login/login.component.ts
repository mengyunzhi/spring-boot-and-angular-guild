import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TeacherService} from '../service/teacher.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private teacherService: TeacherService) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  /**
   * 点击提交按钮后进行用户登录
   */
  onSubmit() {
    const username = this.formGroup.get('username').value;
    const password = this.formGroup.get('password').value;
    this.teacherService.login(username, password).subscribe(result => {
      console.log(result);
    });
  }
}
