import {NgModule} from '@angular/core';
import {TeacherIndexComponent} from './teacher-index.component';
import {TeacherAddComponent} from './teacher-add.component';
import {TeacherEditComponent} from './teacher-edit.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: TeacherIndexComponent
  },
  {
    path: 'add',
    component: TeacherAddComponent
  },
  {
    path: 'edit/:id',
    component: TeacherEditComponent
  }
];

/**
 * 教师模块
 */
@NgModule({
  declarations: [
    TeacherIndexComponent,
    TeacherAddComponent,
    TeacherEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule
  ]
})
export class TeacherModule {
}
