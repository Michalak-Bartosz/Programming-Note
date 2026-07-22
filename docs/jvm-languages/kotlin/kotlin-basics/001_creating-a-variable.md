---
tags:
  - kotlin
  - kotlin-basics
  - jvm-languages
  - documentation
---
# 1. Creating a Variable

In Kotlin, variables are declared using either `val` for immutable values or `var` for mutable values.

This example shows the difference between a value that can be reassigned and one that cannot.

- **Mutable Variables**: Use `var` to declare a variable whose value can change.
- **Immutable Variables**: Use `val` to declare a variable whose value cannot change once it is assigned.

```kotlin
var name = "John"   // Mutable variable
val age = 25        // Immutable variable
```

### Syntax:

```kotlin
var <variableName>: <Type> = <value>  // Mutable
val <variableName>: <Type> = <value>  // Immutable
```

### Example:

```kotlin
var name = "Alice"  // Mutable variable
val city = "New York" // Immutable variable
```