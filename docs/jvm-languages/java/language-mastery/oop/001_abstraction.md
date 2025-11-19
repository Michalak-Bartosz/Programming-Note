---
tags:
  - java
  - language
---



# 1. Abstraction in Java

## 1.1. Abstract Methods and Classes
An abstract class is a class that is declared abstract—it may or may not include abstract methods. Abstract classes cannot be instantiated, but they can be subclassed.

 An abstract method is a method that is declared without an implementation (without braces, and followed by a semicolon).

* **Example:**
```java
abstract void moveTo(double deltaX, double deltaY);
```
If a class includes abstract methods, then the class itself must be declared abstract, as in:
```java
public abstract class GraphicObject {
   // declare fields
   // declare nonabstract methods
   abstract void draw();
}
```
 When an abstract class is subclassed, the subclass usually provides implementations for all the abstract methods in its parent class. However, if it does not, then the subclass must also be declared abstract

**NOTE:** Methods in an [Interface](../007_interface.md) that are not declared as default or static ([Default Methods in Interfaces](../../platform-roadmap/java-se-8-lts/language/001_default-methods-in-interfaces.md)) are implicitly abstract, so the abstract modifier is not used with interface methods (It can be used, but it is unnecessary).

# 2. More about:
[Abstract Classes Compared to Interfaces](../comparisons/001_abstract-classes-compared-to-interfaces.md)

# **References:**
1. [Abstract Methods and Classes](https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html){ target="_blank" rel="noopener noreferrer" }


