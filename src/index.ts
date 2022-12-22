import Decimal from 'decimal.js';

export default {
  /**
   * 加法运算
   * @param a 运算数1
   * @param b 运算数2
   */
  add: function (a: number | string, b: number | string): number {
    return new Decimal(a).add(new Decimal(b)).toNumber();
  },
  /**
   * 减法运算
   * @param a 运算数1
   * @param b 运算数2
   */
  subtract: function (a: number | string, b: number | string): number {
    return new Decimal(a).sub(new Decimal(b)).toNumber();
  },
  /**
   * 乘法运算
   * @param a 运算数1
   * @param b 运算数2
   */
  multiply: function (a: number | string, b: number | string): number {
    return new Decimal(a).mul(new Decimal(b)).toNumber();
  },
  /**
   * 除法运算
   * @param a 运算数1
   * @param b 运算数2
   */
  divide: function (a: number | string, b: number | string): number {
    return new Decimal(a).div(new Decimal(b)).toNumber();
  }
};
