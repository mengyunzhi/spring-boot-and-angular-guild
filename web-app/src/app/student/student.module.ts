import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddComponent} from './add/add.component';
import {StudentRoutingModule} from './student-routing.module';
import { KlassSelectComponent } from './klass-select/klass-select.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [AddComponent, KlassSelectComponent, IndexComponent, EditComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule
  ]
})
export class StudentModule {
}
