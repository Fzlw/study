let str = "<h1>Chapter 1 - 介绍正则表达式</h1>";

let reg = /<.*>/;
reg = /<.*?>/;
// console.log(str.match(reg));

// 选择数字

let rNum = /\d+/g; 
let str1 = 'banktest978675643265342452453453';

console.log(str1.match(/\d+/g));
  
// 首字母转大写
// let str1 = 'ewrt_re_oerd';
// let name = str1.split('_')
// let names = '';
// for (let i = 0; i < name.length; i++) {
//     if (i >= 1 ) {
//         names += name[i][0].toUpperCase();
//     }
//     names += name[i];
// }
// console.log(names);

// url参数获取
let params = '/wallet/?age=1&name=3';
let url = /[\?&]{1}([a-z]+=\w+)/g;
let res = params.match(url)
console.log(res)
console.log('外面')
