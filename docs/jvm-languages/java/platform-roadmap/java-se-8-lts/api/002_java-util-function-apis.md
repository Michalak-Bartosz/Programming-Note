---
tags:
  - java
  - jdk-8
  - platform
---



# 1. java.util.function APIs

The interfaces in this package are general purpose [Functional Interfaces](../../../language-mastery/005_functional-interfaces.md) used by the JDK, and are available to be used by user code as well. While they do not identify a complete set of function shapes to which [Lambda Expressions](../language/003_lambda-expressions.md) might be adapted, they provide enough to cover common requirements. Other functional interfaces provided for specific purposes, such as *FileFilter*, are defined in the packages where they are used. The interfaces in this package are annotated with *@FunctionalInterface*.

The functional interfaces in this package follow an extensible naming convention, as follows:

- There are several basic function shapes, including [`Function`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/Function.html "interface in java.util.function") (unary function from `T` to `R`), [`Consumer`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/Consumer.html "interface in java.util.function") (unary function from `T` to `void`), [`Predicate`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/Predicate.html "interface in java.util.function") (unary function from `T` to `boolean`), and [`Supplier`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/Supplier.html "interface in java.util.function") (nullary function to `R`).
- Function shapes have a natural arity based on how they are most commonly used. The basic shapes can be modified by an arity prefix to indicate a different arity, such as [`BiFunction`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/BiFunction.html "interface in java.util.function") (binary function from `T` and `U` to `R`).
- There are additional derived function shapes which extend the basic function shapes, including [`UnaryOperator`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/UnaryOperator.html "interface in java.util.function") (extends `Function`) and [`BinaryOperator`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/BinaryOperator.html "interface in java.util.function") (extends `BiFunction`).
- Type parameters of functional interfaces can be specialized to primitives with additional type prefixes. To specialize the return type for a type that has both generic return type and generic arguments, we prefix `ToXxx`, as in [`ToIntFunction`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/ToIntFunction.html "interface in java.util.function"). Otherwise, type arguments are specialized left-to-right, as in [`DoubleConsumer`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/DoubleConsumer.html "interface in java.util.function") or [`ObjIntConsumer`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/ObjIntConsumer.html "interface in java.util.function"). (The type prefix `Obj` is used to indicate that we don't want to specialize this parameter, but want to move on to the next parameter, as in [`ObjIntConsumer`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/ObjIntConsumer.html "interface in java.util.function").) These schemes can be combined, as in `IntToDoubleFunction`.
- If there are specialization prefixes for all arguments, the arity prefix may be left out (as in [`ObjIntConsumer`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/ObjIntConsumer.html "interface in java.util.function")).
# 2. More about:
1. [Functional Interfaces](../../../language-mastery/005_functional-interfaces.md)
2. [Lambda Expressions](../language/003_lambda-expressions.md)
3. [Functional Interfaces - Tips and Best Practices](../../../best-practices/001_functional-interfaces-tips-and-best-practices.md)
4. [Lambda Expressions - Tips and Best Practices](../../../best-practices/002_lambda-expressions-tips-and-best-practices.md)
# **References:**
1. [Baeldung - Java 8 Functional Interfaces](https://www.baeldung.com/java-8-functional-interfaces){ target="_blank" rel="noopener noreferrer" }
2. [Baeldung - Java 8 Lambda Expressions Tips](https://www.baeldung.com/java-8-lambda-expressions-tips){ target="_blank" rel="noopener noreferrer" }
3. [Oracle - Java Function Package Summary](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/package-summary.html){ target="_blank" rel="noopener noreferrer" }
4. [Medium - Java util.function API](https://medium.com/@ashaythecoder/part-b-java-util-function-api-of-java-8-5b6533996075){ target="_blank" rel="noopener noreferrer" }

