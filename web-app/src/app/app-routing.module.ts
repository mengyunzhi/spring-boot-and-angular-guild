import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TeacherAddComponent} from './teacher-add.component';
import {TeacherEditComponent} from './teacher-edit.component';


const routes: Routes = [
  {
    path: 'add',
    component: TeacherAddComponent
  },
  {
    path: 'edit',
    component: TeacherEditComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
