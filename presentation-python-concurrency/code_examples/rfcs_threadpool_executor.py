# rfcs_threadpool_executor.py
#
# Example using ThreadPoolExecutor

import time
import os

from concurrent.futures import ThreadPoolExecutor

import requests


BASE_URL = "http://www.rfc-editor.org/rfc"
DEST_DIR = os.path.join(os.environ["HOME"], "rfcs")
RFC_NUMBERS = [
    1122, 1123, 791, 792, 950, 1112, 919, 922, 768, 793, 854, 855,
    1112, 1870, 1034, 1035, 1212, 1155, 1213, 1002, 1001, 862,
    8098, 8077, 7761, 7680, 7679, 20, 7296, 6353, 5591, 5590,
    5343, 7011, 6376, 6891
]


THREAD_POOL_SIZE = 8


def download_rfc(number):
    url = "{}/rfc{}.txt".format(BASE_URL, number)
    response = requests.get(url)

    filename = "{}.txt".format(number)
    path = os.path.join(DEST_DIR, filename)
    with open(path, "wb") as fp:
        fp.write(response.text.encode("utf-8"))


def main():
    with ThreadPoolExecutor(max_workers=THREAD_POOL_SIZE) as executor:
        executor.map(download_rfc, RFC_NUMBERS)


if __name__ == '__main__':
    started = time.time()
    main()
    elapsed = time.time() - started
    print("time: {:.2f}s".format(elapsed))
