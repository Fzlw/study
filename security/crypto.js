const crypto = require('crypto');

function aesEncrypt(data, key) {
    const cipter = crypto.createCipher('aes192', key);
    let crypted = cipter.update(data, 'utf8', 'hex');
    crypted += cipter.final('hex');
    return crypted;
}

function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

console.log(aesEncrypt('liwei', 'liwei'))
console.log(aesDecrypt('c620870af262724de6f3317a38611720', 'liwei'))