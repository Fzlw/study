const MyPromise = require('./promise');
// Promise 测试
// let promise = new Promise((resolve, reject) => {
//    setTimeout(() => {
//        resolve('task_1 ok');
//    }, 1000);
// }).then(res => {
//     console.log(res);
// });


// my
// let my = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('mypromise ok');
//     }, 2000);
// }).then(res => {
//     console.log('My:' + res)
// })

setTimeout(() => {
    console.log(1)
}, 0)

new Promise((resolve, reject) => {
    console.log(2)
    resolve()
    console.log(3)
}).then(res => {
    console.log(4)
})

console.log(5)