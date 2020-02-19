import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor} from '@angular/common/http';
import {TeacherAddComponent} from './teacher/teacher-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TeacherEditComponent} from './teacher/teacher-edit.component';
import {TeacherIndexComponent} from './teacher/teacher-index.component';
import {RouterModule} from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { PersonalCenterComponent } from './personal-center/personal-center.component';
import {AuthTokenInterceptor} from './core/auth-token-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TeacherAddComponent,
    TeacherEditComponent,
    TeacherIndexComponent,
    NavComponent,
    FooterComponent,
    WelcomeComponent,
    LoginComponent,
    PersonalCenterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
