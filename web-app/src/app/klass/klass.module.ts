import {NgModule} from '@angular/core';
import {IndexComponent} from './index/index.component';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

/**
 * 班级模块
 */
@NgModule({
  declarations: [IndexComponent],
  imports: [
    BrowserModule,
    FormsModule
  ]
})
export class KlassModule {

}
