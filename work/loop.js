let arr = [ {a: 'liwei'}, { a: 'yeyyeye' } ];
let all = '';
arr.forEach(item => {
    let str = `this is a ${item.a}`;
    all += str; 
})

console.log(all);



// 添加倒计时，绑定倒计时回掉函数
let products = this.box.find(".home-productList[data-loaded='0']");
let that = this;

// 产品价格展示格式  CNY/T  应付金额
products.each(function () {
    const pay = $(this).find('.right .pay');
    const spanPrice = $(this).find('.left .middle span[alt=price]');
    const price = spanPrice.attr('data-price');
    const count = Number($(this).find('.right .change input').val());
    let total = (count * Number(price)).toFixed(2) + '';
    let index = total.indexOf('.');

    spanPrice.text(parseInt(price));
    pay.find('.paymoney').text(total.slice(0, index));
    pay.find('label').text(total.slice(index));
});

// 所有未初始化产品的倒计时dom
let counts = products.find('.right .count');
counts.each(function () {
    const status = $(this).attr('data-status');
    const TimeLimitSale = $(this).attr('data-TimeLimitSale');
    if (status === '1' && TimeLimitSale === "1") {
        let staus_1 = new CountDown($(this), {
            format: '{d}天{h}:{m}:{s}',
            autoFormat: false,
            _serverTime: Date.now(),
            _targetTime: Date.parse($(this).attr('data-LimitSaleEndTime')),
        });
        staus_1.when([{
          time: 0,
          fun: () => {
              that.countEndCall($(this).parents('.home-productList'), Number(status));
          }
        }]);
    } else if (status === '2') {
        let dom = $('<div></div>');
        const targetTime = new Date($(this).attr('data-LimitSaleStartTime'))
        let month = targetTime.getMonth() + 1;
        let day = targetTime.getDate();
        let hour = targetTime.getHours();
        let min = targetTime.getMinutes();
        let countHtml = $(`
          <span>${month}</span><span>月</span>
          <span>${day}</span><span>日</span>
          <span>${that.fillBit(hour)}</span><span>：</span>
          <span>${that.fillBit(min)}</span>
        `);
        $(this).html(countHtml);
        let status_2 = new CountDown(dom, {
            format: '{d}月{h}日{m}:{s}',
            autoFormat: false,
            _serverTime: Date.now(),
            _targetTime: targetTime,
        });
        status_2.when([{
          time: 0,
          fun: () => {
              that.countEndCall($(this).parents('.home-productList'), Number(status));
          }
        }])
    }
});

// 所有未初始化产品的input输入框
let changes = products.find('.right .change');
changes.each(function () {
    if ($(this).attr('data-status') === '3' || $(this).attr('data-status') === '4') {
        $(this).find('input').attr('disabled', false);
    }
});

// 产品标记为已加载
products.attr('data-loaded', 1);