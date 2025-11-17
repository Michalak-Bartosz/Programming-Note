The **Elvis operator** (`?:`) is a shorthand for handling nullable types. It allows you to provide a default value when a nullable variable is `null`.

```kotlin
val length = name?.length ?: 0
```

In the above example:
- If `name` is `null`, `length` will be set to `0`.
- If `name` is not `null`, it will return the length of the string.

### Usage:

```kotlin
val result = name ?: "Default Name"
```

If `name` is `null`, the value `"Default Name"` will be used.