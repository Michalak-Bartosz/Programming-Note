In Kotlin, variables can be defined as nullable types. By default, Kotlin does not allow variables to hold `null` values unless explicitly declared as nullable. This is to eliminate `NullPointerException` (NPE) errors which are common in Java.

### Declaring Nullable Types

A nullable type is declared by appending a `?` to the type.

```kotlin
var name: String? = null
```

In the above example, the `String?` type means that the `name` variable can either hold a valid `String` or `null`.

### Nullability Checks

Before using nullable variables, you must check if they are `null`. This can be done using a simple `if` statement or Kotlin's safe call operators.

```kotlin
if (name != null) {
    println(name.length)
}
```

Alternatively, you can use Kotlin’s built-in features to safely access nullable properties.
