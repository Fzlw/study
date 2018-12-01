const Decimal = require('decimal.js');

// console.log(Decimal(1.00000) > Decimal(0.999999999))

let a = Decimal(0.3).toFixed(8);
let b = Decimal(0.1).toNumber();

// console.log(Decimal(a - b).toFixed(8))



let random = (len = 1) => {
    let value = parseInt(Math.random() * Math.pow(10, len));
    if (("" + value).length === len) {
        return value;
    } else {
        return random(len);
    }
}


for (let i = 0; i< 100; i ++) {
    console.log(random(9))
}