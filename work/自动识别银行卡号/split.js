let str = '6217********3038';



// console.log(str.slice(0, 4) + '  ' + str.slice(4, 8) + '  ' + str.slice(8, 12))

function sli(str) {
    let tar = '';
    const li = 4
    let index = 0;
    let number = Math.ceil(str.length / li);
    while(number > 0) {
        tar += str.slice(index, index + li) + '  ';
        number -= 1
        index = index + li
    }
    return tar;
}

sli(str)