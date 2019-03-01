let str = '/wallet?name=liwei&age=10&sex=1';

let url = /[\?&]{1}([a-z]+)=(\w+)/g;

let res = str.match(url)

// console.log(res)
// 获取URL参数
function getUrl(str) {
  let _str = str;
  let url = /[\?&]{1}([a-z]+)=(\w+)/g;
  let res = [];
  str.match(url).forEach((item) => {
      let every = item.substring(1).split('=');
      res.push({ [every[0]]: every[1] });
  })
  return res;
}

console.log(getUrl(str))

