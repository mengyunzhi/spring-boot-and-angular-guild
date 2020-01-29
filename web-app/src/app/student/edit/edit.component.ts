import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Student} from '../../norm/entity/student';
import {ActivatedRoute} from '@angular/router';
import {StudentService} from '../../service/student.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  formGroup: FormGroup;
  student: Student = new Student();
  constructor(private activatedRoute: ActivatedRoute,
              private studentService: StudentService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((param: {id: number}) => {
      this.student.id = param.id;
      this.loadStudentById(this.student.id);
    });

    this.formGroup = new FormGroup({
      name: new FormControl(''),
      sno: new FormControl('')
    });
  }

  /**
   * 加载学生
   * @param id 学生ID
   */
  loadStudentById(id: number) {
    this.studentService.getById(id)
      .subscribe(student => {
        this.student = student;
        this.setFormGroupValue(this.student);
      });
  }

  /**
   * 设置表单值
   * @param student 学生
   */
  setFormGroupValue(student: Student) {
    this.formGroup.setValue({
      name: student.name,
      sno: student.sno
    });
  }

}
