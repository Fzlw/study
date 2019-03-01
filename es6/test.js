// function a(x) {
//   console.log(x);
// }
// a(1 + 2);

// 一个函数如何接受多个值
function a() {
    this.y = 10;
    // console.log(x);
}

// a.call(null, 2,3,4,6)// 没用


// switch case 是严格等于吗   // 是用 ===
// switch(1) {
//   case '1':
//     console.log('string');
//     break;
//   case 1:
//     console.log('number');
//     break;
//   default:
//     console.log('unknow');
// }

// 小数位数对整数判断的严格相等情况    没有影响
// console.log(1.000 === 1);// true
// console.log(1.00000000000000000000000000000000000 === 1.0);// true
// console.log(1.00000000000000000000000000000000009 === 1.0);// true

// new出来的对象想等吗   不想等
console.log( new a() === new a() );// false

console.log( new a().y === new a().y );// true

let a1 = new a();
let a2 = new a();
a1.y = 9;
console.log(a1.y === a2.y)// false


