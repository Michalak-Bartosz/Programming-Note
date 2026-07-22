---
tags:
  - interview
  - java
  - grind-75
  - documentation
---
# 2. Valid Parentheses

## 1. Problem Statement

Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

---

* **Example 1:**

_Input:_ s = `"()"`

_Output:_ `true`

---

* **Example 2:**

_Input:_ s = `"()[]{}"`

_Output:_ `true`

---

* **Example 3:**

_Input:_ s = `"(]"`

_Output:_ `false`

---

* **Example 4:**

_Input:_ s = `"([])"`

_Output:_ `true`

---

* **Example 5:**

_Input:_ s = `"([)]"`

_Output:_ `false`

## 2. Solution

**Approach:** Use a stack to keep track of opening brackets. For each character in the string, if it's an opening bracket, push the corresponding closing bracket onto the stack. If it's a closing bracket, check if it matches the top of the stack. If it doesn't match or the stack is empty when we encounter a closing bracket, the string is invalid. At the end, if the stack is empty, the string is valid.

**Time Complexity:** O(n) - single pass through the string

**Space Complexity:** O(n) - stack storage

=== "Java"

    The solution uses a `Stack` to keep track of opening brackets. For each character in the string, if it's an opening bracket, we push the corresponding closing bracket onto the stack. If it's a closing bracket, we check if it matches the top of the stack. If it doesn't match or the stack is empty when we encounter a closing bracket, the string is invalid. At the end, if the stack is empty, the string is valid.

    ```java
    class Solution {
        public boolean isValid(String s) {
            Stack<Character> stack = new Stack<>();
            for (char c : s.toCharArray()) {
                if (c == '(') {
                    stack.push(')');
                } else if (c == '{') {
                    stack.push('}');
                } else if (c == '[') {
                    stack.push(']');
                } else if (stack.isEmpty() || stack.pop() != c) {
                    return false;
                }
            }
            return stack.isEmpty();
        }
    }
    ```

=== "Kotlin"

    The solution uses a `MutableList` as a stack to keep track of opening brackets. For each character in the string, if it's an opening bracket, we add the corresponding closing bracket to the list. If it's a closing bracket, we check if it matches the last element in the list. If it doesn't match or the list is empty when we encounter a closing bracket, the string is invalid. At the end, if the list is empty, the string is valid.
    
    ```kotlin
    class Solution {
        fun isValid(s: String): Boolean {
            val stack = mutableListOf<Char>()
            for (c in s) {
                when (c) {
                    '(' -> stack.add(')')
                    '{' -> stack.add('}')
                    '[' -> stack.add(']')
                    else -> {
                        if (stack.isEmpty() || stack.removeAt(stack.size - 1) != c) {
                            return false
                        }
                    }
                }
            }
            return stack.isEmpty()
        }
    }
    ```