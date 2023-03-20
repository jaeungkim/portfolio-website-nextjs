---
title: "Promises in JavaScript"
subtitle: "what-is-promise"
date: "2023-01-31"
summary: "Prior to promises events and callback functions were used but they had limited functionalities and created unmanageable code. Multiple callback functions would create a callback hell that leads to unmanageable code. Events were not good at handling asynchronous operations."
tags: ["JavaScript"]
---

# Promises in JavaScript (JS)

Figure 1.1: Promises Can be Resolved or Rejected

# **What is Promise in JavaScript?**

> **A promise is an object that may produce a single value sometime in the future.** Either a resolved value or a rejected value.

A promise is a good way to handle **asynchronous** operations. It is used to find out if the asynchronous operation is successfully completed or not.

Prior to promises events and callback functions were used but they had limited functionalities and created unmanageable code. Multiple callback functions would create a callback hell that leads to unmanageable code. Events were not good at handling asynchronous operations.

**_In other words, Promise makes JavaScript behave asynchronously, which makes this language versatile._**

# How Promises Work?

_Let's understand this with an example:_

Suppose that you promise to gain 10kgs weight by next month.

You don’t know if you will spend your time and effort to gain weight until next month or not.

Fig 1.2: Process of Promises

**_Promise has three possible states:_**

- **_Pending:_** You don’t know if you will gain 10kg by the next month.
- **_Resolved/Fulfilled:_** You gained10kgs by the next month.
- **_Rejected:_** You don’t gain weight at all.

A promise **_starts in the pending state_**, which **_indicates that the Promise hasn’t been completed yet_**. It **_ends with either resolved/fulfilled_** (successful) **_or rejected_** (failed) state.

> **_Benefits of Promises_**

1.  Improves Code Readability
2.  Better handling of asynchronous operations
3.  Better flow of control definition in asynchronous logic
4.  Better Error Handling

# JavaScript Promise Chaining

Fig 1.3: Working of JavaScript promise chaining

Promises are useful when you have to handle more than one asynchronous task, one after another. For that, we use promise chaining.

You can perform an operation after a promise is resolved using methods `then()`, `catch()` and `finally()`.

The `then()` method is used with the callback when the promise is successfully fulfilled or resolved.

The syntax of `then()` the method is:

```
promiseObject.then(onFulfilled, onRejected);
```

# JavaScript catch() method

The `catch()` method is used with the callback when the promise is rejected or if an error occurs.

# Creating and Using A Promise Step by Step:-

Firstly, we use a constructor to create a Promise object:

```js
const myPromise = new Promise();
```

It takes two parameters, one for success (resolve) and one for fail (reject):

```js
const myPromise = new Promise((resolve, reject) => {
  // condition
});
```

Finally, there will be a condition. If the condition is met, the Promise will be resolved, otherwise it will be rejected:

```js
const myPromise = new Promise((resolve, reject) => {
    let condition;

    if(condition is met) {
        resolve('Promise is resolved successfully.');
    } else {
        reject('Promise is rejected');
    }
});
```

So we have created our first Promise. Now let’s use it.

# then( ) for resolved Promises:

If you revisit the Fig1.2 in this post, you’ll see that there are 2 cases: One for resolved promises and one for rejected. If the Promise gets resolved (success case), then something will happen next (depends on what we do with the successful Promise).

```js
myPromise.then();
```

The then( ) method is called after the Promise is resolved. Then we can decide what to do with the resolved Promise.

For example, let’s log the message to the console that we got from the Promise:

```js
myPromise.then((message) => {
  console.log(message);
});
```

# catch( ) for rejected Promises:

However, the then( ) method is only for resolved Promises. What if the Promise fails? Then, we need to use the catch( ) method.

Likewise, we attach the then( ) method. We can also directly attach the
catch( ) method right after then( ):

```js
myPromise
  .then((message) => {
    console.log(message);
  })
  .catch((message) => {
    console.log(message);
  });
```

So if the promise gets rejected, it will jump to the catch( ) method and this time we will see a different message on the console.

## To create a promise in JavaScript, you can use the Promise constructor as shown below:

```js
let prom = new Promise((resolve, reject) => {
  let num = 10 + 10;
  if (num === 20) {
    resolve("This resolve should come in the then block");
  } else {
    reject("This reject should come in the catch block");
  }
});
prom
  .then((msg) => console.log("then block -->", msg))
  .catch((msg) => console.log("catch block -->", msg));
```

when we run the above code we get the following output:

```js
'''then block --> This resolve should come in the then block'''
```

As, `10 + 10 = 20` the `num = 20` so it will execute `if(){}` block and it will `resolve` the promise. If we change `num = 10 + 10` to `num = 10 + 1` and keep the rest of the code the same we will get the following output as it will execute the `else{}` block and it will `reject` the promise.

```js
'''catch block --> This reject should come in the catch block'''
```

# Async / Await Promises

Now, let's take a look at some examples of asynchronous operations.

```js
// #1
console.log("Hello");
// #2
setTimeout(function () {
  console.log("Bye");
}, 3000);
// #3
console.log("Hello Again");
```

비동기 처리에 대한 이해가 없는 상태에서 위 코드를 보면 아마 다음과 같은 결과값이 나올 거라고 생각할 겁니다.

```
‘Hello’ 출력
3초 있다가 ‘Bye’ 출력
‘Hello Again’ 출력
```

그런데 실제 결과 값은 아래와 같이 나오죠.

```
‘Hello’ 출력
‘Hello Again’ 출력
3초 있다가 ‘Bye’ 출력
```

setTimeout() 역시 비동기 방식으로 실행되기 때문에 3초를 기다렸다가 다음 코드를 수행하는 것이 아니라 일단 setTimeout()을 실행하고 나서 바로 다음 코드인 console.log('Hello Again');으로 넘어갔습니다. 따라서, ‘Hello’, ‘Hello Again’를 먼저 출력하고 3초가 지나면 ‘Bye’가 출력됩니다.

## References

1.  [_Promises in JavaScript (JS)_](https://kkirtigoel01.medium.com/promises-in-javascript-js-27baf0e506b5#:~:text=Resolved%20or%20Rejected-,What%20is%20Promise%20in%20JavaScript%3F,is%20successfully%20completed%20or%20not.)
2.  [_Compare async/await versus then()_](https://www.smashingmagazine.com/2020/11/comparison-async-await-versus-then-catch/)
    Last Edit: 2020-01-31
