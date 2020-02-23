import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-multiple-select',
  templateUrl: './multiple-select.component.html',
  styleUrls: ['./multiple-select.component.sass']
})
export class MultipleSelectComponent implements OnInit {
  @Input()
  data: Observable<Array<{name: string}>>;

  @Output()
  changed = new EventEmitter<Array<{name: string}>>();

  constructor() { }

  ngOnInit() {

  }

}


/**
 * 定义class类型
 */
export type Class = { new(...args: any[]): any; };
