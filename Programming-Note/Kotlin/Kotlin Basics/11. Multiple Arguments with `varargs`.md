In Kotlin, you can pass a variable number of arguments to a function using the `varargs` keyword. This is equivalent to the varargs in Java, allowing you to pass an array of values or a list of values as individual arguments.

### Declaring `varargs`

The `varargs` parameter must always be the last parameter in the function.

### Example:

```kotlin
fun printNumbers(vararg numbers: Int) {
    for (number in numbers) {
        println(number)
    }
}
```

In the above example, the `printNumbers` function takes a variable number of `Int` arguments. You can call this function with any number of integers.

### Calling `varargs` Function:

```kotlin
printNumbers(1, 2, 3, 4, 5)
```

Output:

```
1
2
3
4
5
```

### Using Arrays with `varargs`

You can also pass an array to a `varargs` function by using the spread operator (`*`) to unpack the array.

```kotlin
val numbersArray = intArrayOf(1, 2, 3)
printNumbers(*numbersArray)
```

The spread operator (`*numbersArray`) unpacks the array and passes its individual elements to the function.