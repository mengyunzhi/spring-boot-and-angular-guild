import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TeacherSelectComponent} from './teacher-select.component';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

describe('TeacherSelectComponent', () => {
  let component: TeacherSelectComponent;
  let fixture: ComponentFixture<TeacherSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherSelectComponent],
      imports: [
        BrowserModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('获取教师列表后选择教师', () => {
    expect(component).toBeTruthy();
  });
});
