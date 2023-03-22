---
title: "Valid Parentheses (Leetcode)"
subtitle: "Leetcode daily question (easy)"
date: "2023-03-16"
summary: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid."
tags: ["Leetcode", "Java"]
---

Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:

1.  Open brackets must be closed by the same type of brackets.
2.  Open brackets must be closed in the correct order.
3.  Every close bracket has a corresponding open bracket of the same type.

**Example 1:**

```js
Input: s = "()";
Output: true;
```

**Example 2:**

```js
Input: s = "()[]{}";
Output: true;
```

**Example 3:**

```js
Input: s = "(]";
Output: false;
```

## APPROACH

I am going to use **HashMap** to store the brackets and use **Stack** to check if the brackets are valid.

First, we will initialize a character HashMap with brackets

```java
private HashMap<Character, Character> brackets;

public Solution(){

}
```

then, we'll store brackets in this hashmap

```java
this.brackets = new HashMap < Character, Character > ();
this.brackets.put(')', '(');
this.brackets.put('}', '{');
this.brackets.put('\]', '\[');
```

Now, we'll create a isValid function that takes in **String s** as a parameter and use stack to iterate through the parameter string length

```java
public boolean isValid(String s) {
  // Initialize a stack to be used in the algorithm.
  Stack<Character> stack = new Stack<Character>();

  for (int i = 0; i < s.length(); i++) {
    char c = s.charAt(i);

    // If the current character is a closing bracket.
    if (this.brackets.containsKey(c)) {

      // Get the top element of the stack. If the stack is empty, set a dummy value of '#'
      char topElement = stack.empty() ? '#' : stack.pop();

      // If the mapping for this bracket doesn't match the stack's top element, return false.
      if (topElement != this.brackets.get(c)) {
        return false;
      }
    } else {
      // If it was an opening bracket, push to the stack.
      stack.push(c);
    }
  }
  // If the stack still contains elements, then it is an invalid expression.
  return stack.isEmpty();
}
```


## SOLUTION

```java
class Solution {
  // Hash table that takes care of the mappings.
  private HashMap<Character,Character> brackets;
  // Initialize hash map with mappings. This simply makes the code easier to read.
  public Solution() {
    this.brackets = new HashMap < Character, Character > ();
    this.brackets.put(')', '(');
    this.brackets.put('}', '{');
    this.brackets.put('\]', '\[');
  }

  public boolean isValid(String s) {
    // Initialize a stack to be used in the algorithm.
    Stack<Character> stack = new Stack<Character>();

    for (int i = 0; i < s.length(); i++) {
      char c = s.charAt(i);

      // If the current character is a closing bracket.
      if (this.brackets.containsKey(c)) {

        // Get the top element of the stack. If the stack is empty, set a dummy value of '#'
        char topElement = stack.empty() ? '#' : stack.pop();

        // If the mapping for this bracket doesn't match the stack's top element, return false.
        if (topElement != this.brackets.get(c)) {
          return false;
        }
      } else {
        // If it was an opening bracket, push to the stack.
        stack.push(c);
      }
    }

    // If the stack still contains elements, then it is an invalid expression.
    return stack.isEmpty();
  }
}
```
