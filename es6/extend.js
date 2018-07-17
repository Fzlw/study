// ...运算符
// 将非数组转换成数组
// 将数组变成非数组

let str = "1234";
// console.log([...str]);

// 求最大值
let arr =[3,4,6,8,9,12,4,2453,6433,2];
// console.log(Math.max(...arr));

// 对象属性名[]的扩展，可以实用变量

let cccc = 'nameliwei';
let obj = {
  a: 1,
  b: 2,
  cccc: 3// cccc: 3
}

console.log(obj);

let obj1 = {
  a: 1,
  b: 2,
  [cccc]: 3// nameliwei: 3
}
console.log(obj1);