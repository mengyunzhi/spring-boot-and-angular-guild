import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KlassMultipleSelectComponent } from './klass-multiple-select/klass-multiple-select.component';
import {CourseTestingController} from './course-testing-controller';



@NgModule({
  declarations: [KlassMultipleSelectComponent],
  imports: [
    CommonModule
  ],
  exports: [
    KlassMultipleSelectComponent
  ],
  providers: [
    CourseTestingController
  ]
})
export class CourseTestingModule { }
