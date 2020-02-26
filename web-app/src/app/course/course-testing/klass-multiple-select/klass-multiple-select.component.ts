import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CourseTestingController} from '../course-testing-controller';
import {Klass} from '../../../norm/entity/Klass';

@Component({
  selector: 'app-klass-multiple-select',
  template: `
    <p>
      klass-multiple-select works!
    </p>
  `,
  styles: []
})
export class KlassMultipleSelectComponent implements OnInit {
  @Output()
  changed = new EventEmitter<Klass[]>();

  constructor(private controller: CourseTestingController) {
    this.controller.addUnit(this);
  }

  ngOnInit() {
  }

}
