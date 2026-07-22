---
tags:
  - kotlin
  - kotlin-basics
  - jvm-languages
  - documentation
---
# 1. Providing a Type on a Variable

Kotlin can often infer the type automatically, but you can still declare it explicitly when clarity or a specific contract matters.

```kotlin
val name: String = "John"  // Explicitly specifying type
```

Kotlin allows type inference, so the following will work as well:

```kotlin
val name = "John"  // Type is inferred as String
```

### Example with Different Types:

```kotlin
val number: Int = 10   // Integer type
val pi: Double = 3.14  // Double type
```