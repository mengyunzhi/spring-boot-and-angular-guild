import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {TeacherAddComponent} from './teacher-add.component';

@NgModule({
  declarations: [
    AppComponent,
    TeacherAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [TeacherAddComponent, AppComponent]
})
export class AppModule {
}
