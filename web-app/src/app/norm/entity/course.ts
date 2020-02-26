import {Teacher} from './Teacher';
import {Klass} from './Klass';

/**
 * 课程
 */
export class Course {
  id: number;
  name: string;
  teacher: Teacher;
  klasses: Klass[];

  constructor(data?: { id?: number, name?: string, teacher?: Teacher, klasses?: Klass[]}) {
    if (data) {
      if (data.id !== undefined) {
        this.id = data.id;
      }

      if (data.name !== undefined) {
        this.name = data.name;
      }

      if (data.teacher) {
        this.teacher = data.teacher;
      }

      if (data.klasses) {
        this.klasses = data.klasses;
      }
    }
  }
}
