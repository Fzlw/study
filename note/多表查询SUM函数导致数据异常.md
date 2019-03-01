1. 多表联合查询时使用SUM()函数导致数据错误，
2. 需要对join的那张表使用 select distinct 进行去除重复数据
3. 具体为什么还是不懂




select 
            proOrders.No, -- 产品编号
            proOrders.ProductId, -- 产品ID
            proOrders.Name, -- 产品名称
            proOrders.Price, -- 单价
            proOrders.BtcT, -- 销售数量（T）
            SUM(proOrders.OrderCount) as OrderCount ,
            SUM(proOrders.CnyAmont) as CnyAmont, -- CNY销售额
            SUM(proOrders.BtcAmont) as BtcAmont,  -- BTC销售额
            SUM(proOrders.BtcT * proOrders.ElectriicityFee) as ElectriicityFee, -- 电费成本
            -- SUM(proOrders.BtcT * proOrders.ElectriicityFee) / SUM(rate.USD2CNY) / SUM(rate.BTC2USD) as ElectriicityFee,  -- 电费成本
            SUM((proOrders.BtcT * proOrders.ManagerFee)/100) as ManagerFee, -- 管理费成本
            -- proOrders.totalEarning * proOrders.ManagerFee / 100  as ManagerFee,   -- 管理费成本
            SUM(proOrders.PresentCoins) as PresentCoins, -- HAC 奖励总额
            proOrders.totalEarning, -- 已发放收益（BTC）
            proOrders.outHAC  -- 已发放HAC
            from (
                select  
                towPayOrder.ProductId, 
                SUM(towPayOrder.BtcT) as BtcT, 
                SUM(towPayOrder.CnyAmont) as CnyAmont,
                SUM(towPayOrder.BtcAmont) as BtcAmont,
                SUM(towPayOrder.OrderCount) as OrderCount , 
                pro.No, -- 产品编号
                pro.Name, -- 产品名称
                pro.Price, -- 产品单价 
                pro.ElectriicityFee, -- 电费
                pro.ManagerFee, -- 管理费 % 要除以 100
                (pro.PresentCoins * towPayOrder.OrderCount) as PresentCoins, -- 奖励HAC个数，一个订单奖励1笔
                (Select SUM(en.Output) from cnh_userearningdetail en where en.Checked = 1 and en.ProductId = pro.Id ) as totalEarning,-- 已发放收益（BTC）
                (select SUM(reward.Amount) as outHAC  from 
                    cnh_userhacrewards reward
                    join 
                    cnh_userorder corder
                    on reward.RelationId = corder.Id
                    where reward.Checked = 1
                    and corder.ProductId = pro.Id
                    group by corder.ProductId
                ) as outHAC -- 已发放HAC

                from  ( 
                select ProductId, SUM(Count) as BtcT,  Count(*) as OrderCount, SUM(TotalAmount) as CnyAmont, 0 as BtcAmont from cnh_userorder as cuo
                    where 1=1 and cuo.PaymentType=4 group by ProductId  -- cny为 4
                union all 
                select ProductId, SUM(Count) as BtcT,  
                    Count(*) as OrderCount, 0 as CnyAmont, 
                    SUM(TotalAmount) as BtcAmont    -- 不需要进行汇率计算
                from cnh_userorder as cuo  
                where 1=1 and cuo.PaymentType=1    -- btc为 1
                group by ProductId
                ) towPayOrder
                left join cnh_product pro
                on pro.Id = towPayOrder.ProductId
                group by towPayOrder.ProductId
            ) proOrders,
            (
                (select Rate as USD2CNY, 0 as BTC2USD from cnh_exchangerate where RateType = 1 order by createtime desc limit 0,1 )  -- 美元对人民币汇率
                union all
                (select 0 as USD2CNY, Rate as BTC2USD from cnh_exchangerate where RateType = 2 order by createtime desc limit 0,1)   -- 美元对BTC价格
            ) rate
            group by proOrders.ProductId