import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditComponent} from './edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

describe('klass EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
    router = TestBed.get(Router);
    route = TestBed.get(ActivatedRoute);
    route.params.subscribe(data => {
      console.log(data);
    });
    const debugElement: DebugElement = fixture.debugElement;
    const teacherIdElement = debugElement.query(By.css('#teacherId'));
    const teacherIdInput: HTMLInputElement = teacherIdElement.nativeElement;
    teacherIdInput.value = '2';
    teacherIdInput.dispatchEvent(new Event('input'));
    component.onSubmit();
  });
});
