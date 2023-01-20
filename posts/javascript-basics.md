---
title: "JavaScript Basics"
date: "2023-01-19"
---

## What are Objects in JavaScript?

Objects in JavaScript, just as in many other programming languages, can be compared to objects in real life. In JavaScript, an object is a standalone entity, with properties and type. Compare it with a cup, for example. A cup is an object, with properties.

A cup has a color, a design, weight, a material it is made of, etc. The same way, JavaScript objects can have properties, which define their characteristics.

Here, take a look at this myHonda Object.

    const myHonda = {
	    color: "red",
	    wheels: 4,
	    engine: { cylinders: 4, size: 2.2 },
    };

**Get Values from an Object: `Object.values()`**
Return an array of the values of an object.

    const myCar = Object.values(myHonda);
    console.log(myCar) //["red", 4, {cylinders: 4, size: 2.2}]

**Get keys from an Object: `Object.keys()`**
Return an array of the keys of an object.


**Object To Array Entries: `Object.entries()`**
Creates an array which contains arrays of key/value pairs of an object.