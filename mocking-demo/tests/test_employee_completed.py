from unittest import TestCase
from demo.employee import Employee, CoronaVirusException
from unittest.mock import patch


class TestEmployee(TestCase):
    @patch("demo.employee.random.randint")
    def test_employee_gets_the_work_done(self, mock_random):
        mock_random.return_value = 2
        manolo = Employee()
        result = manolo.work()
        assert result == "work done"

    @patch("demo.employee.random.randint")
    def test_employee_doenst_work_when_is_sick(self, mock_random):
        mock_random.return_value = 1
        manolo = Employee()
        self.assertRaises(CoronaVirusException, manolo.work)
