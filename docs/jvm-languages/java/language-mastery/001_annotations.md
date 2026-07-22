---
tags:
  - java
  - jvm-languages
  - language-mastery
  - documentation
---
# 1. Annotations

This page explains how Java annotations work, where they can be applied, and why they are useful in real-world codebases.

_Annotations_, a form of metadata, provide data about a program that is not part of the program itself. _Annotations_ have no direct effect on the operation of the code they annotate.

**Annotations have a number of uses, among them:**
* **Information for the compiler** — Annotations can be used by the compiler to detect errors or suppress warnings.
* **Compile-time and deployment-time processing** — Software tools can process annotation information to generate code, XML files, and so forth.
* **Runtime processing** — Some annotations are available to be examined at runtime.

## 1.1. The Format of an Annotation

The at sign character (@) indicates to the compiler that what follows is an _annotation_. In the following example, the _annotation's_ name is Override:
```java
@Override
void mySuperMethod() { ... }
```
The _annotation_ can include elements, which can be named or unnamed, and there are values for those elements:
```java
@Author(
   name = "Benjamin Franklin",
   date = "3/27/2003"
)
class MyClass { ... }
```
or
```java
@SuppressWarnings(value = "unchecked")
void myMethod() { ... }
```
If there is just one element named value, then the name can be omitted, as in:
```java
@SuppressWarnings("unchecked")
void myMethod() { ... }
```
If the _annotation_ has no elements, then the parentheses can be omitted, as shown in the previous @Override example.

It is also possible to use multiple _annotations_ on the same declaration:
```java
@Author(name = "Jane Doe")
@EBook
class MyClass { ... }
```
If the _annotations_ have the same type, then this is called a [Repeating Annotations](../platform-roadmap/java-se-8-lts/language/004_repeating-annotations.md).
```java
@Author(name = "Jane Doe")
@Author(name = "John Smith")
class MyClass { ... }
```

## 1.2. Where Annotations Can Be Used

_Annotations_ can be applied to declarations: declarations of classes, fields, methods, and other program elements. When used on a declaration, each _annotation_ often appears, by convention, on its own line.

As of the Java SE 8 release, _annotations_ can also be applied to the use of types ([Type Use Annotations](../platform-roadmap/java-se-8-lts/language/005_type-use-annotations.md)). Here are some examples:
* Class instance creation expression:
```java
    new @Interned MyObject();
```
* Type cast:
```java
    myString = (@NonNull String) str;
```
* Implements clause:
```java
    class UnmodifiableList<T> implements
        @Readonly List<@Readonly T> { ... }
```
* Thrown exception declaration:
```java
    void monitorTemperature() throws
        @Critical TemperatureException { ... }
```
This form of _annotation_ is called a type _annotation_.

# **References:**
1. [Oracle - Annotations](https://docs.oracle.com/javase/tutorial/java/annotations/index.html){ target="_blank" rel="noopener noreferrer" }
2. [Oracle - Annotations Basics](https://docs.oracle.com/javase/tutorial/java/annotations/basics.html){ target="_blank" rel="noopener noreferrer" }

[Repeating Annotations](../platform-roadmap/java-se-8-lts/language/004_repeating-annotations.md)

