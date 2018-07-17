let str = "<h1>Chapter 1 - 介绍正则表达式</h1>";

let reg = /<.*>/;
reg = /<.*?>/;
console.log(str.match(reg));
  