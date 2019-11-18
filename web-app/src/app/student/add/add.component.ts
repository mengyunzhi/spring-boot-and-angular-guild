import {Component, OnInit} from '@angular/core';
import {Student} from '../../norm/entity/student';
import {FormControl, FormGroup} from '@angular/forms';
import {StudentService} from '../../service/student.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {
  student: Student;
  formGroup: FormGroup;

  constructor(private studentService: StudentService) {
  }

  ngOnInit() {
    this.student = new Student();
    this.formGroup = new FormGroup({
      name: new FormControl(''),
      sno: new FormControl('')
    });
  }

  onSubmit(): void {
    this.student = this.formGroup.value;
    console.log(this.student);
  }

}
