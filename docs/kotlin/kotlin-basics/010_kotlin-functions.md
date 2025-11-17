## 1. First Kotlin Function

A Kotlin function is defined using the `fun` keyword. A simple function that returns a value is as follows:

```kotlin
fun greet(name: String): String {
    return "Hello, $name!"
}
```

### Calling the Function

```kotlin
println(greet("Alice"))
```

Output: `Hello, Alice!`

---

## 2. Functions with Return Types

In Kotlin, every function must specify its return type. If the function doesn't return anything, the return type is `Unit` (similar to `void` in Java).

### Example of Function with Return Type:

```kotlin
fun add(a: Int, b: Int): Int {
    return a + b
}
```

The function `add()` returns an `Int`, which is the sum of `a` and `b`.

---

## 3. Functions inside of Functions

In Kotlin, you can define functions within other functions, making it possible to create local functions.

### Example:

```kotlin
fun outerFunction() {
    fun innerFunction() {
        println("This is an inner function")
    }
    innerFunction()  // Call the inner function
}
```

### Usage:

```kotlin
outerFunction()
```

Output: `This is an inner function`

---

## 4. Single Line Expressions

Kotlin allows functions to have single-expression bodies. These functions don't require the `return` keyword if they only contain a single expression.

### Example:

```kotlin
fun multiply(a: Int, b: Int): Int = a * b
```

In the above example, the function `multiply` returns the result of the expression `a * b`.

---

## 5. Function Arguments

Kotlin functions can accept multiple arguments. The arguments are passed when the function is called.

### Example with Multiple Arguments:

```kotlin
fun greetPerson(name: String, age: Int) {
    println("Hello, $name! You are $age years old.")
}
```

### Calling the Function:

```kotlin
greetPerson("Alice", 30)
```

Output: `Hello, Alice! You are 30 years old.`

---

## 6. Named Parameters

Kotlin allows you to pass arguments to functions by specifying the parameter names, making the code more readable, especially for functions with multiple parameters.

### Example:

```kotlin
fun greetPerson(name: String, age: Int) {
    println("Hello, $name! You are $age years old.")
}

greetPerson(age = 30, name = "Alice")
```

Named arguments help avoid errors when calling functions, especially if the order of parameters is incorrect.

---

## 7. Default Function Arguments

You can provide default values for function parameters. This way, the caller can omit the argument and the default value will be used.

### Example:

```kotlin
fun greetPerson(name: String = "Guest", age: Int = 25) {
    println("Hello, $name! You are $age years old.")
}
```

---

## 8. Calling the Function:

```kotlin
greetPerson()         // Uses default values
greetPerson("Alice")  // Uses "Alice", default age 25
greetPerson(age = 30) // Uses default name "Guest", age 30
```

## 8. Function Overloading

**Function overloading** is a concept where multiple functions can have the same name but differ in their parameter types, number of parameters, or order of parameters. Kotlin supports function overloading, similar to Java.

#### Overloading Functions by Number of Parameters

You can define functions with the same name but different numbers of parameters.

```kotlin
fun add(a: Int, b: Int): Int {
    return a + b
}

fun add(a: Int, b: Int, c: Int): Int {
    return a + b + c
}
```

#### Calling the Overloaded Functions:

```kotlin
println(add(1, 2))        // Calls the function with two parameters
println(add(1, 2, 3))     // Calls the function with three parameters
```

Output:

```
3
6
```

#### Overloading Functions by Parameter Type

You can also overload functions by changing the types of the parameters.

```kotlin
fun add(a: Int, b: Int): Int {
    return a + b
}

fun add(a: Double, b: Double): Double {
    return a + b
}
```

#### Calling the Overloaded Functions:

```kotlin
println(add(1, 2))        // Calls the function with Int parameters
println(add(1.5, 2.3))    // Calls the function with Double parameters
```

Output:

```
3
3.8
```

#### Notes on Overloading in Kotlin:

- Kotlin resolves which overloaded function to call based on the number and types of arguments you pass to the function.
- The **return type** of overloaded functions cannot be used to distinguish between functions. The function’s signature is determined only by its name and parameters.

If the function signatures are identical (same name, same number of parameters, and same types), Kotlin will give a compilation error.
