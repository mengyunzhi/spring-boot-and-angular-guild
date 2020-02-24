import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CoreTestingController} from '../core-testing-controller';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-multiple-select',
  templateUrl: './multiple-select.component.html',
  styleUrls: ['./multiple-select.component.sass']
})
export class MultipleSelectComponent implements OnInit {
  /** 数据列表 */
  @Input()
  list$: Observable<Array<{ name: string }>>;

  /** 事件弹射器，用户点选后将最终的结点弹射出去 */
  @Output()
  changed = new EventEmitter<Array<any>>();

  constructor(private coreTestingController: CoreTestingController) {
    this.coreTestingController.addUnit(this);
  }

  ngOnInit() {
  }
}
