import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Student} from '../../norm/entity/student';
import {ActivatedRoute} from '@angular/router';
import {StudentService} from '../../service/student.service';
import {Klass} from '../../norm/entity/Klass';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  /* 使用ViewChild在C层中使用V层中定义的 跳转到首页按钮 */
  @ViewChild('linkToIndex', {static: true})
  linkToIndex: ElementRef;

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

  onSubmit() {
    this.student.name = this.formGroup.get('name').value;
    this.student.sno = this.formGroup.get('sno').value;
    this.student.klass = this.student.klass;
    this.update(this.student);
  }

  /**
   * 更新学生
   * @param student 学生
   */
  update(student: Student) {
    this.studentService.update(student.id, student)
      .subscribe((result) => {
        this.student = result;
        this.linkToIndex.nativeElement.click();
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

  /**
   * 选择班级
   * @param $event 班级
   */
  onSelectKlass($event: Klass) {
    this.student.klass = $event;
  }
}
