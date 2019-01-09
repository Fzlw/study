import time
import threading

# 单线程  多线程对比

class MyThread(threading.Thread):
    def __init__(self, func, args):
        threading.Thread.__init__(self)
        self.func = func
        self.args = args

    def run(self):
        self.start(target = self.func, args = self.args)



def worker(n):
    print(f'{threading.current_thread().name}子线程开始...{time.ctime()}')
    time.sleep(n)
    print(f'{threading.current_thread().name}结束...{time.ctime()}')

def main():
    print(f'主线程开始...{time.ctime()}')
    # 方式一：通过threading内置构造函数创建线程
    # 方式二：通过构造一个类继承于Thread基类，实现对基类的封装   --
    tlist = []
    t1 = MyThread(target=worker, args=(4, ))
    tlist.append(t1)

    t2 = MyThread(target=worker, args=(2, ))
    tlist.append(t2)

    # 主线程已经结束，但未等待子线程结束
    for t in tlist:
        t.run()
        # t.join()  感觉理解为一个是否同步异步结果，导致的阻塞

    # 同步等待所有子线程结束
    for t in tlist:
        t.join()

    print(f'主线程结束...{time.ctime()}')


# 使用thread调用子线程执行   
if __name__ == "__main__":
    main()

