import {Observable, of} from 'rxjs';
import {Teacher} from '../../norm/entity/Teacher';

export class TeacherStubService {
  setIsLogin(isLogin: boolean): void {
    return;
  }

  login(username: string, password: string): Observable<boolean> {
    return null;
  }

  logout(): Observable<void> {
    return of(null);
  }

  me(): Observable<Teacher> {
    return of(new Teacher(1, 'username', 'name'));
  }
}
