---
tags:
  - Java
  - Functional Programming
  - Interfaces
---

# 1. Functional Interfaces

**Any interface with a SAM (Single Abstract Method) is a functional interface**, and its implementation may be treated as lambda expressions.

Note that Java 8's _default_ methods are not _abstract_ ([Abstraction](oop/001_abstraction.md)) and do not count - a functional interface may still have multiple _default_ methods ([Default Methods in Interfaces](../jdk/java-se-8-lts/features/language/001_default-methods-in-interfaces.md)).

_Functional interfaces_ provide target types for [Lambda Expressions](../jdk/java-se-8-lts/features/language/003_lambda-expressions.md) and method references. Each functional interface has a single abstract method, called the _functional method_ for that functional interface, to which the lambda expression's parameter and return types are matched or adapted. Functional interfaces can provide a target type in multiple contexts, such as assignment context, method invocation, or cast context:

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
