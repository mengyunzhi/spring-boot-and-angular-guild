import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {KlassSelectComponent} from '../klass-select/klass-select.component';

@Component({
  selector: 'app-klass-select',
  template: '',
})
// tslint:disable:component-class-suffix
class KlassSelectComponentStub extends KlassSelectComponent implements OnInit {
  ngOnInit(): void {
  }
}

fdescribe('student -> EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditComponent, KlassSelectComponentStub ],
      imports: [
        ReactiveFormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
