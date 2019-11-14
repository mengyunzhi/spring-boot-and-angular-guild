import {NgModule} from '@angular/core';

@NgModule({})
export class Student {
  id: number;
  name: string;
  sno: string;

  constructor(data?: { id?: number; name?: string; sno?: string }) {
    if (!data) {
      return;
    }
    this.id = data.id ? data.id : null;
    this.name = data.name ? data.name : '';
    this.sno = data.sno ? data.sno : '';
  }
}
