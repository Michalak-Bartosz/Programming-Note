---
tags:
  - kotlin
  - kotlin-basics
  - jvm-languages
  - documentation
---
# 1. Creating a Read-Only Variable

To create a variable that cannot be reassigned after its initial assignment, use `val`.

This is useful when you want to model values that should stay constant throughout the lifecycle of a function or object.

```kotlin
val language = "Kotlin" // The value of 'language' cannot be changed once set.
```

### Example:

```kotlin
val pi = 3.14159   // Read-only variable
```