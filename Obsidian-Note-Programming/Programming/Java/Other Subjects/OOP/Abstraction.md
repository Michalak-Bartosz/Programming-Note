# 1. <ins>Abstraction in Java</ins>

## 1.1. <ins>Abstract Methods and Classes</ins>
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

**<ins>NOTE:</ins>** Methods in an [[Interface]] that are not declared as default or static ([[Default Methods in Interfaces]]) are implicitly abstract, so the abstract modifier is not used with interface methods (It can be used, but it is unnecessary).

## 1.2. <ins>Abstract Classes Compared to Interfaces</ins>
[[Abstract Classes Compared to Interfaces]]

# **References:**
1. [Abstract Methods and Classes](https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html)
