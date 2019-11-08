import {NgModule} from '@angular/core';
import {IndexComponent} from './index/index.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddComponent} from './add/add.component';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {EditComponent} from './edit/edit.component';
import { TeacherSelectComponent } from './teacher-select/teacher-select.component';

/*定义路由*/
const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  }, {
    path: 'add',
    component: AddComponent
  }, {
    path: 'edit/:id',
    component: EditComponent
  }
];

/**
 * 班级模块
 */
@NgModule({
  declarations: [IndexComponent, AddComponent, EditComponent, TeacherSelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class KlassModule {

}
