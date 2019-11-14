import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddComponent} from './add/add.component';
import {StudentRoutingModule} from './student-routing.module';
import { KlassSelectComponent } from './klass-select/klass-select.component';


@NgModule({
  declarations: [AddComponent, KlassSelectComponent],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule {
}
