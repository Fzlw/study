## HAC. 销售挖矿解释
1. HAC挖矿产出 = 固定 5500 W  +  每日HAC发放总量
2. HAC全网难度 = 全网cny历史销售总额（与支付方式无关）
3. HAC当日总产量 = 当日设置发放HAC总量
4. 24小时收益 公式
	* 1CN*24H= 昨日cny销售总额/全网cny历史销售总量  * hac 当日产出 / 昨日cny销售总额
	* 取基本量
1. HAC 总流通量  = HAC挖矿产出



1. 基础量
	* HAC总量 ----->.  cnh_hacmining_setting. TotalMine
	* 固定 5500 W （设置的）------>cnh_hacmining_setting. HacHoldMine
	* 每日HAC发放总量 （设置的）----->. EveryDayOutput
	* 全网cny历史销售总额（与支付方式有关）---->  cnh_userorder
	* 昨日cny销售总额（与支付方式有关）。  ---->. cnh_userorder

	
	
	
	
	
	
"use strict"
/**
 * 实时面板
 */
define([
    'zepto',
    'component/common-table/pc/index',
    'decimaljs'
], ($, table, decimal, helper) => {
    class panel {
        constructor(box) {
            this.box = box;
            this.init();
        }
        init() {
            this.isGetCanvasTime = false; // 是否取得服务器时间
            this.counter = 0; // 时间计数
            this.initOutputRank();
            this.initPriceList();
            this.initRankClick();
            this.getLastHacInfo();
        }
        initPriceList() {
            this.PriceList = new table({
                title: "HAC实时价格",
                headerCloum: [{
                    name: "交易所",
                    field: "ExchangeName"
                }, {
                    name: "交易对",
                    field: "ExchangeFor"
                }, {
                    name: "最新价格",
                    field: "LatestPrice"
                }, {
                    name: "24h涨幅",
                    field: "Chg24"
                }, {
                    name: "24h高点",
                    field: "Hight24"
                }, {
                    name: "24h地点",
                    field: "Low24"
                }, {
                    name: "24h交易量",
                    field: "Amount24"
                }],
                query: {
                    api: "/panel/exchange?",
                    pageSize: 3
                },
                pager: {
                    hasInit: true
                },
                NoData: {
                    text: '暂无数据',
                    height: 300
                },
                containner: this.box.find('.price-table'),
                method: this.PriceListCallBack()
            })
            let Interval = null;
            clearInterval(Interval);
            Interval = setInterval(() => {
                this.PriceList.filterData("reload");
            }, 2000);
        }
        PriceListCallBack() {
            let that = this; // 将this转化为jquery对象
            return () => {
                // 修改样式
                that.fixedStyle();
            }
        }

        fixedStyle() {
            this.box.find('.price-table').find('tr.item').forEach(element => {
                let $obj = $(element).children('td').eq(3);
                if ($obj.text().substr(0, 1) === '+') {
                    $obj.css('color', '#01A853');
                } else if ($obj.text().substr(0, 1) === '-') {
                    $obj.css('color', '#F42B2B');
                }
            });
        }

        initOutputRank() {
            this.ranktable = new table({
                headerCloum: [{
                    name: "用户",
                    field: "userName"
                }, {
                    name: "消费总金额",
                    field: "tatolCount"
                }, {
                    name: "产出",
                    field: "output"
                }, {
                    name: "时间",
                    field: "outputTime"
                }],
                query: {
                    api: "/panel/userRank?",
                    pageSize: 10
                },
                pager: {
                    moreCount: 5
                },
                NoData: {
                    img: '//img.cnhash.com/5ec4cdac-b46f-4434-9eef-34b7e22375d1.png',
                    text: '暂无排行',
                    height: 300
                },
                containner: this.box.find('.rank-table')
            });
        }

        initRankClick() {
            let _this = this;
            let userId = this.box.find('.menu').children().prop("className");
            this.box.find('.menu').on('click', 'li', function () {
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
                if ($(this).text() === "个人挖矿收益") {
                    _this.ranktable.filterData([{
                        field: 'userId',
                        value: `"${userId}"`
                    }], [{
                        name: "我的收益",
                        field: "output"
                    }, {
                        name: "我的支付金额",
                        field: "tatolCount"
                    }, {
                        name: "hac当日难度",
                        field: "MineHard"
                    }, {
                        name: "日期",
                        field: "dayTime"
                    }]);
                } else {
                    _this.ranktable.filterData("reload", [{
                        name: "用户",
                        field: "userName"
                    }, {
                        name: "消费总金额",
                        field: "tatolCount"
                    }, {
                        name: "产出",
                        field: "output"
                    }, {
                        name: "时间",
                        field: "outputTime"
                    }]);
                }
            })
        }

        initCanvas() {
            let start = new Date().getTime(), // 时间修正
                canvas = this.box.find('.pancel .count-canvas')[0],
                ctx = canvas.getContext("2d"),
                devicePixelRatio = window.devicePixelRatio || 1, // 设备绘制像素比
                cW = 130 * devicePixelRatio, // 绘制宽
                cH = 130 * devicePixelRatio, // 绘制高
                lineW = 6 * devicePixelRatio, // 线宽
                fontSize = 20 * devicePixelRatio, // 字体大小
                startAngle = -0.5 * Math.PI, // 圆起始角度
                unit = 2 * Math.PI / (24 * 60 * 60); // 每秒旋转角度
            canvas.width = cW;
            canvas.height = cH;
            return {
                start,
                ctx,
                cW,
                cH,
                lineW,
                fontSize,
                startAngle,
                unit
            };
        }

        // 设置canvas倒计时的总时间，单位s
        setTime(params, now) {
            if (this.isGetCanvasTime) return;
            this.isGetCanvasTime = true;
            let end = new Date(),
                date = now ? new Date(now) : end,
                year = date.getFullYear(),
                month = date.getMonth(),
                day = date.getDate(),
                next = Date.parse(new Date(year, month, day + 1, 0, 0, 0)),
                diffTime = params.start - end.getTime(); // 校准时间误差
            this.count = parseInt((next - date.getTime() + diffTime) / 1000);
            // this.timing(this.renderCount, params);
            setInterval(() => {
                this.renderCount(params);
            }, 1000)
        }

        /**
         * 全局定时器，所有定时器相关的任务，都需要在里面执行
         * 等待时间为一秒，间隔一秒调用
         */
        timing() {
            let start = 0,
                timeout = () => {
                    setTimeout(() => {
                        // 一定时间去获取HAC相关的最新信息
                        




                        this.counter += 1;
                        start = 1000;
                        timeout();
                    }, start);
                };
            timeout();
        }

        // canvas绘图
        renderCount(params) {
            let {
                ctx,
                cW,
                cH,
                lineW,
                fontSize,
                startAngle,
                unit
            } = params,
            r = cW / 2,
                endAgnle = startAngle + unit * this.count,
                text = this.getFillText();

            ctx.clearRect(0, 0, cW, cH);
            // 绘制阴影
            // ctx.globalCompositeOperation = "lighter";
            // ctx.shadowOffsetX = 0;
            // ctx.shadowOffsetY = 5;
            // ctx.shadowBlur = 5;
            // ctx.shadowColor = "#072B51"; // #072B51

            // 描外边
            ctx.beginPath();
            ctx.lineWidth = lineW;
            ctx.lineCap = "round";
            ctx.strokeStyle = "#fff";
            ctx.arc(r, r, r - lineW, startAngle, endAgnle);
            ctx.stroke();
            ctx.closePath();


            // 描内圆
            ctx.beginPath();
            ctx.fillStyle = "#fff";
            ctx.arc(r, r, r - 3 * lineW, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();

            // 设置重合部分为透明
            ctx.globalCompositeOperation = "xor";

            // 描文字
            // ctx.shadowColor = "transparent";
            ctx.textAlign = "center";
            ctx.font = (fontSize) + 'px Roboto-Medium';
            ctx.fillText(text, r, r + fontSize / 2 - 5); // 手动修正  -10
        }

        // 获取描绘内容
        getFillText() {
            let h = Math.floor(this.count / 3600),
                m = Math.floor((this.count - h * 3600) / 60),
                s = this.count - h * 3600 - m * 60;
            if (this.count <= 0) {
                this.count = 24 * 3600;
            }

            h = this.fill(h);
            m = this.fill(m);
            s = this.fill(s);
            this.count -= 1;
            return h + ":" + m + ":" + s;
        }

        // 固定两位显示，不足前面补 0 
        fill(str, bit = 2) {
            let tar = typeof str === "string" ? str : str.toString();
            if (tar.length >= bit) return tar;
            let res = "";
            while (bit > 0) {
                res = "0" + tar;
                bit -= 1;
            }
            return res;
        }

        /**
         * 发送数据
         */
        getLastHacInfo(data) {
            $.ajax({
                url: "/panel/hacInfo",
                type: "GET",
                dataType: "json",
                data: data || null,
                timeout: 50000,
                success: (res) => {
                    if (res.success) {
                        // 请求成功且返回success = true,取得数据之后的回掉操作
                        this.setTime(this.initCanvas(), res.data.Now);

                        return;
                    } 
                        this.setTime(this.initCanvas());
                    
                },
                error: (err) => {
                    // 出错情况，canvas用系统当前时间
                    this.setTime(this.initCanvas());
                }
            })
        }
    }
    return panel;
});
