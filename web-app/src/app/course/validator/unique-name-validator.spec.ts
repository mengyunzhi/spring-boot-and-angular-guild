import { UniqueNameValidator } from './unique-name-validator';
import {CourseStubService} from '../../service/course-stub.service';
import {CourseService} from '../../service/course.service';

describe('course -> validator -> niqueNameValidator', () => {
  it('should create an instance', () => {
    const courseService = new CourseStubService() as CourseService;
    expect(new UniqueNameValidator(courseService)).toBeTruthy();
  });
});
