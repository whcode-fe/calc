declare const calc: {
    /**
     * 加法运算
     * @param a 运算数1
     * @param b 运算数2
     */
    add: (a: number | string, b: number | string) => number;
    /**
     * 减法运算
     * @param a 运算数1
     * @param b 运算数2
     */
    subtract: (a: number | string, b: number | string) => number;
    /**
     * 乘法运算
     * @param a 运算数1
     * @param b 运算数2
     */
    multiply: (a: number | string, b: number | string) => number;
    /**
     * 除法运算
     * @param a 运算数1
     * @param b 运算数2
     */
    divide: (a: number | string, b: number | string) => number;
};
declare global {
    interface Number {
        toFixedNew: (len: number) => string;
        countDecimals: (len: number) => number;
    }
}
export default calc;
