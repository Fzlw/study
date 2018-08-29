let arr = [ {a: 'liwei'}, { a: 'yeyyeye' } ];
let all = '';
arr.forEach(item => {
    let str = `this is a ${item.a}`;
    all += str; 
})

console.log(all);