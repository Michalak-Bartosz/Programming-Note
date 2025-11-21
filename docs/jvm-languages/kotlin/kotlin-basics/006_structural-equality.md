---
tags:
  - kotlin
  - kotlin-basics
---



# Structural Equality

Kotlin provides two types of equality comparison:

1. **Structural Equality (`==`)**: Checks if the contents of two objects are the same (i.e., value equality).
2. **Referential Equality (`===`)**: Checks if two references point to the same object in memory (i.e., reference equality).

### Examples:

```kotlin
val a = "Kotlin"
val b = "Kotlin"
val c = a

println(a == b)  // true (structural equality, content is the same)
println(a === b) // true (referential equality, both refer to the same object)

println(a === c) // true (referential equality, both are the same reference)
```

### Important Notes:

- `==` compares the values of the objects (like `equals()` in Java).
- `===` compares whether two variables refer to the exact same object in memory.
