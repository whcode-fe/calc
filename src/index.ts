import Decimal from 'decimal.js';

const calc = {
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

declare global {
  interface Number {
    toFixedNew: (len: number) => string;
    countDecimals: (len: number) => number;
  }
}
/**
 * 扩展Number对象 实现传统的四舍五入
 * @param len 保留几位小数
 */
Number.prototype.toFixedNew = function (len: number): string {
  let num = this as number;
  if (num < 0) {
    num = num * -1;
    return ((Math.round(calc.multiply(num, Math.pow(10, len)) as number) / Math.pow(10, len)) * -1).toFixed(len);
  }
  return (Math.round(calc.multiply(num, Math.pow(10, len)) as number) / Math.pow(10, len)).toFixed(len);
};
/**
 * 扩展Number对象 获取小数位位数
 */
Number.prototype.countDecimals = function () {
  if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
  return this.toString().split('.')[1].length || 0;
};

export default calc;
