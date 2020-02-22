import {EventEmitter} from '@angular/core';
import {Teacher} from '../../../norm/entity/Teacher';

export class TeacherSelectService {
  selected: EventEmitter<Teacher>;
  teacher: { id: number };

  constructor() { }
}
