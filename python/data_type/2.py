# while循环
# while True:
#     name = input('姓名：')
#     if name == 'stop':
#         break
#     age = input('年龄：')
#     print('欢迎{},{},欢迎'.format(name, age))

s = 'liweiliweili'

# for i in s:
#     print(i)

# 获取下标索引
# for i, it in enumerate(s):
#     print(i, it, end=" | ")

emp = { 'a': 2, 'b': 9 }
# 判断该对象是否实现了__next__()
iter(emp) is emp    # False
i = iter(emp)
# i.__next__()

# 没有js的变量提升
# print(q)
# q = 'qq'

# 函数和js一样，具有作用域提升
# test()
# def test():
#     print('hello world')

# test()


# python里布尔类型属于整型   [] => False   [1] => True
# if []:
#     print('ok')


# 可迭代对象
res = list(map(lambda x: x + 5, range(1, 21)))
# print(res)


# 乘法口诀表
max_num = 9
min_num = 1
while min_num <= max_num:
    num = 1
    while num <= min_num:
        print('{}x{}={}'.format(num, min_num, min_num * num), end="  ")
        num += 1
    print('')
    min_num += 1
