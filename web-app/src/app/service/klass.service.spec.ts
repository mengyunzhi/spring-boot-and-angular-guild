import {TestBed} from '@angular/core/testing';

import {KlassService} from './klass.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Klass} from '../norm/entity/Klass';

describe('KlassService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: KlassService = TestBed.get(KlassService);
    expect(service).toBeTruthy();
  });

  fit('all', () => {
    // 数据准备，调用被测方法
    const service: KlassService = TestBed.get(KlassService);
    let result;
    service.all().subscribe((data) => {
      result = data;
    });

    // 断言发起请求符合预期
    const testingController: HttpTestingController = TestBed.get(HttpTestingController);
    const request = testingController.expectOne((req) => req.url === 'http://localhost:8080/Klass');
    expect(request.request.headers.has('name'));
    expect(request.request.method).toEqual('GET');

    // 断言成功的接收到返回值
    const klasses = [new Klass(null, null, null)];
    request.flush(klasses);
    expect(result).toBe(klasses);
  });
});
