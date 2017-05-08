# rfcs.py
#
# An example that downloads a list of files using a thread pool.

from queue import Queue
import threading
import time
import os

import requests


BASE_URL = "http://www.rfc-editor.org/rfc"
DEST_DIR = os.path.join(os.environ["HOME"], "rfcs")
RFC_NUMBERS = [1122, 1123, 791, 792, 950, 1112, 919, 922, 768, 793, 854, 855,
    1112, 1870, 1034, 1035, 1212, 1155, 1213, 1002, 1001,
    862, 8098, 8077, 7761, 7680, 7679, 20, 7296, 6353,
    5591, 5590, 5343, 7011, 6376, 6891]


THREAD_POOL_SIZE = 8


def download_rfc(number):
    url = "{}/rfc{}.txt".format(BASE_URL, number)
    response = requests.get(url)

    filename = "{}.txt".format(number)
    path = os.path.join(DEST_DIR, filename)
    with open(path, "wb") as fp:
        fp.write(response.text.encode("utf-8"))


class Downloader(threading.Thread):
    def __init__(self, queue):
        threading.Thread.__init__(self)
        self.queue = queue

    def run(self):
        while True:
            number = self.queue.get()
            download_rfc(number)
            self.queue.task_done()


def main():
    queue = Queue()

    for _ in range(THREAD_POOL_SIZE):
        t = Downloader(queue)
        t.setDaemon(True)
        t.start()

    for number in RFC_NUMBERS:
        queue.put(number)
    queue.join()


if __name__ == '__main__':
    started = time.time()
    main()
    elapsed = time.time() - started
    print("time: {:.2f}s".format(elapsed))
