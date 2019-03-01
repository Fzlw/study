
// let str = 'btc'
// let str1 = '  btc'
// let str2 = 'b tc'
// let str3 = 'btc  '
// let str4 = 'btcp'
// let str5 = 'btc.'

let str = 'hac'
let str1 = '  hac'
let str2 = 'b tc'
let str3 = 'hac  '
let str4 = 'hacp'
let str5 = 'hac.'

let url = /(^\bbtc\b$)|(^\bhac\b$)/;

console.log("0==="+url.test(str))
console.log("1==="+url.test(str1))
console.log("2==="+url.test(str2))
console.log("3==="+url.test(str3))
console.log("4==="+url.test(str4))
console.log("5==="+url.test(str5))