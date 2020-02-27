import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectComponent} from './select/select.component';
import {ReactiveFormsModule} from '@angular/forms';
import { MultipleSelectComponent } from './multiple-select/multiple-select.component';


@NgModule({
  declarations: [SelectComponent, MultipleSelectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    SelectComponent,
    MultipleSelectComponent
  ]
})
export class CoreModule {
}
