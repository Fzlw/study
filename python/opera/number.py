# 数字的格式化相关操作

a = 1436
b = 1.8237
c = -9.9918

print('数字：{}'.format(a))
print('数字：{}'.format(b))
print('数字：{}'.format(c))

# 以浮点型显示
print('数字：{:f}'.format(a))
print('数字：{:f}'.format(b))
print('数字：{:f}'.format(c))

# 保留两位小数  四舍五入
print('数字：{:.2f}'.format(a))
print('数字：{:.2f}'.format(b))
print('数字：{:.2f}'.format(c))

# 千位使用,隔开
print('数字：{:,.2f}'.format(a))
print('数字：{:,.2f}'.format(b))
print('数字：{:,.2f}'.format(c))

print(f'数字：{a:.3f}')