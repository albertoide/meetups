import React from "react";

import {
  Appear,
  Deck,
  Slide,
  Heading,
  Image,
  List,
  ListItem,
  CodePane,
  Link,
  Text
} from "spectacle";

import CodeSlide from "spectacle-code-slide";

import createTheme from "spectacle/lib/themes/default";

import Terminal from "spectacle-terminal";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");

const theme = createTheme({
  primary: "white",
  secondary: "#1F2022",
  tertiary: "#03A9FC",
  quartenary: "#CECECE"
}, {
  primary: "Helvetica",
  secondary: "Montserrat"
});

const images = {
  ioBound: require("../assets_images/io-bound.png"),
  cpuBound: require("../assets_images/cpu-bound.png"),
  meme: require("../assets_images/meme-multithreading.jpg"),
  memeBaby: require("../assets_images/meme-baby.jpg"),
  memeSparta: require("../assets_images/meme-sparta.jpg"),
  producerConsumer: require("../assets_images/producer-consumer.png"),
  gil: require("../assets_images/gil.png"),
  metaphor: require("../assets_images/metaphor.jpg"),
  logo: require("../assets_images/logo.png")
};


export default class Presentation extends React.Component {
  render() {
    return (
      <Deck transition={["slide"]} transitionDuration={500} progress={"number"} controls={false} theme={theme}>
        <Slide>
          <Heading size={1} caps fit>Concurrency in Python</Heading>
          <Text>Alberto Bautista</Text>
          <Text>Lambda Automotive</Text>
          <Image src={images.logo} width="300px"/>
        </Slide>

        {/* PART 0: Basic concepts */}
        <Slide>
          <Heading size={1} caps fit>Part 0: Basic Concepts</Heading>
        </Slide>

        {/* I/O Bound tasks */}
        <Slide>
          <Heading size={2}>I/O Bound Tasks</Heading>
          <List>
            <ListItem>A task is "I/O Bound" if it spends most its time waiting for I/O.</ListItem>
          </List>
          <Image src={images.ioBound} />
          <List>
            <ListItem>Examples: Networking, reading input from users, file procesing.</ListItem>
            <ListItem>Most "normal" programs are I/O bound.</ListItem>
          </List>
        </Slide>

        {/* CPU Bound tasks */}
        <Slide>
          <Heading size={2}>CPU Bound Tasks</Heading>
          <List>
            <ListItem>A task is "I/O Bound" if it spends most its time processing.</ListItem>
          </List>
          <Image src={images.cpuBound} />
          <List>
            <ListItem>Examples: Image processing, data processing</ListItem>
          </List>
        </Slide>

        {/* Process vs Threads */}
        <Slide>
          <Heading size={2}>Process vs Threads</Heading>
            <List>
              <ListItem>A process is an executing task of an application.</ListItem>
              <ListItem>Threads can directly communicate with other threads of the same process.</ListItem>
              <ListItem>Process need IPC, which is more expensive.</ListItem>
              <ListItem>Context switching is less expensive in threads than in processes.</ListItem>
            </List>
        </Slide>

        {/* Example, what we will do */}
        <Slide>
          <Heading size={2}>Simple example</Heading>
          <List>
            <ListItem>Download a list of files.</ListItem>
            <ListItem>
              In our particular case, we will download a list of
              <Link href="https://www.rfc-editor.org/standards#IS"> RFCs</Link>.
            </ListItem>
            <ListItem>We will do several implementations.</ListItem>
          </List>
        </Slide>

        {/* Implenetation without concurrency */}
        <CodeSlide
          transition={[]}
          lang="js"
          textSize=".6em"
          code={require("raw-loader!../code_examples/rfcs.py")}
          ranges={[
            { loc: [0, 4] },
            { loc: [4, 8] },
            { loc: [9, 16] },
            { loc: [18, 27] },
            { loc: [28, 32] },
            { loc: [33, 39] }
          ]}
        />

        {/* Output  RFCs*/}
        <Slide transition={[ "spin", "slide" ]}>
          <Terminal title="1. abautista@MBP-de-Alberto: ~(zsh)" output={[
            "python3 rfcs.py",
            <div style={ { color: "#33B969" } }>time: 29.46s</div>
          ]}
          />
        </Slide>

        {/* PART 1: threading */}
        <Slide>
          <Heading size={1} fit caps>Part 1: threading module</Heading>
        </Slide>

        {/* Subclassing Thread */}
        <Slide>
          <Heading size={2}>threading module</Heading>
          <List>
            <ListItem textSize="0.8em">Define a new subclass of the Thread class.</ListItem>
            <ListItem textSize="0.8em">Override the __init__ method to add addtional arguments.</ListItem>
            <ListItem textSize="0.8em">Override the run method to implement waht the thread should do when started.</ListItem>
          </List>
          <CodePane
            lang="python"
            source={require("raw-loader!../assets_code/thread-class.example")}
          />
          <List>
            <ListItem textSize="0.8em">
              After you have created the subclass, you can create an instance of it and start a new thread by invoking the start(),
              which in turn calls run() mehtod.
            </ListItem>
          </List>
          <CodePane
            lang="python"
            source={require("raw-loader!../assets_code/thread-start.example")}
          />
        </Slide>

        {/* Creating a thread using a function */}
        <Slide>
          <Heading size={2}>threading module</Heading>
          <List>
            <ListItem textSize="0.8em">
              Alternative method of launching threads.
            </ListItem>
          </List>
          <CodePane
            lang="python"
            source={require("raw-loader!../assets_code/thread-function.example")}
          />
          <List>
            <ListItem textSize="0.8em">
              Creates a Thread object with a target.
            </ListItem>
          </List>
        </Slide>

        {/* Example rfcs with threads */}
        <CodeSlide
          lang="js"
          textSize=".6em"
          code={require("raw-loader!../code_examples/rfcs_threads.py")}
          ranges={[
            { loc: [0, 16] },
            { loc: [17, 26] },
            { loc: [27, 36] },
            { loc: [34, 36], note: "Use t.join() to wait a thread to exit." },
            { loc: [37, 43] }
          ]}
        />

        {/* Output  rfcs with threads */}
        <Slide transition={[ "spin", "slide" ]}>
          <Terminal title="1. abautista@MBP-de-Alberto: ~(zsh)" output={[
            "python3 rfcs.py",
            <div style={ { color: "#33B969" } }>time: 29.46s</div>,
            "python3 rfcs_threads.py",
            <div style={ { color: "#33B969" } }>time: 1.86s</div>
          ]}
          />
          <Appear>
            <Image src={images.memeBaby} />
          </Appear>
        </Slide>

        {/* Synchronizing access to shared resources*/}
        <Slide>
          <Heading size={2} fit>Synchronizing access to shared resources</Heading>
            <List>
              <ListItem textSize="0.9em">
                One important issue when using threads is to avoid conflicts when more than one thread needs to access a
                single variable or other resource.
              </ListItem>
              <ListItem textSize="0.9em">
                Used to synchronize threads so that only can make modifications to shared data at any given time.
              </ListItem>
              <ListItem textSize="0.9em">
                Operations that read a variable or attribute, modifies it, and then writes it back are not thread safe.
              </ListItem>
              <CodePane
                margin="20px"
                lang="python"
                source={require("raw-loader!../assets_code/unsafe.example")}
              />
            </List>
        </Slide>

        {/* Example counter without locks */}
        <CodeSlide
          transition={[]}
          lang="js"
          textSize=".6em"
          code={require("raw-loader!../code_examples/counter.py")}
          ranges={[
            { loc: [0, 28] },
            { loc: [0, 6], note: "We create 4 threads" },
            { loc: [8, 13], note: "Each thread should increment the counter 25000" },
            { loc: [14, 28] }
          ]}
        />

        {/* Output counter without locks */}
        <Slide transition={[ "spin", "slide" ]}>
          <Terminal title="1. abautista@MBP-de-Alberto: ~(zsh)" output={[
            "python3 counter.py",
            <div style={ { color: "#33B969" } }>Counter value: 865163 Expected: 1000000</div>,
            "python3 counter.py",
            <div style={ { color: "#33B969" } }>Counter value: 759201 Expected: 1000000</div>,
            "python3 counter.py",
            <div style={ { color: "#33B969" } }>Counter value: 799588 Expected: 1000000</div>
          ]}
          />
        </Slide>

        {/* Locks */}
        <Slide>
          <Heading size={2}>Locks</Heading>
          <List>
            <ListItem textSize="0.8em">Locks are the most fundamental synchronization mechanism.</ListItem>
            <ListItem textSize="0.8em">Used to synchronize threads so that only can make modifications to shared data at any given time.</ListItem>
            <ListItem textSize="0.8em">
              For each shared resouce, create a Lock object. When you need to access the resource, call adquire to hold the lock, and
              release to release it.
            </ListItem>
            <CodePane
              margin="20px"
              lang="python"
              source={require("raw-loader!../assets_code/locks.example")}
            />
          </List>
        </Slide>

        {/* Example counter with Locks */}
        <CodeSlide
          lang="js"
          textSize=".6em"
          code={require("raw-loader!../code_examples/counter_lock.py")}
          ranges={[
            { loc: [0, 34] },
            { loc: [6, 7], note: "Create a lock" },
            { loc: [9, 18], note: "Acquire the lock before access the shared resource" },
            { loc: [18, 33] }
          ]}
        />

        {/* Output counter without locks */}
        <Slide transition={[ "spin", "slide" ]}>
          <Terminal title="1. abautista@MBP-de-Alberto: ~(zsh)" output={[
            "python3 counter_lock.py",
            <div style={ { color: "#33B969" } }>Counter value: 100000 Expected: 1000000</div>,
            "python3 counter_lock.py",
            <div style={ { color: "#33B969" } }>Counter value: 100000 Expected: 1000000</div>,
            "python3 counter_lock.py",
            <div style={ { color: "#33B969" } }>Counter value: 100000 Expected: 1000000</div>
          ]}
          />
        </Slide>

        {/* Problems with simple locking I */}
        <Slide>
          <Heading size={2}>Problems with simple locking</Heading>
          <List>
            <ListItem textSize="0.8em">
              The standard lock object doesn't care which thread is holding the lock.
            </ListItem>
          </List>
          <CodePane
            margin="20px"
            lang="python"
            source={require("raw-loader!../assets_code/locks-problem.example")}
          />
          <List>
            <ListItem textSize="0.8em">
              Both functions use locking to make sure no other thread can modify the resource.
            </ListItem>
          </List>
        </Slide>

        {/* Problems with simple locking II */}
        <Slide>
          <Heading size={2}>Problems with simple locking</Heading>
          <List>
            <ListItem textSize="0.8em">
              Now we need another method that needs to call the other two.
            </ListItem>
          </List>
          <CodePane
            margin="20px"
            lang="python"
            source={require("raw-loader!../assets_code/locks-problem-2.example")}
          />
          <Appear>
            <List>
              <ListItem textSize="0.8em">
                But if another thread modifies the resource between the two calls, we may have problems.
              </ListItem>
            </List>
          </Appear>

          <Appear>
            <List>
              <ListItem textSize="0.8em">
                And this doesn't work either...
              </ListItem>
            </List>
          </Appear>

          <Appear>
            <CodePane
              lang="python"
              source={require("raw-loader!../assets_code/locks-problem-3.example")}
            />
          </Appear>
        </Slide>

        {/* RLocks */}
        <Slide>
          <Heading size={2}>RLocks</Heading>
          <List>
            <ListItem textSize="0.8em">
              The RLock is a version of simple locking that only blocks if the lock is held by another thread.
            </ListItem>
          </List>
          <CodePane
            margin="20px"
            lang="python"
            source={require("raw-loader!../assets_code/rlocks.example")}
          />
          <List>
            <ListItem textSize="0.8em">
              To fix the access methods in the previous example, just replace the simple lock with a rlock, and it will
              work just fine.
            </ListItem>
          </List>
          <CodePane
            margin="20px"
            lang="python"
            source={require("raw-loader!../assets_code/rlocks-fixed.example")}
          />
          <List>
            <ListItem textSize="0.8em">
              You still need to call release for each call to acquire.
            </ListItem>
          </List>
        </Slide>

        {/* Semaphores */}
        <Slide>
          <Heading size={2}>Semaphores</Heading>
          <List>
            <ListItem>
              A semaphore has an internal counter rather than a lock flag.
              This allows multiple threads to access the same code section at the same time.
            </ListItem>
          </List>
          <CodePane
            margin="20px"
            lang="python"
            source={require("raw-loader!../assets_code/semaphores.example")}
          />

          <List>
            <ListItem>
              The counter is decremented when the semaphore is acquired, and
              incremented when is released.
            </ListItem>

          </List>
        </Slide>

        {/* Semaphores II*/}
        <Slide>
          <Heading size={2}>Semaphores</Heading>
          <List>
            <ListItem>
              Semaphores are typically used to limit access to resource with limited capacity.
            </ListItem>
            <ListItem>
              Python's threading module provides two semaphore implementations.
            </ListItem>
            <ListItem>
              The Semaphore class provides an unlimited semaphore which allows you to call release any number of times to increment the counter
            </ListItem>
            <ListItem>
              The BoundedSemaphore class, which considers it to be an error to call release more often than you’ve called acquire
            </ListItem>
          </List>
        </Slide>

        {/* Conclusions */}
        <Slide>
          <Heading size={2}>Remember...</Heading>
          <List>
            <ListItem>
              Creating threads is easy.
            </ListItem>
            <ListItem>
              Working with all of the sync primitives gets tricky very quicky...
            </ListItem>
            <ListItem>
              Programming with threads is HARD.
            </ListItem>
          </List>
          <Appear>
            <Image src={images.meme}/>
          </Appear>
        </Slide>

        {/* Consumer/Pruducer */}
        <Slide>
          <Heading size={2}>Threads and Queues</Heading>
          <List>
            <ListItem textSize="0.8em">
              Threaded programs are easier to manage if they can be organized into
              producer/consumer components connected by queues.
            </ListItem>
          </List>
          <Image src={images.producerConsumer} />
          <List>
            <ListItem textSize="0.8em">Instead of sharing data, threads only coordinate by sending data to each other</ListItem>
            <ListItem textSize="0.8em">You don't need locks here.</ListItem>
          </List>
        </Slide>

        {/* RFCs threadpool */}
        <CodeSlide
          transition={[]}
          lang="js"
          textSize=".6em"
          code={require("raw-loader!../code_examples/rfcs_threadpool.py")}
          ranges={[
            { loc: [0, 12], note: "We import the Queue class" },
            { loc: [14, 22] },
            { loc: [25, 34] },
            { loc: [35, 47] },
            { loc: [48, 59] },
            { loc: [61, 66] }
          ]}
        />

        {/* CPU bound tasks */}
        <Slide>
          <Heading size={2}>What about CPU bound taks?</Heading>
            <List>
              <ListItem textSize="0.8em">Example: Calculate the fibonacci sequence</ListItem>
              <ListItem textSize="0.8em">
                First I'll caluclate it sequentilly, and then we'll use a threadpool.
              </ListItem>
              <ListItem textSize="0.8em">
                Will we take adventage of the various CPU cores?
              </ListItem>
            </List>
        </Slide>

        <CodeSlide
          transition={[]}
          lang="js"
          textSize=".6em"
          code={require("raw-loader!../code_examples/fib.py")}
          ranges={[
            { loc: [0, 10] },
            { loc: [10, 22] }
          ]}
        />

        <CodeSlide
          transition={[]}
          lang="js"
          textSize=".6em"
          code={require("raw-loader!../code_examples/fib_threadpool.py")}
          ranges={[
            { loc: [0, 14] },
            { loc: [14, 26] },
            { loc: [27, 45] }
          ]}
        />

      {/* Output  fib */}
        <Slide transition={[ "spin", "slide" ]}>
          <Terminal title="1. abautista@MBP-de-Alberto: ~(zsh)" output={[
            "python3 fib.py",
            <div style={ { color: "#33B969" } }>time: 5.63s</div>,
            "python3 fib_threadpool.py",
            <div style={ { color: "#33B969" } }>time: 7.16s</div>
          ]}
          />
          <Appear>
            <Image src={images.memeSparta} />
          </Appear>
        </Slide>

        {/* The GIL */}
        <Slide>
          <Heading size={2}>The GIL</Heading>
          <List>
              <ListItem textSize="0.8em">
                The standard implementation of Python is called CPython.
              </ListItem>
              <ListItem textSize="0.8em">
                CPython compiles the source into bytecode. Then, it runs the bytecode using an interpreter.
              </ListItem>
              <ListItem textSize="0.8em">
                The interpreter maintains a state.
              </ListItem>
              <ListItem textSize="0.8em">
                To maintain coherent the state, one thread can not be interrups another thread in execution.
              </ListItem>
              <ListItem textSize="0.8em">
                The GIL ensures that each thread has exclusive access to the entire interpreter internals when it's running.
              </ListItem>
          </List>

          <Appear>
            <Image src={images.gil} />
          </Appear>
        </Slide>

        <Slide>
          <Image src={images.metaphor} />
        </Slide>

        {/* PART 2: Multiprocessing */}
        <Slide>
          <Heading size={1} fit caps>Part 2: Multiprocessing module</Heading>
        </Slide>

        <Slide>
          <Heading size={2}>Multiprocessing</Heading>
            <List>
              <ListItem textSize="0.8em">
                Separate Python processes that do not constrain each other with GIL allow for better resource utilization.
              </ListItem>
              <ListItem textSize="0.8em">
                This is important for applications running on multicore processors that are performing really CPU-extensive tasks.
              </ListItem>
              <ListItem textSize="0.8em">
                The only built-in concurrent solution that allows you to take benefit from multiple cores.
              </ListItem>
              <ListItem textSize="0.8em">
                multiprocessing provides a portable way to work with processes as if they were threads.
              </ListItem>
            </List>
        </Slide>

        {/* PART 3: Concurrent.futures */}
        <Slide>
          <Heading size={1} fit caps>Part 3: Concurrent.futures module</Heading>
        </Slide>

        {/* Executor, ThreadPoolExecutor, ProcessPoolExecutor */}
        <Slide>
          <Heading size={2}>concurrent.futures</Heading>
          <List>
            <ListItem textSize="0.8em">The concurrent.futures module was added in Python 3.2</ListItem>
            <ListItem textSize="0.8em">Concurrent.futures includes an abstract class called Executor</ListItem>
            <ListItem textSize="0.8em">
              Executor has two subclasses ThreadPoolExecutor and ProcessPoolExecutor.
            </ListItem>
            <ListItem textSize="0.8em">
              These two subclasses are mapped to Python's threading and multiprocessing APIs repectively.
            </ListItem>
          </List>
        </Slide>

        {/* Example ThreadPoolExecutor */}
        <CodeSlide
          transition={[]}
          lang="js"
          textSize=".6em"
          code={require("raw-loader!../code_examples/rfcs_threadpool_executor.py")}
          ranges={[
            { loc: [0, 23] },
            { loc: [25, 34] },
            { loc: [36, 39] },
            { loc: [41, 46] }
          ]}
        />

        {/* PART 4: Asyncio */}
        <Slide>
          <Heading size={1} fit caps>Part 4: Asyncio</Heading>
        </Slide>

        <Slide>
          <Heading size={2}>Asynchronous programming</Heading>
          <List>
            <ListItem textSize="0.8em">
              Guido van Rossum developed asyncio outside of the Python repository and gave the project a code name of Tulip.
            </ListItem>
            <ListItem textSize="0.8em">
              Tulip was renamed to asyncio when it was added to the standar library in Python 3.4
            </ListItem>
            <ListItem textSize="0.8em">
              The easiest way to think about this approach as something similar to threads but without system
              scheduling involved.
            </ListItem>
            <ListItem textSize="0.8em">
              We do not deal with threads or processes . Instead, we have multiple tasks that release the control
              to the single function_ that handles the coordination of tasks.
            </ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading size={2} fit caps>Async and await keywords</Heading>
            <List>
              <ListItem textSize="0.8em">
                The async and await keywords are the main building blocks in Python asynchronous programming.
              </ListItem>
              <ListItem textSize="0.8em">
                The async keyword used before the def statement defines a new coroutine.
              </ListItem>
            </List>
            <CodePane
              lang="python"
              source={require("raw-loader!../assets_code/coroutine.example")}
            />
            <List>
              <ListItem textSize="0.8em">
                The async and await keywords are the main building blocks in Python asynchronous programming.
              </ListItem>
              <ListItem textSize="0.8em">
                The coroutine object does not do anything until its execution is scheduled in the event loop.
              </ListItem>
            </List>
        </Slide>

        <Slide>
          <Heading size={2} fit caps>Async and await keywords</Heading>
          <CodePane
            lang="python"
            source={require("raw-loader!../assets_code/event_loop.example")}
          />
          <List>
            <ListItem textSize="0.8em">
              New tasks can be added to the loop by calling the loop.create_task() method
                or by providing another object to wait for using the asyncio.wait() function_
            </ListItem>
            <ListItem textSize="0.8em">
              The second important keyword added in Python 3.5 is await. It is used to wait for
              the results of coroutine and release the control over execution to the event loop.
            </ListItem>
            <ListItem textSize="0.8em">
              Let's see an example.
            </ListItem>
          </List>
        </Slide>

        {/* Example asyncio */}
        <CodeSlide
          transition={[]}
          lang="js"
          textSize=".6em"
          code={require("raw-loader!../code_examples/rfcs_async.py")}
          ranges={[
            { loc: [0, 22] },
            { loc: [23, 33] },
            { loc: [38, 33] },
            { loc: [34, 46] },
            { loc: [36, 27], note: "event loop" },
            { loc: [38, 39], note: "create the task" }
          ]}
        />

        {/* Summary */}
        <Slide>
          <Heading size={2}>Summary</Heading>
          <List>
            <ListItem textSize="0.8em">
              threading: build your own solution based on thread, semaphores and locks.
            </ListItem>
            <ListItem textSize="0.8em">
              multiprocessing: similar to threading, but for processes.
            </ListItem>
            <ListItem textSize="0.8em">
              concurrent.fututes: high level abstractions. ThreadPoolExecutor and ProcessPoolExecutor
            </ListItem>
            <ListItem textSize="0.8em">
              asyncio: Event loops, asynchronous IO
            </ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading size={2}>Thank you!</Heading>
        </Slide>
      </Deck>
    );
  }
}
