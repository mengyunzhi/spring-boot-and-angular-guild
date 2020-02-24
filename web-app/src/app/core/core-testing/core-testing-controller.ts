/**
 * 该方案仅适用于在嵌套组件的数量为1.
 * 由于在get方法中直接以instanceof方法获取了相关组件
 * 所以如果某个组件在被测试组件中多次被引用时
 * 只能获取第一个被push进来的组件
 */
export class CoreTestingController {
  /**
   * 存储组件、指令或管道
   */
  private units = new Array<any>();

  constructor() {
  }

  /**
   * 添加单元（组件、指令或管道）
   * @param unit 单元
   */
  addUnit(unit: any): void {
    this.units.push(unit);
  }

  /**
   * 获取单元（组件、指令或管道）
   * @param clazz 类型
   */
  get(clazz: Clazz): any {
    let result: any = null;
    this.units.forEach((value) => {
      if (value.constructor.name === clazz.name) {
        result = value;
      }
    });

    return result;
  }
}

/**
 * 定义一个Clazz类型，用于参数中接收 类、接口等
 */
export type Clazz = new(...args: any[]) => any;
