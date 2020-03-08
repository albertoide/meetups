# Introduction to mocking in Python

Alberto Bautista

@python_malaga

---
# Agenda
- What are mocks and why I should use them
- The python mock library
- Monkey patching and patch
- Example with "real" code

---
# What are mocks?

- Se puede traducir como "Imitador".
- Mocks objects are simulated objects that mimic the behaviour of real objects in a
**controlled** way
- They are useful when a real object is impractical or impossible to incorporate
into a unit test.

---
# When should I use mocks?
Mocks are useful when a real object is impractical or impossible to incorporate
into a unit test.

- supplies non-determministic results (e.g. current time)
- It is slow or expensive (e.g. some external resource).
- It does not yet exits or may change behaviour.

---
# Mocking in Python

- The standard library for creating mock objects is the mock llibrary. (`pip install mock`)
- In Python >= 3.3 is part of the standard library (`unittest.mock`)

```python
try:
    from unittest import mock
except ImportError:
    import mock
```

---
# mock.Mock
The main characteristic of `unittest.mock` is that responds to any request for
an attribute or method call with other mocks:

```python
>>>m = mock.Mock()
>>>m.foo
<Mock name='mock.foo' id='140112210473456'>
>>>isinstance(m.foo, mock.Mock)
True
```

---
# Setting a return value

- To overrride calls to the mock you'll need to configure its return value.
- The mock will always return the same value on all calls.

```python
>>> m = mock.Mock(return_value="val")
>>> m('bar')
'val'
>> m('bar')
'val'
```

```python
>>> m = mock.Mock()
>>> m.foo.return_value = "val"
>>> m.foo('bar')
'val'
```

---
# Returning different values

- If you want to return different values on each call you can assign an iterable
to `side_effect`:

```python
>>> m = Mock(side_effect=["axl", "duff", "slash", "izzy"])
>>> m()
"axl"
>>> m()
"duff"
>>> m()
"slash"
>>> m()
"izzy"
```

---
# Raising exceptions
- If you want to raise an exception you can assign the exception to `side_effect`:
```
>>> m = mock.Mock()
>>> m.open_file.side_effect = [IOError('File not found')]
>>> m.open_file()
Traceback (most recent call last):
...
OSError: File not found
```

---
# Assertions
A mock object has methods to make assertions about how it has been used.

```python
>>> mock = mock.Mock()
>>> mock.expensive_calculation.return_value = "my value"
>>> mock.expensive_calculation(x=21, y=32, z=34)
```


---
# mock.MagicMock
A subclass of Mock that implements default magic or dunder methods

---
# Monkey Patching (I)
- Lets' suppose we have this function I want to test:

```python
def get_report():
    ....
    response = requests.get("https://my-external-service", my_params)
    # do something with the response
    result = process_response()
    return result
```

- How can I test this without doing the the actual call to the api?
```python
class ReportTest(TestCase):
    def test_report_is_ok():
        result = get_report()
        # assertions
```

---
# Monkey Patching (II)
- I ask python to replace the real function with a fake version at runtime
- This tecchnique is known as monkey patching.
- I'll replace the real object with a mock.

```python
import requests

class ReportTest(TestCase):
    def test_report_is_ok(self):
        requests.get = Mock(return_value=my_fake_value)
        result = get_report()
        # assertions
```

---
# mock.patch
- The mock module also provides a helper function called patch, which we can use
to do the monkey patching:
- `patch()` looks up an object in a given module and replaces that object with a Mock.

```python
class ReportTest(TestCase):
    @patch('mymodule.requests.get')
    def test_report_is_ok(self, mock_get):
        mock_get.return_value = my_fake_value
        requests.get = Mock(return_value=my_fake_value)
        result = get_report()
        # assertions
```

