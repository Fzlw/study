let str = '6217********3038';



// console.log(str.slice(0, 4) + '  ' + str.slice(4, 8) + '  ' + str.slice(8, 12))

function sli(str) {
  let tar = '';
  const li = 4
  let index = 0;
  let number = Math.ceil(str.length / li);
  while (number > 0) {
    tar += str.slice(index, index + li) + '  ';
    number -= 1
    index = index + li
  }
  return tar;
}

// sli(str)


// Luhn验证银行卡号

let c = "6212261812010362231"
c = '6212262201023557228'
c = '5432123456788881'

function check(card) {
  // 判断为NaN
  let back = card.split("").reverse(),
    oddSum = 0,
    evenSum = 0;
  back.map((item, index) => {
    let i = Number(item);
    if (index % 2 === 0) {
      evenSum += i;
    } else {
      i *= 2;
      i = i >= 10 ? i - 9 : i;
      oddSum += i;
    }
  });
  return (oddSum + evenSum) % 10 === 0;
}

console.log(check(c))