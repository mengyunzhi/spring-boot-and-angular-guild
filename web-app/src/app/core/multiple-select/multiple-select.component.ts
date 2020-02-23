import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  constructor() {
  }

  /** 用户选择的对象 */
  selectedObjects = new Array<any>();

  ngOnInit() {
  }

  /**
   * 点击某个checkbox后触发的函数
   * 如果列表中已存在该项，则移除该项
   * 如果列表中不存在该项，则添加该项
   */
  onChange(data: any) {
    let found = false;
    this.selectedObjects.forEach((value, index) => {
      if (data === value) {
        found = true;
        this.selectedObjects.splice(index, 1);
      }
    });

    if (!found) {
      this.selectedObjects.push(data);
    }

    this.changed.emit(this.selectedObjects);
  }
}
