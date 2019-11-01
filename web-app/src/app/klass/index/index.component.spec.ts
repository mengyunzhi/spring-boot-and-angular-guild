import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IndexComponent} from './index.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Klass} from '../../norm/entity/Klass';
import {Teacher} from '../../norm/entity/Teacher';

fdescribe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IndexComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    httpTestingController = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const req = httpTestingController.expectOne('http://localhost:8080/Klass?name=');
    const klasses = [
      new Klass(1, '计科1901班', new Teacher(1, 'zhagnsan', '张三')),
      new Klass(2, '软件1902班', new Teacher(2, 'lisi', '李四'))
    ];
    req.flush(klasses);
    fixture.detectChanges();

  });
});
