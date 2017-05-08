import time


def fib(n):
    if n <= 2:
        return 1
    else:
        return fib(n-1) + fib(n-2)


def main():

    for _ in range(20):
        result = fib(30)
        print(result)


if __name__ == '__main__':
    started = time.time()
    main()
    elapsed = time.time() - started
    print("time: {:.2f}s".format(elapsed))