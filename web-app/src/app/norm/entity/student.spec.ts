// @ts-ignore
import {Student} from './student';

describe('Student', () => {
  it('should create an instance', () => {
    expect(new Student()).toBeTruthy();
    expect(new Student({})).toBeTruthy();
    expect(new Student({id: 1, name: 'test', sno: '100021'}));
    expect(new Student({id: 1})).toBeTruthy();
    expect(new Student({name: 'hello', id: 2, sno: '123'})).toBeTruthy();
    expect(new Student({sno: '456'})).toBeTruthy();
  });
});
