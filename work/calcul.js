const Decimal = require('decimal.js');

console.log(Decimal(1.00000) > Decimal(0.999999999))

let a = Decimal(0.3).toFixed(8);
let b = Decimal(0.1).toNumber();

console.log(Decimal(a - b).toFixed(8))