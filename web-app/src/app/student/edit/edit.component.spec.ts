import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {KlassSelectComponent} from '../klass-select/klass-select.component';
import {CoreModule} from '../../core/core.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';

fdescribe('student -> EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditComponent, KlassSelectComponent ],
      imports: [
        ReactiveFormsModule,
        CoreModule,
        HttpClientTestingModule
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
