let a = 'red';

function getA() {
  console.log(a);// 报错
  let a;
  console.log(a);
  return a;
}

console.log(getA());