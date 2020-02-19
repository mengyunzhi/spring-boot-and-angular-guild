import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TeacherAddComponent} from './teacher/teacher-add.component';
import {TeacherEditComponent} from './teacher/teacher-edit.component';
import {TeacherIndexComponent} from './teacher/teacher-index.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {LoginComponent} from './login/login.component';
import {PersonalCenterComponent} from './personal-center/personal-center.component';


const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'personalCenter',
    component: PersonalCenterComponent
  },
  {
    path: 'teacher',
    component: TeacherIndexComponent
  },
  {
    path: 'teacher/add',
    component: TeacherAddComponent
  },
  {
    path: 'teacher/edit/:id',
    component: TeacherEditComponent
  },
  {
    path: 'klass',
    loadChildren: () => import('./klass/klass.module').then(mod => mod.KlassModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then(mod => mod.StudentModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: []
})
export class AppRoutingModule {
}
