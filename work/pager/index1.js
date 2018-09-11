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


/**
 * class Pager  分页器
 * @param {int/string}  sum  最大页码数
 * @param {int}  maxlength  最大显示页数，超过部分用... 代替
 * @param {obj}  container 分页器容器
 */


class Pager {
  constructor(container, sum, maxlength = 5) {
    this.scope = {
      container: container,
      sum: sum && typeof sum === 'string' ? Number(sum) : sum,
      max: maxlength
    }
    if (!sum || sum <= 0) {
      throw new Error('param err');
    }
    this.step = 1;
    this.active = 1;
    this.Arr = [];
    this.init();
  }

  init() {
    const {
      container,
      sum,
      max
    } = this.scope;
    let i;
    for (i = 0; i < sum; i++) {
      this.Arr[i] = i + 1
    }
    if (container.find('.pager-container').length !== 0) {
      container.find('.pager-container').remove();
      const pagerContainer = $('<div class="pager-container"></div>');
      const prev = $('<span class="prev"><span>');
      const next = $('<span class="next"><span>');
      const ul = $('<ul class="ul-pager"></ul>');
      prev.appendTo(pagerContainer);
      next.appendTo(pagerContainer);
      ul.appendTo(pagerContainer);
      pagerContainer.appendTo(container);
    }

    this.con = container.find('.pager-container');

    this.pagerInit(sum, max);
    this.click()
  }

  pagerInit() {
    const {
      sum,
      max
    } = this.scope;

    // 显示数目小于总页数
    if (sum <= max) {
      const active = this.Arr.indexOf(this.active);
      this.renderArr = this.Arr.slice(0);
      this.renderArr[active] = this.renderArr[active].toString();
      this.render();
      return;
    }

    // 是否在第一页
    if (this.active === 1 && this.step > 0) {
      this.renderArr = []
    } else {
      this.renderArr = [1]
    }

    for (let j = 0; j < max; j++) {
      // 是否点击的下一页
      if (this.step > 0) {
        if (this.active + j < sum) {
          this.renderArr.push(this.active + j)
        } else {
          this.renderArr.push(this.active + j - max)
        }
      } else {
        if (this.active - j > 1) {
          this.renderArr.push(this.active - j)
        } else {
          this.renderArr.push(this.active + max - j)
        }
      }
    }

    this.renderArr.push(this.Arr[this.Arr.length - 1])
    this.renderArr.sort((a, b) => a - b)

    if (this.renderArr[1] - Math.abs(this.step) > 1) {
      this.renderArr.splice(1, 0, '...')
    }
    if (this.renderArr[this.renderArr.length - 2] + Math.abs(this.step) < sum) {
      this.renderArr.splice(this.renderArr.length - 1, 0, '...')
    }

    // 添加激活状态
    const index = this.renderArr.indexOf(this.active)
    this.renderArr[index] = this.renderArr[index].toString()
    this.render();
  }

  render() {
    let aLi = '';
    this.renderArr.forEach(item => {
      aLi += `<li class="${ typeof item === 'string' && !isNaN(Number(item)) ? 'active' : '' } ${Number(item) === this.Arr[0] ? 'first' : ''} ${Number(item) === this.Arr[this.Arr.length - 1] ? 'last' : ''}">${item}</li>`;
    })
    this.con.find('.ul-pager').html(aLi);
  }

  click() {
    this.con.on('click', (e) => {

      if (e.target.nodeName === 'SPAN') {
        this.step = Math.abs(this.step);
        if (e.target.className === 'prev') {
          this.step *= -1;
        }
        this.change()
        return;
      }

      if (e.target.nodeName === 'LI') {
        let li = $(e.target);
        if (li.hasClass('active')) return;

        li.addClass('active');
        li.siblings().removeClass('active');

        // 点击了...
        if (isNaN(Number(li.text()))) {
          const right = li.next().text();
          const left = li.prev().text();
          this.step = Math.abs(this.step)

          if (Number(right) === this.Arr[this.Arr.length - 1]) {
            this.active = Number(left) + Math.abs(this.step);
          } else if (Number(left) === this.Arr[0]) {
            this.active = Number(right) - Math.abs(this.step);
            this.step *= -1;
          }
          this.pagerInit();
          return;
        }
      }

    })
  }

  change() {
    const activeIndex = this.renderArr.indexOf(this.active.toString());
    let index;
    if (this.step > 0) {
      index = this.renderArr.indexOf('...', activeIndex);
    } else {
      index = this.renderArr.indexOf('...');
    }

    if (this.step > 0 && index !== -1 && index - activeIndex > 1) {
      this.renderArr[activeIndex] = Number(this.renderArr[activeIndex])
      this.renderArr[activeIndex + 1] = this.renderArr[activeIndex + 1].toString()
      this.active = this.Arr[this.Arr.indexOf(this.active) + 1]
      this.render();
      return;
    } else if (this.step < 0 && index !== -1 && activeIndex - index > 1) {
      this.renderArr[activeIndex] = Number(this.renderArr[activeIndex])
      this.renderArr[activeIndex - 1] = this.renderArr[activeIndex - 1].toString()
      this.active = this.Arr[this.Arr.indexOf(this.active) - 1]
      this.render();
      return
    }

    // 限制this.active
    if (this.active + this.step > this.scope.sum) {
      this.active = this.scope.sum
    } else if (this.active + this.step < 1) {
      this.active = 1
    } else {
      this.active += this.step
    }

    this.pagerInit()
  }
}




const pager = new Pager(30)

$(document).click(() => {

})