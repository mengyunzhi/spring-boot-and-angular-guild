import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TeacherAddComponent} from './teacher/teacher-add.component';
import {TeacherEditComponent} from './teacher/teacher-edit.component';
import {TeacherIndexComponent} from './teacher/teacher-index.component';


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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
