import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TeacherService} from '../service/teacher.service';
import {TeacherStubService} from './service/teacher-stub.service';
import { LoginComponent } from './component/login/login.component';
import { TeacherSelectComponent } from './component/teacher-select/teacher-select.component';



@NgModule({
  declarations: [LoginComponent, TeacherSelectComponent],
  imports: [
    CommonModule
  ],
  exports: [
    LoginComponent,
    TeacherSelectComponent
  ],
  providers: [
    {provide: TeacherService, useClass: TeacherStubService}
  ]
})
export class TestModule { }
