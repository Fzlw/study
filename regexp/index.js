let str = "<h1>Chapter 1 - 介绍正则表达式</h1>";

let reg = /<.*>/;
reg = /<.*?>/;
// console.log(str.match(reg));

// 选择数字

let rNum = /\d+/g; 
let str1 = 'banktest978675643265342452453453';

console.log(str1.match(/\d+/g));
  