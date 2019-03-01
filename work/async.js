function* a(x) {
    yield x + 1;
    yield x + 2;
    return x;
}

let f = a(0);
// console.log(f.next())
// console.log(f.next())
// console.log(f.next())


function task(data) {
    setTimeout(() => {
        console.log('next: ' + data)
        return data;
    }, 1000)
}