import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { AddComponent } from './add/add.component';
import { KlassMultipleSelectComponent } from './klass-multiple-select/klass-multiple-select.component';


@NgModule({
  declarations: [AddComponent, KlassMultipleSelectComponent],
  imports: [
    CommonModule,
    CourseRoutingModule
  ]
})
export class CourseModule { }
