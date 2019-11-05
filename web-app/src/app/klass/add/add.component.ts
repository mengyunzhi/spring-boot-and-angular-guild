import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {
  name: FormControl;
  teacherId: FormControl;

  constructor() {
  }

  ngOnInit() {
    this.name = new FormControl('');
    this.teacherId = new FormControl();
  }

  onSubmit(): void {

  }

}
