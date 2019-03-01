/**
 * 最大显示条数，多余的自动以...代替  maxlength
 * 总数量count   必须
 */


/**
 * 思路：
 * 利用数组
 * 1. 判断激活状态      激活的数据类型为string， Number()不为NaN
 * 2. 只需要渲染数组内容即可
 * 3. maxlength实现 -->>>>>   
 *     * 需要知道向上还是向下  ？？？
 *     * 不需要展开 -->>>   active的下一个值Number() 不为NaN
 *     * 到达最后一个元素  ---->>>   active + maxlength > MAX
 */


class Pager {
  constructor(sum = 10, maxlength = 3) {
    this.scope = {
      sum,
      max: maxlength
    }

    this.active = 5;
    this.isAdd = false;
    this.isCut = true;
    this.Arr = [];

    this.init(sum, maxlength);

    this.click()
  }

  init() {
    const {
      sum,
      max
    } = this.scope;

    let i;
    // 总数小于最大显示数目
    if (max + 1 >= sum) {
      for (i = 0; i < sum; i++) {
        if (i === this.active - 1) {
          this.Arr[i] = (i + 1).toString()
        } else {
          this.Arr[i] = i + 1
        }
      }
      // this.render()
      return;
    }

    // 总数  大于 最大显示数目
    for (i = 0; i < sum; i++) {
        this.Arr[i] = i + 1
    }
    // this.Arr.splice(this.active + max - 1, sum - max, '...', sum);


    // 是否在第一页
    if (this.active === 1) {
        this.newarr = []
    } else {
        this.newarr = [1]
    }

    for (let j = 0; j < max; j++) {
        if (this.active + j < sum) {
            this.newarr.push(this.active + j)
        } else {
            this.newarr.push(this.active + j - max)
        }
    }
    this.newarr.push(this.Arr[this.Arr.length - 1])
    this.newarr.sort((a, b) => a - b)

    if (this.newarr[1] - 1 > 1) {
        this.newarr.splice(1, 0, '...')
    }
    if (this.newarr[this.newarr.length - 2] + 1 < sum) {
        this.newarr.splice(this.newarr.length - 1, 0, '...')
    }

    // 添加激活状态
    const index = this.newarr.indexOf(this.active)
    this.newarr[index] = this.newarr[index].toString()

    // console.log(this.Arr)
    // console.log(this.newarr)


    // console.log(this.active)
    // console.log(this.Arr)


    this.render();
  }

  render() {
    console.log(this.newarr)
    const ul = $('.ul');
    let aLi = '';
    this.newarr.forEach(item => {
      aLi += `<li class="${ typeof item === 'string' && !isNaN(Number(item)) ? 'active' : '' }">${item}</li>`;
    })

    ul.html(aLi);
  }

  click() {
    $('.con').on('click', (e) => {
      if (e.target.nodeName !== 'SPAN') return;
      let step = 1;
      this.isAdd = false;
      if (e.target.className === 'up') {
        step *= -1;
        this.isAdd = true;
      }


      
      this.changeArr(step)
      console.log(this.active)

      
    })
  }

  changeArr(step) {
      const activeIndex = this.newarr.indexOf(this.active.toString());
      const index = this.newarr.indexOf('...', activeIndex);

      if (index !== -1 && index - activeIndex > 1) {
          this.newarr[activeIndex] = Number(this.newarr[activeIndex])
          this.active = this.newarr[activeIndex + 1]
          this.newarr[activeIndex + 1] = this.newarr[activeIndex + 1].toString()
          
          this.render();
          return;
      } 
      
      // 限制this.active
      if (this.active + step > this.scope.sum) {
          this.active = this.scope.sum
      } else if (this.active + step < 1) {
          this.active = 1
      } else {
          this.active += step
      }
      
      this.init()
      
      // console.log(index, activeIndex)
      // console.log(this.active.toString())
  }
}


// class Pager {
//   constructor(parameter) {
//     this.count = 20;
//     this.init();
//   }

//   init() {
//     this.active = 7;
//     this.isRecord = true;
//     this.renderList();
//     this.clickAddOrDown();
//   }

//   getPage() {
//     return this.active;
//   }

//   clickAddOrDown() {
//     const con = $('.con');
//     const that = this;
//     con.find('span').on('click', function (e) {
//       let step = 1;
//       that.state = false
//       if ($(this).hasClass('up')) {
//         step *= -1;
//         that.state = true
//       }
//       that.active += step;

//       if (that.active < 1) {
//         that.active = 1
//       } else if (that.active > that.count) {
//         that.active = that.count
//       }
//       that.renderList();
//       return false;
//     })
//   }

//   renderList() {
//     const len = this.count;
//     const max = 3;
//     const ul = $('.ul');
//     let aLi = '';
//     // 总数小于最大显示数目
//     if (max >= this.count - 1) {
//       for (let i = 1; i < len; i++) {
//         aLi += `<li class="${ i === this.active ? 'active' : '' }">${i}</li>`;
//       }
//       ul.html(aLi);
//       return;
//     }


//     // 激活页面位于中间
//     if (this.active - max > 0 && this.active + max < len) {

//       if (this.isRecord) {
//           this.renderIndex = this.active;
//           this.isRecord = false;
//           console.log('=======1')
//       }

//       if (this.active >= this.renderIndex + max - 1 && !this.state) {
//           this.isRecord = true;
//       }

//       // 是否朝下
//       if (!this.state) {
//           this.renderIndex = this.active - max + 1;
//           this.isRecord = false;
//           console.log('=========2')
//       }
//       if (this.renderIndex > this.active) {
//           this.isRecord = true;
//       }

//       for (let i = this.renderIndex; i < this.renderIndex + max; i++) {
//         aLi += `<li class="${ i === this.active ? 'active' : '' }">${i}</li>`;
//       }
//       aLi = `<li>1</li>` + '<li>...</li>' + aLi + '<li>...</li>' + `<li>${len}</li>`;
//     }

//     // 激活页面靠近起始页
//     if (this.active - max <= 0) {
//       for (let i = 1; i < max + 1; i++) {
//         aLi += `<li class="${ i === this.active ? 'active' : '' }">${i}</li>`;
//       }
//       aLi = aLi + '<li>...</li>' + `<li>${len}</li>`;
//     }

//     // 激活页靠近结束页
//     if (this.active + max >= len) {
//       for (let i = len - max; i < len + 1; i++) {
//         aLi += `<li class="${ i === this.active ? 'active' : '' }">${i}</li>`;
//       }
//       aLi = `<li>1</li>` + '<li>...</li>' + aLi;
//     }

//     ul.html(aLi);

//   }

// }


const pager = new Pager()

$(document).click(() => {

})