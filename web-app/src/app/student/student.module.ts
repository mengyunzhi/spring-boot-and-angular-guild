import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddComponent} from './add/add.component';
import {StudentRoutingModule} from './student-routing.module';


@NgModule({
  declarations: [AddComponent],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule {
}
