---
tags:
  - java
  - jdk-8
  - platform
---



# 1. **Default Methods in Interfaces**

Default methods in Java are methods that are defined in an interface and have a default implementation. They were introduced in Java 8 to allow developers to add new methods to an interface without breaking the existing implementations of the interface ([Interface](../../../language-mastery/007_interface.md)).

Suppose that you want to add new functionality to the _TimeClient_ interface ([Interface](../../../language-mastery/007_interface.md)), such as the ability to specify a time zone through a _ZonedDateTime_ object (which is like a _LocalDateTime_ object except that it stores time zone information).

```java
public interface TimeClient {
    void setTime(int hour, int minute, int second);
    void setDate(int day, int month, int year);
    void setDateAndTime(int day, int month, int year,
        int hour, int minute, int second);
    LocalDateTime getLocalDateTime();                           
    ZonedDateTime getZonedDateTime(String zoneString);
}
```
Following this modification to the _TimeClient_ interface, you would also have to modify the class _SimpleTimeClient_ and implement the method _getZonedDateTime_. However, rather than leaving _getZonedDateTime_ as **abstract** (as in the previous example), you can instead define a **default** implementation (Remember that an abstract method is a method declared without an implementation - [Abstraction](../../../language-mastery/oop/001_abstraction.md)).
```java
public interface TimeClient {
    void setTime(int hour, int minute, int second);
    void setDate(int day, int month, int year);
    void setDateAndTime(int day, int month, int year,
                               int hour, int minute, int second);
    LocalDateTime getLocalDateTime();
    default ZonedDateTime getZonedDateTime() {
        return ZonedDateTime.of(getLocalDateTime(), ZoneId.systemDefault());
    }
}
```
You specify that a method definition in an interface is a default method with the default keyword at the beginning of the method signature.

With this interface, you do not have to modify the class SimpleTimeClient, and this class (and any class that implements the interface TimeClient), will have the method getZonedDateTime already defined. The following example, TestSimpleTimeClient, invokes the method getZonedDateTime from an instance of SimpleTimeClient:
```java
public class TestSimpleTimeClient {
    public static void main(String... args) {
        TimeClient myTimeClient = new SimpleTimeClient();
        System.out.println("Current time: " + myTimeClient.toString());
        System.out.println("Time in California: " +
            myTimeClient.getZonedDateTime("Blah blah").toString());
    }
}
```

## 1.1. Extending interfaces with default methods
When you extend an interface ([Interface](../../../language-mastery/007_interface.md)) that contains a default method, you can do the following:
* **Not mention** the default method at all, which lets your extended interface inherit the default method.
* **Redeclare** the default method, which makes it abstract ([Abstraction](../../../language-mastery/oop/001_abstraction.md)). 
* **Redefine** the default method, which overrides it.

## 1.2. Static methods
In addition to default methods, you can define static methods in interfaces. (A static method is a method that is associated with the class in which it is defined rather than with any object. Every instance of the class shares its static methods.) This makes it easier for you to organize helper methods in your libraries; you can keep static methods specific to an interface in the same interface rather than in a separate class.

* **Example:**
```java
public interface TimeClient {
    // ...
    static ZoneId getZoneId (String zoneString) {
        try {
            return ZoneId.of(zoneString);
        } catch (DateTimeException e) {
            System.err.println("Invalid time zone: " + zoneString +
                "; using default time zone instead.");
            return ZoneId.systemDefault();
        }
    }

    default ZonedDateTime getZonedDateTime(String zoneString) {
        return ZonedDateTime.of(getLocalDateTime(), getZoneId(zoneString));
    }    
}
```
The following example defines a static method that retrieves a ZoneId object corresponding to a time zone identifier; it uses the system default time zone if there is no ZoneId object corresponding to the given identifier. (As a result, you can simplify the method getZonedDateTime):

# **References:**
1. [Default Methods](https://docs.oracle.com/javase/tutorial/java/IandI/defaultmethods.html){ target="_blank" rel="noopener noreferrer" }

