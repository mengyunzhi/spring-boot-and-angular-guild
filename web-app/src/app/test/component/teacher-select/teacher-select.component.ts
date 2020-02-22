import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Teacher} from '../../../norm/entity/Teacher';
import {TeacherSelectService} from './teacher-select.service';

@Component({
  selector: 'app-teacher-select',
  templateUrl: './teacher-select.component.html',
  styleUrls: ['./teacher-select.component.sass']
})
export class TeacherSelectComponent implements OnInit {
  @Output() selected = new EventEmitter<Teacher>();
  @Input() teacher: { id: number };

  constructor(private teacherSelectService: TeacherSelectService) {
    teacherSelectService.selected = this.selected;
    teacherSelectService.teacher = this.teacher;
  }

  ngOnInit() {
  }

}
