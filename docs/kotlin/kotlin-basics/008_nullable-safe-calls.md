## 8. Nullable Safe Calls

Kotlin offers a feature called **Safe Calls** (`?.`), which allows you to safely access properties or methods on nullable types. If the variable is `null`, the call will be skipped, and `null` will be returned.

```kotlin
val length = name?.length
```

Here, if `name` is `null`, `length` will also be `null`. If `name` is not `null`, it will return the length of the string.

### Example with Safe Call

```kotlin
val length: Int? = name?.length
println(length)  // Output: null if name is null
```
