// 函数重载
function addMethod(object, name, fn) {
    let old = object[name];
    object[name] = function(...args) {
        if (fn.length === args.length) {
            return fn.apply(this, args);
        } else if (typeof old === 'function') {
            return old.apply(this, args);
        }
    }
}

let people = {
    values: [ 'liwei', 'yeqiong', 'lisixiang', 'liuhuarong', 'liting' ]
}

addMethod(people, 'find', function() {
    return this.values;
})

addMethod(people, 'find', function(first) {
    let res = this.values.filter(ele => {
        return ele.indexOf(first) !== -1;
    })
    return res.join()
})

addMethod(people, 'find', function(first, last) {
    let res = this.values.filter(ele => {
        return ele.indexOf(first + '' + last) !== -1;
    })
    return res.join()
})

let all = people.find();
let lis = people.find('li')
let a = people.find();

