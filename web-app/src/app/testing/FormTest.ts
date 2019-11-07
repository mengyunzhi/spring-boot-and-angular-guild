import {DebugElement} from '@angular/core';
import {ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {isNull} from 'util';

/**
 * 表单测试
 */
export class FormTest {
  /**
   * 获取input输入框的值
   * 首先获取整个V层元素
   * 然后根据CSS选择器，获取指定的元素
   * 最后将获取的元素转换为HTMLInput元素并返回该元素的值
   * @param fixture 组件夹具
   * @param cssSelector CSS选择器
   * @return string input的值，如果未找到该元素返回null
   */
  static getInputValueByFixtureAndCss(fixture: ComponentFixture<any>, cssSelector: string): string {
    const debugElement: DebugElement = fixture.debugElement;
    const nameElement = debugElement.query(By.css(cssSelector));
    if (isNull(nameElement)) {
      return null;
    }
    const nameInput: HTMLInputElement = nameElement.nativeElement;
    return nameInput.value;
  }

}
