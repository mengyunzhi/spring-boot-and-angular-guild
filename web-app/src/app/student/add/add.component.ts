import {Component, OnInit} from '@angular/core';
import {Student} from '../../norm/entity/student';
import {FormControl, FormGroup} from '@angular/forms';
import {StudentService} from '../../service/student.service';
import {Klass} from '../../norm/entity/Klass';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {
  student: Student;
  formGroup: FormGroup;
  klass: Klass;

  constructor(private studentService: StudentService) {
  }

  ngOnInit() {
    this.student = new Student();
    this.formGroup = new FormGroup({
      name: new FormControl(''),
      sno: new FormControl('')
    });
  }

  onSelectKlass(klass: Klass): void {
    this.klass = klass;
  }

  onSubmit(): void {
    this.student = this.formGroup.value;
    this.student.klass = this.klass;
    this.studentService.save(this.student).subscribe((student: Student) => {
      console.log(student);
    });
  }

}
