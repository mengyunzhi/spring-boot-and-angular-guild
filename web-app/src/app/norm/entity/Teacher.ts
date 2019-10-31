/**
 * 教师
 */
export class Teacher {
  id: number;
  name: string;
  username: string;
  email: string;
  sex: boolean;
  createTime: number;

  /**
   * 构造函数
   * @param id id
   * @param username 用户名
   * @param name 姓名
   * @param email 邮箱
   * @param sex 性别
   */
  constructor(id: number, username: string, name: string, email?: string, sex?: boolean) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.sex = sex;
  }
}
