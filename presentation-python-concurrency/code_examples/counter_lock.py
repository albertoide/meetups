import threading

THREADS = 4
MAX_COUNT = 1000000

counter = 0
lock = threading.Lock()


def thread():
    global counter
    for i in range(int(MAX_COUNT/THREADS)):
        lock.acquire()
        try:
            counter += 1
        finally:
            lock.release()


def main():
    threads = []
    for i in range(THREADS):
        t = threading.Thread(target=thread)
        threads.append(t)
        t.start()

    for t in threads:
        t.join()

    print("Counter value: {} Expected: {}\n".format(counter, MAX_COUNT))

if __name__ == '__main__':
    main()
