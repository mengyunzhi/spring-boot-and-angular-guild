import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddComponent} from './add/add.component';
import {IndexComponent} from './index/index.component';
import {EditComponent} from './edit/edit.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddComponent
  },
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
