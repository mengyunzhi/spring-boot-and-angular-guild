import {Teacher} from './Teacher';

/**
 * 课程
 */
export class Course {
  id: number;
  name: string;
  teacher: Teacher;

  constructor(data?: { id?: number, name?: string, teacher?: Teacher }) {
    if (data) {
      if (data.id !== undefined) {
        this.id = data.id;
      }

      if (data.name !== undefined) {
        this.name = data.name;
      }

      if (this.teacher) {
        this.teacher = data.teacher;
      }
    }
  }
}
