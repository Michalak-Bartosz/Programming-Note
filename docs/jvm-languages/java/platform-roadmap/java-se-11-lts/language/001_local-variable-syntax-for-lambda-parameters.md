---
tags:
  - java
  - jdk-11
  - platform
  - jvm-languages
  - platform-roadmap
  - documentation
---
# 1. Local Variable Syntax for Lambda Parameters

One of the key features introduced in Java 10 was local variable type inference. It allowed the use of _var_ as the type of the local variable instead of the actual type. The compiler inferred the type based on the value assigned to the variable. However, we could not use this feature with lambda parameters.

**Examle:**
```java
(String s1, String s2) -> s1 + s2 // Before Java 8

(s1, s2) -> s1 + s2 // From Java 8

(var s1, var s2) -> s1 + s2 // From Java 11
```

## 1.1. Benefit
Why would we want to use var for lambda parameters when we could simply skip the types? One benefit of uniformity is that modifiers can be applied to local variables and lambda formals without losing brevity. For example, a common modifier is a type annotation:
```java
(@Nonnull var s1, @Nullable var s2) -> s1 + s2
```
We cannot use such annotations without specifying the types.

## 1.2. Limitation

* We cannot use var for some parameters and skip for others:
```java
(var s1, s2) -> s1 + s2
```
* We cannot mix var with explicit types:
```java
(var s1, String s2) -> s1 + s2
```
* We can skip the parentheses in single parameter lambda:
```java
s1 -> s1.toUpperCase()
```
* We cannot skip them while using var:
```java
var s1 -> s1.toUpperCase()
```
All of the above three usages will result in compilation error.

# **References:**
1. [Baeldung - Java Var Lambda Params](https://www.baeldung.com/java-var-lambda-params){ target="_blank" rel="noopener noreferrer" }
2. [OpenJDK JEP 323](https://openjdk.org/jeps/323){ target="_blank" rel="noopener noreferrer" }