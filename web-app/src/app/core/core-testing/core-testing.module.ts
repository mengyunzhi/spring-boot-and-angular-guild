import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultipleSelectComponent } from './multiple-select/multiple-select.component';
import {CoreTestingController} from './core-testing-controller';

@NgModule({
  declarations: [MultipleSelectComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MultipleSelectComponent
  ],
  providers: [
    CoreTestingController
  ]
})
export class CoreTestingModule { }
