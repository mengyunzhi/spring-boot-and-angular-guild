import {NgModule} from '@angular/core';
import {IndexComponent} from './index/index.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddComponent} from './add/add.component';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

/*定义路由*/
const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  }, {
    path: 'add',
    component: AddComponent
  }
];

/**
 * 班级模块
 */
@NgModule({
  declarations: [IndexComponent, AddComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class KlassModule {

}
