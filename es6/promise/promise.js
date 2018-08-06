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
    console.log('正在读取')
    fs.readFile(read, 'utf-8', (e, d) => {
        if (e) reject(e);
        resolve(d);
    });
  })

}

asyncR('1.txt').then(d1 => {
  console.log(d1)
    return asyncR(d1)
})
.then(d2 => {
    console.log(d2)
})
.catch(e => console.log(e));


console.log('end');