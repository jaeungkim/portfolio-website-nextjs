---
title: "Remove Outermost Parentheses (Leetcode)"
subtitle: "Leetcode daily question (easy)"
date: "2023-03-18"
summary: "Given a valid parentheses string s, Return s after removing the outermost parentheses of every primitive string in the primitive decomposition of s."
tags: ["Leetcode"]
---

Given a valid parentheses string `s`, Return `s` after removing the outermost parentheses of every primitive string in the primitive decomposition of  `s`.

**Example 1:**

```js
Input: s = "(()())(())"
Output: "()()()"
Explanation:
The input string is "(()())(())", with primitive decomposition "(()())" + "(())".
After removing outer parentheses of each part, this is "()()" + "()" = "()()()".
```

**Example 2:**

```js
Input: s = "(()())(())(()(()))"
Output: "()()()()(())"
Explanation:
The input string is "(()())(())(()(()))", with primitive decomposition "(()())" + "(())" + "(()(()))".
After removing outer parentheses of each part, this is "()()" + "()" + "()(())" = "()()()()(())".
```

**Example 3:**

```js
Input: s = "()()"
Output: ""
Explanation:
The input string is "()()", with primitive decomposition "()" + "()".
After removing outer parentheses of each part, this is "" + "" = "".
```

## APPROACH

We are going to use java’s StringBuilder to build string as we iterate through the input string of `s`.

Next, for each iteration, we’ll append to the output variable based on these conditions.

```js
1\. if (c == '(' && count++ > 0) output.append(c);
2\. if (c == ')' && count-- > 1) output.append(c);
```

Finally, we will output the built string with output.toString();

## SOLUTION

```js
class Solution {
  public String removeOuterParentheses(String s) {
      StringBuilder output = new StringBuilder();
      int count = 0;

      for(char c : s.toCharArray()){
        if (c == '(' && count++ > 0) output.append(c);
        if (c == ')' && count-- > 1) output.append(c);
      }
      return output.toString();
  }
}
```