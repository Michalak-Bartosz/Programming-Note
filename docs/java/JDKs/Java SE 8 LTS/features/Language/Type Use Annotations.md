# 1. <ins>Type Use Annotations</ins>

**Before the Java SE 8** release, annotations could **only be applied to declarations**. As of the Java SE 8 release, annotations can also be applied to any type use. This means that annotations can be used anywhere you use a type.

A few examples of where types are used are class instance creation expressions (new), casts, implements clauses, and throws clauses. This form of annotation is called a type annotation and several examples are provided in [Annotations](annotations.md).

## 1.1. <ins>Type checking</ins>
Type annotations were created to support improved analysis of Java programs way of ensuring stronger type checking. **The Java SE 8 release does not provide a type checking framework, but it allows you to write (or download) a type checking framework** that is implemented as one or more pluggable modules that are used in conjunction with the Java compiler.

For example, you want to ensure that a particular variable in your program is never assigned to null; you want to avoid triggering a _NullPointerException_. You can write a custom plug-in to check for this. You would then modify your code to annotate that particular variable, indicating that it is never assigned to null. 

The variable declaration might look like this:

```java
@NonNull String str;
```

When you compile the code, including the _NonNull_ module at the command line, the compiler prints a warning if it detects a potential problem, allowing you to modify the code to avoid the error. After you correct the code to remove all warnings, this particular error will not occur when the program runs.

You can use multiple type-checking modules where each module checks for a different kind of error. In this way, you can build on top of the Java type system, adding specific checks when and where you want them.

With the judicious use of type annotations and the presence of pluggable type checkers, you can write code that is stronger and less prone to error.

In many cases, you do not have to write your own type checking modules. **There are third parties who have done the work for you.** For example, you might want to take advantage of the [**_Checker Framework_**](https://checkerframework.org/) created by the University of Washington. This framework includes a NonNull module, as well as a regular expression module, and a mutex lock module.

# **References:**
1. [Oracle - type annotations](https://docs.oracle.com/javase/tutorial/java/annotations/type_annotations.html)