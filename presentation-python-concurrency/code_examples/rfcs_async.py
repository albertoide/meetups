# rfcs.py
#
# An example using asyncio

import time
import os

import asyncio
import aiohttp

BASE_URL = "http://www.rfc-editor.org/rfc"
DEST_DIR = os.path.join(os.environ["HOME"], "rfcs")
RFC_NUMBERS = [1122, 1123, 791, 792, 950, 1112, 919, 922, 768, 793, 854, 855,
    1112, 1870, 1034, 1035, 1212, 1155, 1213, 1002, 1001,
    862, 8098, 8077, 7761, 7680, 7679, 20, 7296, 6353,
    5591, 5590, 5343, 7011, 6376, 6891]


def save_file(path, text):
    with open(path, "wb") as fp:
        fp.write(text.encode("utf-8"))


async def download_rfc(number):
    filename = "{}.txt".format(number)
    path = os.path.join(DEST_DIR, filename)
    url = "{}/rfc{}.txt".format(BASE_URL, number)

    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            text = await resp.text()
            save_file(path, text)


if __name__ == '__main__':
    started = time.time()
    loop = asyncio.get_event_loop()

    downloads_to_do = asyncio.wait([download_rfc(doc) for doc in RFC_NUMBERS])

    loop.run_until_complete(downloads_to_do)
    loop.close()

    elapsed = time.time() - started
    print("time: {:.2f}s".format(elapsed))
