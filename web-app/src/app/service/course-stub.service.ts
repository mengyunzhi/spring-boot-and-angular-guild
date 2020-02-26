import {Course} from '../norm/entity/course';
import {Observable} from 'rxjs';

export class CourseStubService {

  constructor() {
  }

  save(course: Course): Observable<Course> {
    return null;
  }
}
