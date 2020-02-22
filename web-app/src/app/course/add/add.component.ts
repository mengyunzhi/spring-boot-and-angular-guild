import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Course} from '../../norm/entity/course';
import {Teacher} from '../../norm/entity/Teacher';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {
  formGroup: FormGroup;
  course: Course;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.minLength(2), Validators.required]]
    });
    this.course = new Course();
  }

  onTeacherSelect($event: Teacher) {
    this.course.teacher = $event;
  }

  onSubmit() {

  }
}
