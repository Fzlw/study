const crypto = require('crypto');

const hash = crypto.createHash('md5')

hash.update('liwei')

console.log(hash.digest('lll').toString())