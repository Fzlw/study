import pickle
# 保存python内存状态

# 存储为字符串，取出时eval()
l = [ 3,5,6,99, (99, 8) ]

# with open('str.txt', 'w', encoding="utf8") as f:
#     # 路径
#     f.write(str(l))

with open('str.txt', 'r') as f:
    lo = eval(f.read())
    print(lo)
    print(type(lo))


# 使用python自带库 pickle 
# 存储取出字节字符串
b = pickle.dumps(l)
print(b)
bp = pickle.loads(b)
print(bp)

# 储存取出为二进制文件  注意方法的不同，不带s
bb = pickle.dump(l, open('pick', 'wb'))
# print(bb)
bbp = pickle.load(open('pick', 'rb'))
print(bbp)
print(type(bbp))