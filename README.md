# Instrumental EventCounter

This is a library for Instrumental's take home assignment done in Javascript. It is an event counter that will keep track of how many times an event occurs over a span of time.

## How it works

When an instance of the Event Counter is created, the constructor will take in a parameter that declares the upper bound of the Event Counter. Once the upper bound is set, it will begin creating a linked list which contains the number of signals received per second. Every second a new node is created with the count of how many times a signal was received during that second and added to the linked list. When the linked list's size reaches the upper bound (in seconds), it will remove the current head of the linked list and update it to be it's next node, preventing memory leakage and saving memory space.

While the Event Counter is running, you may send as many signals as you'd like. So long as you can send it fast enough, it is possible to send thousands of signals and have it store the count inside one node.

You may also grab the count of how many signals were received within a specified time span. The method will start at the end of the linked list and read through the linked list backwards given the amount of seconds to go back to. While traversing through the linked list, it calculates the sum of the counts and return the value.

There are also features that allow you to debug while working with the Event Counter.


## How to use

First, ensure that you have the latest npm and node installed. During creation of this library, I was using npm v6.14.4 and node v13.12.0

Now download the library by manually downloading it directly from github or by using

```
git clone https://github.com/starmon00/InstrumentalEventCounter.git
```

Once downloaded go into the root folder and run npm install

```
~/ cd <pathToFolder>/InstrumentalEventCounter
npm install
```

Once installed, you may import the eventCounter

```
import { EventCounter } from '../eventCounter.js';
```

Now that we have imported the library into the script, create a new instance of the Event Counter. Once the instance is created, the EventCounter will immediately begin listening for signals.

```
const eventCounter = new EventCounter();
```

From here you may use any of the methods listed in the methods section. The core methods you would want to use are the following:

To send a signal:

```
eventCounter.sendSignal();
```

To get the count:
```
eventCounter.getCount();
```

## Methods

### EventCounter() (constructor)

This function is regarding the constructor of the Event Counter class. It will take in a parameter that represents what the upper bound of the Event Counter should be. The upper bound will determine how far back the Event Counter will search for the total count as well as determine the size of the linked list that is created.

#### Parameters
| Name       | Optional | Type    | Description |
| ---------- |:--------:|:-------:|-----------------------------------------------------------------------------------------|
| upperBound | Yes | Integer | Sets the upper bound of the EventCounter. upperBound are miliseconds and must be greater than zero. If no upperBound is given, it will default to 300,000ms (5 mins) |

#### Responses
| Response   | Description |
| ---------- |----------------------------------------------------------------------------------------------|
| class EventCounter Object | Returns an instance of the EventCounter class indicating successful creation. |


#### Errors
| Error message | Description |
| --------------------------------- |------------------------------------------------------------------------------------------|
| Sorry, the upper bound must be a number. | Indicates upper bound was not a type of number. Check your input type.                    |
| Sorry, the upper bound must be greater than 0. | Indiciates your upper bound was less than or equal to zero. Check your input value. |


#### Example

```
const eventCounter = new EventCounter();
console.log(eventCounter.upperBound) // 300,000

const eventCounter = new EventCounter(1000);
console.log(eventCounter.upperBound) // 1000

try {
  const eventCounter = new EventCounter('a');
} catch (e) {
  console.log(e) // Sorry, the time must be a number.
}

try {
  const eventCounter = new EventCounter(0);
} catch (e) {
  console.log(e) // Sorry, the time must be greater than 0.
}

```
### sendSignal()

This method will trigger the Event Counter's counter to go up by 1. It does not take in any parameters and will ignore any parameters that is sent to it. Should it fail to increment the counter, it will throw an error with the description of the issue.

#### Parameters
  None

#### Responses
  None


#### Errors
| Error message | Description |
| --------------------------------- |------------------------------------------------------------------------------------------|
| Failed to update counter. Please try again. | Indicates the method failed to update the counter in the Event Counter.        |


#### Example

```
const eventCounter = new EventCounter();
eventCounter.sendSignal();
```

### getCount()

This method will return the number of signals that was received over a time span. It will take in a parameter that represents a time in seconds. This method will read from the end of the linked list and work its way back by the time given since each node represents 1 second in time. 

#### Parameters
| Name       | Optional | Type    | Description                                           |
| ---------- |:--------:|:-------:|-------------------------------------------------------|
| time       | Yes      | Integer | The time in seconds to know how far back to search. If no parameter is set, it will default to the upper bound.|

#### Responses
| Response   | Description                                                                             |
| ---------- |-----------------------------------------------------------------------------------------|
| Integer    | Returns an integer which represents the number of signals received within the timespan. |


#### Errors
| Error message                                                                     | Description                                                                               |
| --------------------------------------------------------------------------------- |-------------------------------------------------------------------------------------------|
| Sorry, the time must be a number.                                                 | Indicates the input time was not a type of number. Check your input type. |
| Sorry, the time must be greater than 0.                                           | Indiciates the input time was less than or equal to the lowerBound (0). Check your input value. |
| Sorry, the time must be less than or equal to the upper bound {upperBound value}. | Indiciates the input time was greater than the upperBound set for the EventCounter. Check your input value. |

#### Example

```
const eventCounter = new EventCounter(); // upperBound: 300,000
.
.
.
// After 5 mins
eventCounter.sendSignal();
eventCounter.getCount(); // 1

try {
    eventCounter.getCount('a');
} catch (e) {
  console.log(e) // Sorry, the time must be a number.
}

try {
    eventCounter.getCount(0);
} catch (e) {
  console.log(e) // Sorry, the time must be greater than 0.
}

try {
    eventCounter.getCount(500000);
} catch (e) {
  console.log(e) // Sorry, the time must be less than or equal to the upper bound 300000.
}
```

## Test Cases

This library comes with a set of test cases that ensure the library is working properly. You are free to modify the library and the test cases to your liking. I also included some helper methods in Event Counter that can be used to assist in debugging any issues you may have.

To run the testing script, simply execute

```
npm test
```

This will trigger the Javascript testing framework Mocha and run all the tests.
You can also call a test individually by using

```
npm test -- -g "<The test name>"
```

### setStop()

This method will change the state of the Event Counter so that it will stop listening for signals.

#### Example

```
const eventCounter = new EventCounter(); // upperBound: 300,000
eventCounter.setStop();
```

### showLinkedList()

This method will print out the entire LinkedList.

#### Example

```
const eventCounter = new EventCounter(); // upperBound: 300,000
eventCounter.showLinkedList();

/*
<ref *1> Node {
  date: 2020-04-22T23:45:08.255Z,
  count: 0,
  next: Node {
    date: 2020-04-22T23:45:09.255Z,
    count: 1,
    next: null,
    previous: [Circular *1]
  },
  previous: null
}
<ref *1> Node {
  date: 2020-04-22T23:45:09.255Z,
  count: 1,
  next: null,
  previous: Node {
    date: 2020-04-22T23:45:08.255Z,
    count: 0,
    next: [Circular *1],
    previous: null
  }
}
*/
```

