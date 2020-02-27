import {AbstractControl, AsyncValidator, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {CourseService} from '../../service/course.service';
import {map} from 'rxjs/operators';

/**
 * 课程名称唯一性异步验证器
 */
@Injectable({
  providedIn: 'root'
})
export class UniqueNameValidator implements AsyncValidator {
  static courseService: CourseService;

  constructor(courseService: CourseService) {
    UniqueNameValidator.courseService = courseService;
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return UniqueNameValidator.courseService.existsByName(control.value)
      .pipe(map(input => input ? {uniqueName: true} : null));
  }
}
