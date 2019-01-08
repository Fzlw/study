import time
import _thread

# 单线程  多线程对比

def worker(n):
    print(f'子线程开始...{time.ctime()}')
    time.sleep(n)
    print(f'结束...{time.ctime()}')

def main():
    print(f'主线程开始...{time.ctime()}')

    print(f'主线程结束...{time.ctime()}')

def main_mt():
    print(f'主线程开始...{time.ctime()}')
    # time.sleep()
    print(f'主线程结束...{time.ctime()}')

# 单线程时间  总耗费时间为两个任务之和
# if __name__ == "__main__":
#     main()
#     worker(4)
#     worker(2)


# 使用thread调用子线程执行   
if __name__ == "__main__":
    main_mt()
    # 参数以元组传入
    _thread.start_new_thread(worker, (4, ))
    _thread.start_new_thread(worker, (2, ))

