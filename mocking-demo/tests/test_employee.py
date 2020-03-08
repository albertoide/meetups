from unittest import TestCase
from demo.employee import Employee, CoronaVirusException


class TestEmployee(TestCase):
    def test_employee_gets_the_work_done(self):
        manolo = Employee()
        result = manolo.work()
        assert result == "work done"

    def test_employee_doenst_work_when_is_sick(self):
        manolo = Employee()
        self.assertRaises(CoronaVirusException, manolo.work)