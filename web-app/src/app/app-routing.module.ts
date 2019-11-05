import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TeacherAddComponent} from './teacher/teacher-add.component';
import {TeacherEditComponent} from './teacher/teacher-edit.component';
import {TeacherIndexComponent} from './teacher/teacher-index.component';


const routes: Routes = [
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
