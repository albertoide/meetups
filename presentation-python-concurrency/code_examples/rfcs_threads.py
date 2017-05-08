from threading import Thread
import time
import os

import requests


BASE_URL = "http://www.rfc-editor.org/rfc"
DEST_DIR = os.path.join(os.environ["HOME"], "rfcs")
RFC_NUMBERS = [1122, 1123, 791, 792, 950, 1112, 919, 922, 768, 793, 854, 855,
    1112, 1870, 1034, 1035, 1212, 1155, 1213, 1002, 1001,
    862, 8098, 8077, 7761, 7680, 7679, 20, 7296, 6353,
    5591, 5590, 5343, 7011, 6376, 6891]


def download_rfc(number):
    url = "{}/rfc{}.txt".format(BASE_URL, number)
    response = requests.get(url)

    filename = "{}.txt".format(number)
    path = os.path.join(DEST_DIR, filename)
    with open(path, "wb") as fp:
        fp.write(response.text.encode("utf-8"))


def main():
    threads = []
    for number in RFC_NUMBERS:
        thread = Thread(target=download_rfc, args=(number, ))
        thread.start()
        threads.append(thread)

    while threads:
        threads.pop().join()

if __name__ == '__main__':
    started = time.time()
    main()
    elapsed = time.time() - started
    print("time: {:.2f}s".format(elapsed))
