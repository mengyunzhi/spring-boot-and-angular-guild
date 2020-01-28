import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Student} from '../../norm/entity/student';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  formGroup: FormGroup;
  student: Student = new Student();
  constructor() { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(''),
      sno: new FormControl('')
    });
  }

}
