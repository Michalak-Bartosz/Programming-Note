---
tags:
  - kotlin
  - kotlin-basics
  - jvm-languages
  - documentation
---
# 1. If/Else Conditionals

Kotlin supports traditional `if/else` conditionals.

```kotlin
val number = 10
if (number > 5) {
    println("Number is greater than 5")
} else {
    println("Number is less than or equal to 5")
}
```

### Example:

```kotlin
val max = if (a > b) a else b  // Returns the greater of 'a' and 'b'
```

### One Line If/Else Conditional

In Kotlin, you can also use a one-liner for `if/else` statements. This is useful when the `if/else` has a simple return or assignment.

### Syntax:

```kotlin
val max = if (a > b) a else b
```

### Example:

```kotlin
val max = if (x > y) x else y  // Returns the greater of 'x' and 'y'
```