---
tags:
  - java
  - jvm-languages
  - language-mastery
  - documentation
---
# 1. Functional Interfaces

A functional interface is an interface with a single abstract method, often called a SAM. Such interfaces can be implemented by lambda expressions or method references, which makes them especially useful in functional-style Java code.

Java 8's default methods do not count as abstract methods, so an interface can still be functional even if it contains several default methods. See [Default Methods in Interfaces](../platform-roadmap/java-se-8-lts/language/001_default-methods-in-interfaces.md) for more context.

Functional interfaces provide the target type for [Lambda Expressions](../platform-roadmap/java-se-8-lts/language/003_lambda-expressions.md) and method references. They can be used in different contexts, such as assignment, method invocation, or casting:

```java
     // Assignment context
     Predicate<String> p = String::isEmpty;
     // Method invocation context
     stream.filter(e -> e.getSize() > 10)...
     // Cast context
     stream.map((ToIntFunction) e -> e.getSize())...
```

Annotation *@FunctionalInterface* is not a requirement for the compiler to recognize an interface as a functional interface, but merely an aid to capture design intent and enlist the help of the compiler in identifying accidental violations of design intent.

Functional interfaces often represent abstract concepts like functions, actions, or predicates. In documenting functional interfaces, or referring to variables typed as functional interfaces, it is common to refer directly to those abstract concepts, for example using "this function" instead of "the function represented by this object". When an API method is said to accept or return a functional interface in this manner, such as "applies the provided function to...", this is understood to mean a _non-null_ reference to an object implementing the appropriate functional interface, unless potential nullity is explicitly specified.
# 2. More about:
1. [Functional Interfaces - Tips and Best Practices](../best-practices/001_functional-interfaces-tips-and-best-practices.md)
# **References:**
1. [Oracle - Java Function Package](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/package-summary.html){ target="_blank" rel="noopener noreferrer" }
2. [Baeldung - Functional Interfaces in Java 8](https://www.baeldung.com/java-8-functional-interfaces){ target="_blank" rel="noopener noreferrer" }

