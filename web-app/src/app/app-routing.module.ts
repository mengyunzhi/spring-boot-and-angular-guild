import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TeacherAddComponent} from './teacher-add.component';


const routes: Routes = [
  {
    path: 'add',
    component: TeacherAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
