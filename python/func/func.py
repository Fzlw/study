# def func_1():
#     x = 10
#     def func_2():
#         x = 20
#         print(x + 1)  
#     return func_2()

# func_1()  21

# def func_1():
#     x = 10
#     def func_2():
#         nonlocal x
#         print(x + 1)  
#     return func_2()

# func_1()  11

# def func_1():
#     x = 10
#     def func_2(x = 1):
#         print(x + 1)
#     return func_2()

# func_1()  2

# x = 30
# def func_1():
#     x = 10
#     def func_2():
#         global x
#         print(x + 1)  
#     return func_2()

# func_1()  

def func_1(*args):
    print(*args)

func_1('l', 'li')