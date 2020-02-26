import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Course} from '../norm/entity/course';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private url = 'http://localhost:8080/Course';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 保存课程
   * @param course 课程
   */
  save(course: Course): Observable<Course> {
    return this.httpClient.post<Course>(this.url, course);
  }
}
