const fs = require('fs');
const Promise = require('promise');

// 回掉函数形式
// const t1 = fs.readFile('./1.txt', 'utf-8', (err, data) => {
//     console.log(data);
//     console.log('读取1.txt完毕')
// });

// promise
function asyncR(read) {

  return new Promise((resolve, reject) => {
    fs.readFile(read, 'utf-8', (e, d) => {
      if (e) reject(e);
      resolve(d);
    });
  })

}

asyncR('1.txt').then(d1 => {
  console.log(d1)
    
})
// .then(d2 => {
//     console.log(d2)
//       return asyncR(d2)
// })
// .then(d3 => {
//     console.log(d3)
// })
.catch(e => console.log(e));



// console.log('end');

// function test(ms) {
//     return new Promise((resolve, reject) => {
//         console.log('begin');
//         resolve('end')
//     })
// }

// test(2).then(res => {
//     console.log('||'+res);
// }).catch(err => {
//     console.log(err)
// })


// promise.all  全部resolve才会resolve
// let pall = Promise.all([ asyncR('1.txt'), asyncR('2.tx'), asyncR('3.txt') ]);
// pall.then(res => {
//     console.log(res);
// })
// .catch(err => {
//     console.log(err);
// })


// promise.race   一个改变状态，就会立刻变成相同的状态
// let prace = Promise.race([ asyncR('1.txt'), asyncR('2.txt'), asyncR('3.txt') ]);
// prace.then(res => {
//     console.log(res);
// })
// .catch(err => {
//     console.log(err);
// })


// async function
//  async function read() {
//     let text1 = await asyncR('1.txt');
//     console.log(text1)
//     console.log('read 1.txt .....')
//     let text2 = await asyncR('2.txt');
//     console.log('read 2.txt .....')


//     console.log('end');
//  }

//  read();


// function a() {
//   return new Promise((resolve, reject) => {
//     console.log('立即执行')
//     setTimeout(() => {
//       console.log(0654321)
//       resolve('change');
//     }, 2000)
//   })
// }

// a().then(res => {
//   console.log(res);
// })


let buf = new Buffer.from('A5 a1 c2 c5 c1 c4 c3 b3 a6 b2 b4 d1 d5');
console.log(buf.toString('utf-8'))