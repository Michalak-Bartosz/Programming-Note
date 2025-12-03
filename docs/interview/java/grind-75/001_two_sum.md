---
tags:
  - interview
  - java
  - grind-75
---

# 1. Two Sum

## 1. Problem Statement

Given an array of integers `nums` and an integer `target`, return _indices of the two numbers such that they add up to `target`_.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

---

* **Example 1:**

_Input:_ nums = `[2,7,11,15]`, target l= `9`

_Output:_ `[0,1]`

_Explanation:_ Because nums[0] + nums[1] == 9, we return [0, 1].

---

* **Example 2:**

_Input:_ nums = `[3,2,4]`, target = `6`

_Output:_ `[1,2]`

---

* **Example 3:**

_Input:_ nums = `[3,3]`, target = `6`

_Output:_ `[0,1]`

## 2. Solution

**Approach:** Use a hash map to store visited numbers and their indices. For each element, calculate the complement (target - current number) and check if it exists in the map. If found, return both indices. Otherwise, add the current number to the map.

**Time Complexity:** O(n) - single pass through the array  

**Space Complexity:** O(n) - hash map storage

=== "Java"

    The solution uses a `HashMap` to track numbers we've seen and their positions. As we iterate through the array, we check if the complement of the current number exists in the map.

    ```java
    public class TwoSum {
        public int[] twoSum(int[] nums, int target) {
            Map<Integer, Integer> numToIndex = new HashMap<>();
            for (int i = 0; i < nums.length; i++) {
                int complement = target - nums[i];
                if (numToIndex.containsKey(complement)) {
                    return new int[] { numToIndex.get(complement), i };
                }
                numToIndex.put(nums[i], i);
            }
            throw new IllegalArgumentException("No two sum solution");
        }
    }
    ```

=== "Kotlin"

    The Kotlin implementation uses a mutable map with idiomatic syntax. The `indices` property provides a clean way to iterate, and the non-null assertion operator (`!!`) is safe here since we verified the key exists.

    ```kotlin
    class TwoSum {
        fun twoSum(nums: IntArray, target: Int): IntArray {
            val numToIndex = mutableMapOf<Int, Int>()
            for (i in nums.indices) {
                val complement = target - nums[i]
                if (numToIndex.containsKey(complement)) {
                    return intArrayOf(numToIndex[complement]!!, i)
                }
                numToIndex[nums[i]] = i
            }
            throw IllegalArgumentException("No two sum solution")
        }
    }
    ```
