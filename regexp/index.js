let str = "<h1>Chapter 1 - 介绍正则表达式</h1>";

let reg = /<.*>/;
reg = /<.*?>/;
// console.log(str.match(reg));

// 首字母转大写
let str1 = 'ewrt_re_oerd';
let name = str1.split('_')
let names = '';
for (let i = 0; i < name.length; i++) {
    if (i >= 1 ) {
        names += name[i][0].toUpperCase();
    }
    names += name[i];
}
console.log(names);
