import datetime
# Python类的定义
# 属性修饰器
# 属性设置器

class Person:
    count = 0
    
    def __init__(self, name, birth = datetime.date.today(), job = 'devlopment'):
        self.name = name
        self.birth = birth
        self.job = job
        Person.count += 1

    # 类预置函数，改变在命令提示符下的输出信息
    def __repr__(self):
        return '<姓名：{} at 0x{}>'.format(self.name, id(self))

    def __str__(self):
        return '终端调用print时返回的结果<姓名：{}>'.format(self.name)

    # 申明属性修饰器来过滤修改传入值
    @property
    def age(self):
        return datetime.date.today().year - self.birth.year

    # age禁止修改  不加默认好像也不能设置这类属性  也不能删除  @age.deleter
    @age.setter
    def age(self, value):
        raise AttributeError('禁止修改age')

    # 销毁实例时所触发的内置函数
    def __del__(self):
        Person.count -= 1

    def get_info():
        print('姓名:{}, 年龄:{}, 工作是: {}'.format(self.name, self.age, self.job))

p1 = Person('liwei', datetime.date(1996, 9, 3))

# print(p1)
# print(Person.count)

# del(p1)

# print(Person.count)

# print(p1.name)
# print(p1.age)
# p1
# print(p1)

# 属性
print(p1.age)
print(p1.birth)
del(p1.age)
print(p1.age)

