import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TeacherService} from '../service/teacher.service';
import {TeacherStubService} from './service/teacher-stub.service';
import { LoginComponent } from './component/login/login.component';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    {provide: TeacherService, useClass: TeacherStubService}
  ]
})
export class TestModule { }
