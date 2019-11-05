import {NgModule} from '@angular/core';
import {IndexComponent} from './index/index.component';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { AddComponent } from './add/add.component';

/**
 * 班级模块
 */
@NgModule({
  declarations: [IndexComponent, AddComponent],
  imports: [
    BrowserModule,
    FormsModule
  ]
})
export class KlassModule {

}
