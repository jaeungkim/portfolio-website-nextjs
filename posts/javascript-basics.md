---
title: "JavaScript Array and Object Methods"
date: "2020-01-20"
---
# What are Objects in JavaScript?
Objects in JavaScript, just as in many other programming languages, can be compared to objects in real life. In JavaScript, an object is a standalone entity, with properties and type. Compare it with a cup, for example. A cup is an object, with properties.

> A cup has a color, a design, weight, a material it is made of, etc. The same way, JavaScript objects can have properties, which define their characteristics.

```js
const myHonda = {
  color: "red",
  wheels: 4,
  engine: { cylinders: 4, size: 2.2 },
};
```

Here, we created myHonda object with color, wheels, and engine properties.

Now, we will look at some object basics and its manipulation methods.

## Return array of values from an Object: [Object.values()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)

```js
const coffee = {
  roast: "dark",
  type: "black",
  price: 3.0,
};

const coffeeStat = Object.values(coffee);

//coffeeStat will return ['dark','black',3.0]
```

## Return array of keys from an Object: [Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
```js
const coffee = {
  roast: "dark",
  type: "black",
  price: 3.0,
};

const coffeeKeys = Object.keys(coffee);

//coffeeKey will return ['roast','type','price']
```

## Return an array of keys+values: [Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)

```js
const coffee = {
  roast: "dark",
  type: "black",
  price: 3.0,
};

const entries = Object.entries(coffee);

//entries will return [['roast','dark'],['type','black'],['price',3.0]]
```

## Merging Object with Spread:

```js
const firstArray = [1, 2, 3, 4];
const secondArray = [5, 6, 7, 8];

const combined = [...firstArray, ...secondArray];
// combined will be equal to [1, 2, 3, 4, 5, 6, 7, 8]
```

# What are Arrays?

## Create a new array based on the condition of a given array: [.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

**Example**

Create an array of coffee that’s not over $4

```js
const coffees = [3.2, 5.6, 1.2, 5.2, 2.2, 6.3];
const cheapCoffees = coffees.filter((coffee) => coffee < 4); // cheapCoffees will be equal to [3.2, 1.2, 2.2]
```

## Create a new array by manipulating the values of a given array: [.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

**Example**

Create an array that adds $ to the beginning of each price of coffee.

```js
const coffees = [3.2, 5.6, 1.2, 5.2, 2.2, 6.3];
const coffeePrice = coffees.map((coffee) => "$" + coffee);
// coffeePrice will be equal to [$3.2, $5.6, $1.2, $5.2, $2.2, $6.3]
```

## Add up the integers in an array (sum): [.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

**Example**

Output the sum of the coffee

```js
const coffees = [3.2, 5.6, 1.2, 5.2, 2.2, 6.3];
const total = coffees.reduce(
  (accumulator, currentValue) => accumulator + currentValue
);
// total will be equal to 23.7
```

## Check if any item in an array passes the condition. return boolean. [.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

**Example**

check if there is a coffee price of 1.2 in an array

```js
const coffees = [3.2, 5.6, 1.2, 5.2, 2.2, 6.3];
const containsPrice = coffees.some((coffee) => coffee === 1.2);
// containsPrice will return true
```

## Check if all items in an array pass the condition. return boolean. [.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

**Example**

check if all coffee price exceeds a dollar.

```js
const coffees = [3.2, 5.6, 1.2, 5.2, 2.2, 6.3];
const allCoffee = coffees.every((coffee) => coffee > 1.0);
// allCoffee will return true
```

## Check if an array contains a certain value. It’s similar to [.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some), but instead of checking a condition, it looks for a specific value.

**Example**

check if the coffee price of 6.3 is in the array

```js
const coffees = [3.2, 5.6, 1.2, 5.2, 2.2, 6.3];
const coffeePrice = coffees.includes(6.3);
// coffeePrice will return true
```

_References:_

1.  [_Useful Javascript Array and Object Methods_](https://codeburst.io/useful-javascript-array-and-object-methods-6c7971d93230)
2.  [_JavaScript reference_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)
3.  [_Objects: the basics_](https://javascript.info/object-basics)

Last Edit: 2020-01-23