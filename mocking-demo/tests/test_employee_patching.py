from unittest import TestCase
from demo.employee import Employee, CoronaVirusException
from unittest import mock

# Monkey patching
import random
random.randint = mock.Mock(return_value=2)


class TestEmployee(TestCase):
    def test_employee_gets_the_work_done(self):
        manolo = Employee()
        result = manolo.work()
        assert result == "work done"
