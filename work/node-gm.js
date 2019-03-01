const gm = require('gm');

// gm('./images/1.jpg').resize(100, 100, '!').write('./images/1.jpg', (err) => {
//     if (err) {
//         console.log(err);
//     }
// })

gm('./images/1.jpg').size((err, size) => {
    console.log(size)
    console.log(err)
})