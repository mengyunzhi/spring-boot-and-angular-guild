import {NgModule} from '@angular/core';
import {Klass} from './Klass';

@NgModule({})
export class Student {
  id: number;
  klass: Klass;
  name: string;
  sno: string;
  /* 是否选中，辅助实现V层的 选中 功能 */
  isChecked = false;

  constructor(data?: { id?: number; klass?: Klass; name?: string; sno?: string }) {
    if (!data) {
      return;
    }
    this.id = data.id ? data.id : null;
    this.klass = data.klass ? data.klass : null;
    this.name = data.name ? data.name : '';
    this.sno = data.sno ? data.sno : '';

  }
}
