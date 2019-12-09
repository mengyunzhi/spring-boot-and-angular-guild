import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  /* 使用ViewChild在C层中使用V层中定义的 跳转到首页按钮 */
  @ViewChild('linkToIndex', {static: true})
  linkToIndex: ElementRef;

  student: Student;

  formGroup: FormGroup;

  klass: Klass;

  constructor(private studentService: StudentService) {
  }

  /**
   * 获取V层中的跳转到首页标签并进行点击以实现跳转的功能
   * 其实我们在这使用了一个小骗术：模拟用户点击了一个隐藏的a标签来实现了界面间的跳转。
   * 由于angular路由在C层的跳转代码需要注明：绝对路径。
   * 而这并不是我们所需要的
   * 我们期望该学生模块是完全独立的，如果app模块将其路由设置为student，学生模块是可用的
   * 如果app模块将其路由设置为hello，那么学生模块也应该是可用的。
   * 但如果在C层中使用绝对路径进行跳转便会破坏我们上述想法
   * 它使得该模块只有当前app模块将其路由设置为student时才可用。
   * 因为它的代码是类似于这样的:
   * this.router.navigateByUrl('/student', {relativeTo: this.route});
   * 此时，无论app模拟将本模块的设置设置为什么，点击保存按钮后本模块均会跳转到/student
   * 此时如果根本就没有/student这个根路由，则会发生跳转错误。
   * 同时，如果将student字符串使用hardCode的方式写入本跳转方法也违反了**对扩展开放、对修改关闭**的原则。
   */
  goToIndex(): void {
    this.linkToIndex.nativeElement.click();
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
      this.goToIndex();
    });
  }

}
