import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { AddComponent } from './add/add.component';
import { KlassMultipleSelectComponent } from './klass-multiple-select/klass-multiple-select.component';
import {ReactiveFormsModule} from '@angular/forms';
import {KlassModule} from '../klass/klass.module';
import {CoreModule} from '../core/core.module';


@NgModule({
  declarations: [AddComponent, KlassMultipleSelectComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
    ReactiveFormsModule,
    KlassModule,
    CoreModule
  ]
})
export class CourseModule { }
