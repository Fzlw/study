# FitNess 项目需求分析

### 小程序用户端需求分析
1. 设计稿（我的预约：有课），我的课程和教练邀约都按照时间维度展示吗？？？
2. 教练邀约下两个Tab,按照理解，教练邀约Tab只显示邀约记录，课程历史显示所有邀约的结果信息（最终的）
1. 个人信息，展示余额，对于次卡是怎么显示的？？？
2. 私教约课和团课是公用一个Tab吗，然后进入的按钮不同？？？
3. 团课缺少取消预约的页面
4. 教练详情。--> 是只显示私教的详情，团课没有是吗
5. 约课界面不够详细
6. 预约时间。---> 可多选可定制打卡计划。 待确认


### 小程序用户端API整理
1. 获取我的预约课程信息  // k
	* router: `user/course?uid=:userId&date=:date`
	* method: GET
	* params
		1. uid: 用户Id
		2. date: 预约时间 //默认当天,格式：2018/09/09
	* return
	
		```json
		{
			Success: true, // 请求是否成功
			Code: 200, // 请求响应状态码
			Message: '', // 请求响应信息
			CourseList: [ // 课程列表
				{
					Id: xxx, // 课程ID
					Date: 2018/09/09,  // 课程开始日期
					StartTime: 10:30, // 课程开始时间
					EndTime: 12:00, // 课程结束时间
					CoachName: xxx, // 教练姓名
					CoachIcon: xxx, // 教练头像地址
					CourseName: xxx, // 课程名称
					ShoreName: xxx, // 店名
					State: '预约',  // 课程状态
				},
				...
			]
		}
		```
		
2. 获取总运动、周运动、打卡  // 我的预约 --> 我的基本信息
	* router: `user/sport?uid=:userId`
	* method: GET
	* params
		1. uid: 用户Id
	* return
	
		```json
		{
			Success: true, // 请求是否成功
			Code: 200, // 请求响应状态码
			Message: '', // 请求响应信息
			TotalTime: 120,  // 总运动/分钟
			WeekTime: 100,  // 周运动/分钟
			Signed: 14 // 打卡/天
		}
		```

3. 课程签到. // 我的预约 --> 签到
	* router: `user/sign?uid=:userId&courseId=:courseId`
	* method: GET
	* params
		1. uid: 用户Id
		2. courseId： 课程Id
	* return
	
		```json
		{
			Success: true, // 请求是否成功
			Code: 200, // 请求响应状态码
			Message: '', // 请求响应信息
			
			CoachName: xxx, // 教练姓名
			CoachIcon: xxx, // 教练头像
			CourseName: xxx, // 课程名称
			Date: 2018/09/09, // 日期
			ClassStartTime: 10:30, // 上课开始时间
			ClassEndTime: 12:30, // 上课结束时间
			Address: xxx, // 地点
			Level: 3, // 难易度
			QRCode: xxx // 签到二维码
		}
		```

4. 获取我的余额，No，会员卡基本信息. // 我的。--> 卡片基本信息
	* router: `user/card?uid=:userId`
	* method: GET
	* params
		1. uid: 用户Id
	* return
	
		```json
		{
			Success: true, // 请求是否成功
			Code: 200, // 请求响应状态码
			Message: '', // 请求响应信息
			CardNo: xxx, // 卡片编号
			AvailableProperty: xxx, // 可用余额
			ShoreName: xxx, // 店名
			LevelName: '会员' (卡片等级，游客、会员。。。)
		}
		```
		
5. 我的。--> 体测信息 （公众号）
	* router: `user/info?uid=:userId`
	* method: GET
	* params
		1. uid: 用户Id
	* return
	
		```json
		{
			Success: true, // 请求是否成功
			Code: 200, // 请求响应状态码
			Message: '', // 请求响应信息
			Height: xxx, // 用户身高
			Weight: xxx, // 用户体重
			BFR: xxx, // 体脂百分比
			Muscle: xxx // 骨骼肌含量
		}
		```
		
6. 我的 --> 会员权益。 TODO
7. 我的 --->. 优惠券。 TODO
8. 课程 ---> 教练邀约 --->. 课程历史。TODO
	* 获取 课程历史 展示列表

9. 课程 ---> 教练邀约 --->. 教练邀约。TODO
	* 获取 教练邀约 展示列表
		
10. 是否拒绝教练邀约 // 课程 ---> 教练邀约 --->. 教练邀约。拒绝/预约
	* router: `course/cancel`
	* method: POST
	* params
		1. inviteId: 邀请Id
	* return
	
		```json
		{
			Success: true, // 请求是否成功
			Code: 200, // 请求响应状态码
			Message: '', // 请求响应信息
		}
		```
		
11. 获取私教约课信息. // 私教约课
	* router: `course/personal?uid=:userId`
	* method: GET
	* params
		1. uid: 用户Id
	* return
	
		```json
		{
			Success: true, // 请求是否成功
			Code: 200, // 请求响应状态码
			Message: '', // 请求响应信息
			CoachList: [ // 全部教练列表
				{
					Id: xxx, // 教练id
					CoachName: xxx, // 教练姓名
					CoachUrl: xxx, // 教练头像
					CoachLevel: xxx, // 教练头衔
					Price: xxx, // 教练价格
					VipPrice: xxx, // vip价格
					State: xxx // 教练状态，是否可以预约
				},
				...
			],
			MyCoachList: [
				{
					Id: xxx, // 教练id
					CoachName: xxx, // 教练姓名
					State: xxx, // 教练状态，是否可以预约
					CoachIcon: xxx // 教练头像
				},
				...
			]
		}
		```
		
12. 获取团课预约信息 // 团课（预约）
	* router: `course/group?date=:date`
	* method: GET
	* params
		1. date: 预约时间 //默认当天,格式：2018/09/09
	* return
	
		```json
		{
			Success: true, // 请求是否成功
			Code: 200, // 请求响应状态码
			Message: '', // 请求响应信息
			CourseList: [ // 团课列表
				{
					Id: xxx, // 课程id
					CourseName: xxx, // 课程名称
					CoachIcon: xxx, // 教练头像
					StartTime: 10:30, // 上课开始时间
					EndTime: 12:00,  // 上课结束时间
					Price: xxx, // 教练价格
					VipPrice: xxx, // vip价格
					State: xxx, // 课程状态，是否可以预约
					Level: xxx, // 课程难度
					Total: xxx, // 可预约总人数
					Signed: xxx // 已经预约人数
				},
				...
			]
		}
		```
		
13. 获取教练详情
	* router: `coach/detail?coachId=:coachId`
	* method: GET
	* params
		1. coachId: 教练Id
	* return
	
		```json
		{
			Success: true, // 请求是否成功
			Code: 200, // 请求响应状态码
			Message: '', // 请求响应信息
			CoachName: xxx, // 教练姓名
			CoachIcon: xxx, // 教练头像
			CoachIntr: xxx, // 教练个人简介、资质认证)
			CoachLevel: xxx, // 教练头衔
			Price: xxx, // 教练价格
			VipPrice: xxx, // vip价格
			Address: xxx, // 地点
			CourseIntr: xxx // 课程简介
		}
		```
		
14. 订单信息（约课）
	* router: `user/createorder`
	* method: POST
	* params
		1. courseId: 课程Id
		2. coachId: 教练Id
		3. time: 预约时间
		4. address: 预约地点（门店）
		5. number: xxx (人数)
		6. payMoney: xxx (支付金额)
		7. payMethod: xxx (支付方式)
	* return
	
		```json
		{
			Success: true, // 请求是否成功
			Code: 200, // 请求响应状态码
			Message: '' // 请求响应信息
		}
		```
		
15. 门店（门店列表）
	* router: `/shore`
	* method: GET
	* params
		1. 无
	* return
	
		```json
		{
			Success: true, // 请求是否成功
			Code: 200, // 请求响应状态码
			Message: '', // 请求响应信息
			ShoreList: [
				{
					Id: xxx, // 门店id
					Icon: xxx, // 门店图片
					Name: xxx, // 门店中文名
					NickName: xxx // 门店英文名
				},
				...
			]
		}
		```
		
16. 店铺详情
	* router: `/shore/detail?shoreId=:shoreId`
	* method: GET
	* params
		1. shoreId: 门店Id
	* return
	
		```json
		{
			Success: true, // 请求是否成功
			Code: 200, // 请求响应状态码
			Message: '', // 请求响应信息
			Icon: xxx, // 门店图片
			NickName: xxx, // 门店英文名
			ShoreIntr: xxx //门店简介
			... // TODO
		}
		```

		
