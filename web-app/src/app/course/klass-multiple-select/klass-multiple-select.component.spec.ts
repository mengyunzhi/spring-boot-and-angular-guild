import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {KlassMultipleSelectComponent} from './klass-multiple-select.component';
import {CoreTestingModule} from '../../core/core-testing/core-testing.module';
import {CoreTestingController} from '../../core/core-testing/core-testing-controller';
import {MultipleSelectComponent} from '../../core/multiple-select/multiple-select.component';
import {Klass} from '../../norm/entity/Klass';
import {KlassService} from '../../service/klass.service';
import {KlassStubService} from '../../service/klass-stub.service';
import {of} from 'rxjs';

describe('KlassMultipleSelectComponent', () => {
  let component: KlassMultipleSelectComponent;
  let fixture: ComponentFixture<KlassMultipleSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KlassMultipleSelectComponent],
      imports: [
        CoreTestingModule
      ],
      providers: [
        {provide: KlassService, useClass: KlassStubService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlassMultipleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });

  it('嵌套组件MultipleSelectComponent测试', () => {
    const coreTestingController = TestBed.get(CoreTestingController);
    const multipleSelect = coreTestingController.get(MultipleSelectComponent) as MultipleSelectComponent;
    expect(multipleSelect.list$).toBe(component.klasses$);

    spyOn(component, 'onChange');
    const klasses = [new Klass(null, null, null)];
    multipleSelect.changed.emit(klasses);
    expect(component.onChange).toHaveBeenCalledWith(klasses);
  });

  it('onChange', () => {
    let result;
    component.changed.subscribe((data) => {
      result = data;
    });

    const klasses = [new Klass(null, null, null)];
    component.onChange(klasses);
    expect(result).toBe(klasses);
  });

  it('ngOnInit', () => {
    const klassService: KlassService = TestBed.get(KlassService);
    const klasses$ = of([new Klass(null, null, null)]);
    spyOn(klassService, 'all').and.returnValue(klasses$);

    component.ngOnInit();

    expect(component.klasses$).toBe(klasses$);
  });
});
