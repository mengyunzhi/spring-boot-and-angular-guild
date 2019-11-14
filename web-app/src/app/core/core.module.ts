import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectComponent} from './select/select.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [SelectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    SelectComponent
  ]
})
export class CoreModule {
}
