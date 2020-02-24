import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Klass} from '../../norm/entity/Klass';

@Component({
  selector: 'app-klass-multiple-select',
  templateUrl: './klass-multiple-select.component.html',
  styleUrls: ['./klass-multiple-select.component.sass']
})
export class KlassMultipleSelectComponent implements OnInit {
  klasses$: Observable<Klass>;

  constructor() { }

  ngOnInit() {
  }

  onChange($event: Array<Klass>) {

  }
}
