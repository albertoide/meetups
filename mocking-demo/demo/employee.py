import random


class CoronaVirusException(Exception):
    def __init__(self):
        Exception.__init__(self, "A lot of cough")


class Employee:
    def work(self):
        if random.randint(1, 2) == 1:
            raise CoronaVirusException
        else:
            return "work done"