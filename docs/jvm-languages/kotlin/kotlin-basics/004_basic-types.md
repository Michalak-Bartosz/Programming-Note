---
tags:
  - kotlin
  - kotlin-basics
---



# 1. Numbers

Kotlin supports a variety of numeric types.

- **Int**: 32-bit signed integer
- **Long**: 64-bit signed integer
- **Double**: 64-bit floating point number
- **Float**: 32-bit floating point number

### Examples:

```kotlin
val a: Int = 10
val b: Long = 10000000000L
val c: Double = 3.14159
val d: Float = 2.71F
```

# 2. String and Char

- **String**: Represents a sequence of characters.
- **Char**: Represents a single character.

### Examples:

```kotlin
val str: String = "Kotlin"
val letter: Char = 'K'
```

### 2.1. Operations on Strings:

- Strings in Kotlin are immutable, but you can perform operations like concatenation and interpolation.

```kotlin
val greeting = "Hello, " + "World!"  // Concatenation
```

### 2.2. String Interpolation and Triple Quotes

#### String Interpolation

Kotlin provides an easy way to embed variables into strings using string interpolation. You can do this by prefixing variables with `$`.

```kotlin
val name = "John"
val greeting = "Hello, $name!"  // Output: Hello, John!
```

If you need to use an expression inside a string, wrap it in curly braces.

```kotlin
val age = 25
val message = "Your age is ${age + 5}"  // Output: Your age is 30
```

#### Triple-quoted Strings

Triple-quoted strings are useful for multi-line strings or when you want to avoid escaping special characters (like quotes or newlines).

```kotlin
val multilineString = """
    This is a string
    that spans multiple lines
    without the need for escaping characters.
"""
```

# 3. Boolean

- **Boolean**: Represents true or false values.

### Example:

```kotlin
val isKotlinFun: Boolean = true
val isJavaFun: Boolean = false
```
