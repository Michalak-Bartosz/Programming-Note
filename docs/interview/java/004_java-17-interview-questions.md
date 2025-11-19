---
tags:
  - interview
  - java
  - jdk-17
---



# Java 17 Interview Questions

### ***Q1. What are the key features introduced in Java 17?***

Java 17 introduced several important features including:
- **Sealed Classes** - Restricts which classes can inherit from a sealed class
- **Pattern Matching for switch** - Allows more expressive and concise switch statements and reduces boilerplate code in type-checking scenarios
- **Records** -  Provides a compact syntax for creating immutable data classes
- **Text Blocks** -  Allows multi-line string literals without escape characters - Improved Random Number Generators: Provides a new interface and implementations for random number generation

---
### ***Q2. Explain the concept of text blocks in Java. How do they improve code readability?***

Text blocks in Java improve the way multiline strings are handled in code. Traditionally very difficult to read strings that span across multiple lines and require preserving formatting.

Java 17 introduced triple quotes (`"""`). Text inside triple quotes is called text blocks. The compiler automatically strips incidental indentation and preserves formatting.

```java
String query =  "SELECT e.employee_id, e.first_name, e.last_name, \n" +
                "       d.department_name, j.job_title, \n" +
                "       e.salary, e.hire_date \n" +
                "FROM employees e \n" +
                "JOIN departments d ON e.department_id = d.department_id \n" +
                "JOIN jobs j ON e.job_id = j.job_id \n" +
                "WHERE e.salary > 50000 \n" +
                "  AND e.hire_date > '2020-01-01' \n" +
                "  AND d.department_name IN ('Sales', 'Marketing', 'IT') \n" +
                "ORDER BY e.salary DESC, e.last_name ASC";

// With text blocks
String query = """
        SELECT e.employee_id, e.first_name, e.last_name,
               d.department_name, j.job_title,
               e.salary, e.hire_date
        FROM employees e
        JOIN departments d ON e.department_id = d.department_id
        JOIN jobs j ON e.job_id = j.job_id
        WHERE e.salary > 50000
          AND e.hire_date > '2020-01-01'
          AND d.department_name IN ('Sales', 'Marketing', 'IT')
        ORDER BY e.salary DESC, e.last_name ASC
        """;
```

---
### ***Q3. What are the Records in Java?***

Records is a new language feature introduced in Java 14 and finalized in Java 16. A record is a special type of class in Java that allows us to define classes that act as transparent carriers for immutable data. Records can be used to replace traditional POJOs, which are often verbose and require a lot of boilerplate code.

This is how we can define the records

```java
public record Vehicle(String make, String model, int year) {}
```

The fields of a record are implicitly final, which means that once a record instance is created, the data it contains cannot be changed.

Records provide several built-in methods for common operations such as constructors, getters,`equals()`, `hashCode()`, and `toString()`. Like a regular class, methods inside the record can be extended to provide a custom implementation.

Records allow you to define a **Compact constructor** which omits the parameter list, assuming the same parameters as the record components. Within this constructor, you can include validation or normalization logic for the fields.

```java
public record Vehicle(String make, String model, int year) {

    // Compact constructor
    public Vehicle {
        if (year < 1886) { // The first car was made in 1886
            throw new IllegalArgumentException("Invalid year");
        }
        make = make.trim();
        model = model.trim();
    }
}
```

Records are ideal for creating simple data-carrier classes, such as *DTOs* (Data Transfer Objects), value objects in domain-driven design, tuples, and more. Records are serializable by default, provided that all their components are serializable.

---
### ***Q4: Explain the concept of sealed classes in Java 17.***

Sealed classes are a new language feature introduced in Java 17 as part of JEP 409. They provide a way to restrict the subclasses that can extend a class or implement an interface. This feature is useful to create more robust and maintainable code and to define a closed hierarchy of types.

Sealed Classes allow you to specify a limited set of subclasses that can extend a given class or implement an interface.

This is how we can declare a sealed class in Java:

```java
public sealed abstract class Vehicle permits Car, Truck, Motorcycle {
    private final String make;
    private final String model;

    public Vehicle(String make, String model) {
        this.make = make;
        this.model = model;
    }

    public abstract void displayVehicleInfo();
}

public final class Car extends Vehicle {
    private final int seatingCapacity;

    public Car(String make, String model, int seatingCapacity) {
        super(make, model);
        this.seatingCapacity = seatingCapacity;
    }

    @Override
    public void displayVehicleInfo() {
        System.out.println("Car: " + getMake() + " " + getModel() + ", Seating Capacity: " + seatingCapacity);
    }
}
```

The `permits` clause is used to specify the allowed subclasses for type `Shape`.

Since the compiler knows all the possible subtypes of a sealed class, it will prevent any other class except `Circle`, `Square` or `Rectangle` from extending the `Shape` class.

---
### ***Q5. How Sealed classes are different from final classes?***

Sealed classes and final classes serve different purposes in Java, although both are used to restrict inheritance.

- **Final Classes** in Java cannot be inherited at all. It can be used when a class should never be extended.
- **Sealed Classes** can be inherited, but only by a predefined set of classes. It is used when you want to allow inheritance, but only for specific classes.

### ***Q6: How does the pattern matching for `instanceof` work in Java 17?***

Pattern Matching for `instanceof` in Java 17 enhances the `instanceof` operator and eliminates the need for type casting and checking.

**Traditional approach:**

```java
if (obj instanceof Car) {
    Car str = (Car) obj;
    // Use car object here 
}
```

**With pattern matching for instanceof:**

```java
if (obj instanceof Car car) {
    // Use car object here 
}
```

As you can notice, it makes the code more concise but also enhances readability and reduces the possibility of errors, such as incorrect casting.

---
### ***Q7: How does the Pattern matching for the switch work?***

Pattern Matching for the switch is introduced as a preview feature in Java 17. This feature extends the switch expression and switch statement to allow pattern matching in case labels. Pattern Matching for switch aims to make code more readable and safe, especially when dealing with type testing and casting.

Please note, the Pattern Matching for switch is still in preview and not yet a finalized.

```java
switch (obj) {
    case String s -> System.out.println("It's a string: " + s);
    case Integer i -> System.out.println("It's an integer: " + i);
    case null -> System.out.println("It's null");
    default -> System.out.println("It's something else");
}
```

---
### ***Q8. Is it possible to use records with inheritance?***

A record declaration does not have an extends clause, so it is not possible to explicitly declare a direct superclass type, even a Record. However, a record can implement interfaces, so you can use them polymorphically.

---
### ***Q9. How does the new Random Number Generators API in Java 17 improve upon the previous implementation?***

The new Random Number Generators API in Java 17 introduced a new `RandomGenerator` interface as the top-level interface for random number generators. It provides specialized interfaces like `SplittableRandomGenerator`, `JumpableRandomGenerator`, and `LeapableRandomGenerator` for different types of generators.

It includes algorithms like LXM, Xoroshiro128PlusPlus, and Xoshiro256PlusPlus, which are more modern and efficient than the older Linear Congruential Generator (LCG) used in the legacy `Random` class.

The new API interface offers better control over the sequence of random numbers generated and provides methods to "jump" or "leap" ahead in the sequence without generating intermediate values.

```java
import java.util.random.RandomGenerator;
import java.util.random.RandomGeneratorFactory;

public class RandomExample {
    public static void main(String[] args) {
        RandomGenerator rng = RandomGeneratorFactory.of("Xoshiro256PlusPlus")
             .create();
        int randomInt = rng.nextInt();
        rng.doubles().limit(5).forEach(System.out::println);

        // Create a splittable generator for parallel processing
        RandomGenerator splitRng = RandomGeneratorFactory.of("L64X128MixRandom").create();
        RandomGenerator split1 = splitRng.split();
        RandomGenerator split2 = splitRng.split();

        System.out.println(split1.nextInt());
        System.out.println(split2.nextInt());
    }
}
```
