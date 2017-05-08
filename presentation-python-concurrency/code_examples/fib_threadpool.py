import time
from queue import Queue
import threading

THREAD_POOL_SIZE = 2


def fib(n):
    if n <= 2:
        return 1
    else:
        return fib(n-1) + fib(n-2)


class Calculator(threading.Thread):
    def __init__(self, queue):
        threading.Thread.__init__(self)
        self.queue = queue

    def run(self):
        while True:
            number = self.queue.get()
            result = fib(number)
            print(result)
            self.queue.task_done()


def main():
    queue = Queue()

    for _ in range(THREAD_POOL_SIZE):
        t = Calculator(queue)
        t.setDaemon(True)
        t.start()

    for _ in range(20):
        queue.put(30)
    queue.join()


if __name__ == '__main__':
    started = time.time()
    main()
    elapsed = time.time() - started
    print("time: {:.2f}s".format(elapsed))