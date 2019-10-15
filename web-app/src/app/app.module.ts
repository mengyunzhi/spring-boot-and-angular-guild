import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {TeacherAddComponent} from './teacher-add.component';
import {FormsModule} from '@angular/forms';
import {TeacherEditComponent} from './teacher-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    TeacherAddComponent,
    TeacherEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
