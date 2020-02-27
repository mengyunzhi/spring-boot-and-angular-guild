import {NgModule} from '@angular/core';
import {IndexComponent} from './index/index.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddComponent} from './add/add.component';
import {CommonModule} from '@angular/common';
import {EditComponent} from './edit/edit.component';
import { TeacherSelectComponent } from './teacher-select/teacher-select.component';
import {KlassRoutingModule} from './klass-routing.module';

/**
 * 班级模块
 */
@NgModule({
  declarations: [IndexComponent, AddComponent, EditComponent, TeacherSelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    KlassRoutingModule
  ],
  exports: [
    TeacherSelectComponent
  ]
})
export class KlassModule {
}
