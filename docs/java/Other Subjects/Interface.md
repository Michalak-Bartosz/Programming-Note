---
title: 1. <ins>Interface in Java</ins>
tags:
  - TODO
---

# 1. <ins>Interface in Java</ins>

In Java, an _interface_ is an **abstract type** that contains a collection of methods and constant variables. It is one of the core concepts in Java and is used to **achieve [Abstraction](abstraction.md), [Polymorphism](polymorphism.md) and [Inheritance](inheritance.md)**.
* **Example:**
```java
public interface Electronic {

    // Constant variable
    String LED = "LED";

    // Abstract method
    int getElectricityUse();

    // Static method
    static boolean isEnergyEfficient(String electtronicType) {
        if (electtronicType.equals(LED)) {
            return true;
        }
        return false;
    }

    //Default method
    default void printDescription() {
        System.out.println("Electronic Description");
    }
}
```
All method declarations in an interface, including default methods, are implicitly public, so you can omit the public modifier. We see the interface has a default method. This feature was provided in Java SE 8 LTS version (More info: [Default Methods in Interfaces](default-methods-in-interfaces.md)).

We can implement an interface in a Java class by using the implements keyword.
* **Example:** (Computer class that implements the Electronic interface)
```java
public class Computer implements Electronic {

    @Override
    public int getElectricityUse() {
        return 1000;
    }
}
```
## 1.1. <ins>Rules for Creating Interfaces</ins>
**In an interface, we’re allowed to use:**
* constants variables
* abstract methods ([Abstraction](abstraction.md))
* static methods
* default methods ([Default Methods in Interfaces](default-methods-in-interfaces.md))

**We also should remember that:**
* we **can’t** instantiate interfaces directly
* an interface **can** be empty, with no methods or variables in it
* we **can’t** use the final word ([Final Modifier](final-modifier.md)) in the interface definition, as it will result in a compiler error
* all interface declarations **should** have the public or default access modifier; the abstract modifier will be added automatically by the compiler
* an interface method **can’t** be protected or final
* up **until Java 9**, interface methods **could not** be private; however, **Java 9 introduced the possibility to define private methods in interfaces**
* interface variables **are public, static, and final by definition** ([Java Modifiers](java-modifiers.md)); we’re **not allowed** to change their visibility

## 1.2. <ins>Use Case of Interfaces</ins>
We use interfaces to add certain behavioral functionality that can be used by unrelated classes. For instance, Comparable, Comparator, and Cloneable are Java interfaces that can be implemented by unrelated classes. Below is an example of the Comparator interface that is used to compare two instances of the Employee class:
```java
public class Employee {

    private double salary;

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }
}

public class EmployeeSalaryComparator implements Comparator<Employee> {

    @Override
    public int compare(Employee employeeA, Employee employeeB) {
        if (employeeA.getSalary() < employeeB.getSalary()) {
            return -1;
        } else if (employeeA.getSalary() > employeeB.getSalary()) { 
            return 1;
        } else {
            return 0;
        }
    }
}
```
More: [Comparator and Comparable](comparator-and-comparable.md)

Java classes support singular [Inheritance](inheritance.md). However, by using interfaces, we’re also able to implement multiple inheritances.
* **Example:**
```java
public interface Transform {
    void transform();
}

public interface Fly {
    void fly();
}

public class Car implements Fly, Transform {

    @Override
    public void fly() {
        System.out.println("I can Fly!!");
    }

    @Override
    public void transform() {
        System.out.println("I can Transform!!");
    }
}
```
For instance, in the example, we notice that the Car class implements the Fly and Transform interfaces. By doing so, it inherits the methods fly and transform.

In Java, we can achieve [Polymorphism](polymorphism.md) using interfaces. For example, the Shape interface can take different forms — it can be a Circle or a Square.
* **Example:**
```java
public interface Shape {
    String name();
}

public class Circle implements Shape {

    @Override
    public String name() {
        return "Circle";
    }
}

public class Square implements Shape {

    @Override
    public String name() {
        return "Square";
    }
}

//Polymorphism in action using our Shape interface and its implementations
List<Shape> shapes = new ArrayList<>();
Shape circleShape = new Circle();
Shape squareShape = new Square();

shapes.add(circleShape);
shapes.add(squareShape);

for (Shape shape : shapes) {
    System.out.println(shape.name());
}
```

## 1.3. <ins>Interface Inheritance Rules</ins>
In order to achieve multiple inheritances thru interfaces, we have to remember a few rules. Let’s go over these in detail.

### 1.3.1. <ins>Interface Extending Another Interface</ins>
When an interface extends another interface, it inherits all of that interface’s abstract methods.
* **Example:**
```java
public interface HasColor {
    String getColor();
}

public interface Box extends HasColor {
    int getHeight()
}
```
Box inherits from HasColor using the keyword extends. By doing so, the Box interface inherits getColor. As a result, the Box interface now has two methods: getColor and getHeight.

### 1.3.2. <ins>Abstract Class Implementing an Interface</ins>
When an abstract class implements an interface, it inherits all of its abstract and default methods.
* **Example:**
```java
public interface Transform {
    
    void transform();
    default void printSpecs(){
        System.out.println("Transform Specification");
    }
}

public abstract class Vehicle implements Transform {}
```
The Vehicle class inherits two methods: the abstract transform method and the default printSpecs method.

## 1.4. <ins>Functional Interfaces</ins>
More: [Functional Interfaces](functional-interfaces.md)

## 1.5. <ins>Abstract Classes Compared to Interfaces</ins>
More: [Abstract Classes Compared to Interfaces](abstract-classes-compared-to-interfaces.md)

# **References:**
1. https://docs.oracle.com/javase/tutorial/java/concepts/interface.html
2. https://www.baeldung.com/java-interfaces
