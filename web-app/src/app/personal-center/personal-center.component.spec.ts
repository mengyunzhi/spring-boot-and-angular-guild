import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalCenterComponent } from './personal-center.component';
import {TestModule} from '../test/test.module';
import {TeacherService} from '../service/teacher.service';
import {Teacher} from '../norm/entity/Teacher';
import {of} from 'rxjs';

describe('PersonalCenterComponent', () => {
  let component: PersonalCenterComponent;
  let fixture: ComponentFixture<PersonalCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalCenterComponent ],
      imports: [
        TestModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('ngOnInit', () => {
    const teacherService = TestBed.get(TeacherService) as TeacherService;
    const mockReturnTeacher = new Teacher(null, null, null);
    spyOn(teacherService, 'me').and.returnValue(of(mockReturnTeacher));

    component.ngOnInit();
    expect(component.teacher).toBe(mockReturnTeacher);
  });

});
