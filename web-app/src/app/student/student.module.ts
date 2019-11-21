import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddComponent} from './add/add.component';
import {StudentRoutingModule} from './student-routing.module';
import { KlassSelectComponent } from './klass-select/klass-select.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';


@NgModule({
  declarations: [AddComponent, KlassSelectComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class StudentModule {
}
