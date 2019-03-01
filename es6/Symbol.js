let sy = Symbol('wfrserg');
// 可以转成布尔和字符串
// console.log(!sy);
// console.log(sy.toString())

// Symbol.for() 如果之前有相同描述的Symbol值，找到并返回，如果没有就创建一个新的Symbol值

let s1 = Symbol.for('liwei');
let s2 = Symbol.for('liwei');
console.log(s1 === s2);// true,此时是相同的

// Symbol.keyFor()得到一个通过Symbol.for()创建的描述

console.log(Symbol.keyFor(sy));//undefined
console.log(Symbol.keyFor(s1));//liwei