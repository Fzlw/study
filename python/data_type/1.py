"""print(1, end='')  参数问题"""

# Python  数据类型

# list 列表  len() 获取列表长度
liwei = [1, 2, '3', 5]
print(len(liwei))

# 字典  get()

# 字符串占位符   '{0}'.format()
score = 75
if score >= 60:
    print('及格')
else:
    print('不及格')

# 三元运算符
result = 'ok' if 22 >= 60 else 'nonono'
print(result)
