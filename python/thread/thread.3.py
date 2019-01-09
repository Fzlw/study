import time
import concurrent.futures

tasks = list(range(10))

def count(n):
    for i in range(10000000):
        i += i

    return i * n

def worker(x):
    res = count(x)
    print(f'数字：{x}的计算结果为：{res}')

# 单线程执行
def sequential_execution():
    start = time.clock()
    for t in tasks:
        worker(t)
    
    print(f'单线程计算时间:{time.clock() - start}')

# 线程池执行
def threads():
    start = time.clock()
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        for t in tasks:
            executor.submit(worker, t)
    
    print(f'多线程计算时间:{time.clock() - start}')


# 进程池执行
def process():
    start = time.clock()
    with concurrent.futures.ProcessPoolExecutor(max_workers=5) as executor:
        for t in tasks:
            executor.submit(worker, t)
    
    print(f'多进程计算时间:{time.clock() - start}')

if __name__ == '__main__':
    # sequential_execution()  6.6s
    # threads() 6.9s  开始很快，然后感觉阻塞，再然后很快
    process()