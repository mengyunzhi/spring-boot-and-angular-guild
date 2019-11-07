import {Subject} from 'rxjs';
import {Params} from '@angular/router';

export class ActivatedRouteStub {
  subject = new Subject<Params>();
  readonly params = this.subject.asObservable();
}
