---
tags:
  - interview
  - java
  - jdk-8
---



# Java 8 Interview Questions

### ***Q1. What New Features Were Added in Java 8?***

Java 8 ships with several new features, but the most significant are the following:
- **Lambda Expressions** − a new language feature allowing us to treat actions as objects
- **Method References** − enable us to define Lambda Expressions by referring to methods directly using their names
- _**Optional**_ − special wrapper class used for expressing optionality
- **Functional Interface** – an interface with maximum one abstract method; implementation can be provided using a Lambda Expression
- **Default methods** − give us the ability to add full implementations in interfaces besides abstract methods
- **Nashorn, JavaScript Engine** − Java-based engine for executing and evaluating JavaScript code
- **_Stream_ API** − a special iterator class that allows us to process collections of objects in a functional manner
- **Date API** − an improved, immutable JodaTime-inspired Date API

Along with these new features, lots of feature enhancements are done under the hood at both the compiler and JVM level.

---
### ***Q2. What Is a Method Reference?***

A method reference is a Java 8 construct that can be used for referencing a method without invoking it. It’s used for treating methods as Lambda Expressions. They only work as syntactic sugar to reduce the verbosity of some lambdas. This way the following code:
```java
(o) -> o.toString();
```

Can become:
```java
Object::toString();
```

A method reference can be identified by a double colon separating a class or object name, and the name of the method. It has different variations, such as constructor reference:
```java
String::new;
```

Static method reference:
```java
String::valueOf;
```

Bound instance method reference:
```java
str::toString;
```

Unbound instance method reference:
```java
String::toString;
```

---
### ***Q3. What Is the Meaning of String::Valueof Expression?***

It’s a static method reference to the _valueOf_ method of the _String_ class.

---
### ***Q4. What Is Optional? How Can It Be Used?***

_Optional_ is a new class in Java 8 that encapsulates an optional value, i.e. a value that is either there or not. It’s a wrapper around an object, and we can think of it as a container of zero or one element.

_Optional_ has a special _Optional.empty()_ value instead of wrapped _null_. Thus it can be used instead of a nullable value to get rid of _NullPointerException_ in many cases.

The main purpose of _Optional_, as designed by its creators, is to be a return type of methods that previously would return _null_. Such methods would require us to write boilerplate code to check the return value, and we could sometimes forget to do a defensive check. In Java 8, an _Optional_ return type explicitly requires us to handle null or non-null wrapped values differently.

For instance, the _Stream.min()_ method calculates the minimum value in a stream of values. But what if the stream is empty? If it wasn’t for _Optional_, the method would return _null_ or throw an exception.

However, it returns an _Optional_ value, which may be _Optional.empty()_ (the second case). This allows us to easily handle such cases:

```java
int min1 = Arrays.stream(new int[]{1, 2, 3, 4, 5})
  .min()
  .orElse(0);
assertEquals(1, min1);

int min2 = Arrays.stream(new int[]{})
  .min()
  .orElse(0);
assertEquals(0, min2);

```

It’s worth noting that _Optional_ is not a general purpose class like _Option_ in Scala. It’s not recommended that we use it as a field value in entity classes, which is clearly indicated by it not implementing the _Serializable_ interface.

---
### ***Q5. Describe Some of the Functional Interfaces in the Standard Library***

There are a lot of functional interfaces in the _java.util.function_ package. The more common ones include, but are not limited to:

- **_Function_** – it takes one argument and returns a result
- **_Consumer_** – it takes one argument and returns no result (represents a side effect)
- **_Supplier_** – it takes no arguments and returns a result
- **_Predicate_** – it takes one argument and returns a boolean
- **_BiFunction_** – it takes two arguments and returns a result
- **_BinaryOperator_** – it is similar to a _BiFunction_, taking two arguments and returning a result. The two arguments and the result are all of the same types.
- **_UnaryOperator_** – it is similar to a _Function_, taking a single argument and returning a result of the same type

---
### ***Q6. What Is a Functional Interface? What Are the Rules of Defining a Functional Interface?***

A functional interface is an interface with one single abstract method (_default_ methods do not count), no more, no less.

Where an instance of such an interface is required, a Lambda Expression can be used instead. More formally put: _Functional interfaces_ provide target types for lambda expressions and method references.

The arguments and return type of such an expression directly match those of the single abstract method.

For instance, the _Runnable_ interface is a functional interface, so instead of:

```java
Thread thread = new Thread(new Runnable() {
    public void run() {
        System.out.println("Hello World!");
    }
});
```

We could simply do:

```java
Thread thread = new Thread(() -> System.out.println("Hello World!"));
```

Functional interfaces are usually annotated with the _@FunctionalInterface_ annotation, which is informative and doesn’t affect the semantics.

---
### ***Q7. What Is a Default Method and When Do We Use It?***

A default method is a method with an implementation, which can be found in an interface.

We can use a default method to add a new functionality to an interface, while maintaining backward compatibility with classes that are already implementing the interface:

```java
public interface Vehicle {
    public void move();
    default void hoot() {
        System.out.println("peep!");
    }
}
```

Usually when we add a new abstract method to an interface, all implementing classes will break until they implement the new abstract method. In Java 8, this problem was solved by using the default method.

For example, the _Collection_ interface does not have a _forEach_ method declaration. Thus adding such a method would simply break the whole collections API.

Java 8 introduced the default method so that the _Collection_ interface can have a default implementation of the _forEach_ method without requiring the classes implementing this interface to implement the same.

---
### ***Q8. Will the Following Code Compile?***

```java
@FunctionalInterface
public interface Function2<T, U, V> {
    public V apply(T t, U u);

    default void count() {
        // increment counter
    }
}
```

Yes, the code will compile because it follows the functional interface specification of defining only a single abstract method. The second method, _count_, is a default method that does not increase the abstract method count.

---
### ***Q9. What Is a Lambda Expression and What Is It Used For?***

In very simple terms, a lambda expression is a function that we can reference and pass around as an object.

Moreover, lambda expressions introduce functional style processing in Java, and facilitate the writing of compact and easy-to-read code.

As a result, lambda expressions are a natural replacement for anonymous classes such as method arguments. One of their main uses is to define inline implementations of functional interfaces.

---
### ***Q10. Explain the Syntax and Characteristics of a Lambda Expression***

A lambda expression consists of two parts, the parameter part and the expressions part separated by a forward arrow:

```java
params -> expressions
```

Any lambda expression has the following characteristics:

- **Optional type declaration** – when declaring the parameters on the left-hand side of the lambda, we don’t need to declare their types as the compiler can infer them from their values. So _int param -> …_ and _param ->…_ are all valid
- **Optional parentheses** – when only a single parameter is declared, we don’t need to place it in parentheses. This means _param -> …_ and _(param) -> …_ are all valid, but when more than one parameter is declared, parentheses are required
- **Optional curly braces** – when the expressions part only has a single statement, there is no need for curly braces. This means that _param – > statement_ and _param – > {statement;}_ are all valid, but curly braces are required when there is more than one statement
- **Optional return statement** – when the expression returns a value and it is wrapped inside curly braces, then we don’t need a return statement. That means _(a, b) – > {return a+b;}_ and _(a, b) – > {a+b;}_ are both valid

---
### ***Q11. What Is Nashorn in Java8?***

Nashorn is the new Javascript processing engine for the Java platform that shipped with Java 8. Until JDK 7, the Java platform used Mozilla Rhino for the same purpose, as a Javascript processing engine.

Nashorn provides better compliance with the ECMA normalized JavaScript specification and better runtime performance than its predecessor.

---
### ***Q12. What Is JJS?***

In Java 8, _jjs_ is the new executable or command line tool we use to execute Javascript code at the console.

---
### ***Q13. What Is a Stream? How Does It Differ From a Collection?***

In simple terms, a stream is an iterator whose role is to accept a set of actions to apply on each of the elements it contains.

The _stream_ represents a sequence of objects from a source such as a collection, which supports aggregate operations. They were designed to make collection processing simple and concise. Contrary to the collections, the logic of iteration is implemented inside the stream, so we can use methods like _map_ and _flatMap_ for performing a declarative processing.

Additionally, the _Stream_ API is fluent and allows pipelining:

```java
int sum = Arrays.stream(new int[]{1, 2, 3})
  .filter(i -> i >= 2)
  .map(i -> i * 3)
  .sum();
```

Another important distinction from collections is that streams are inherently lazily loaded and processed.

---
### ***Q14. What Is the Difference Between Intermediate and Terminal Operations?***

We combine stream operations into pipelines to process streams. All operations are either intermediate or terminal.

Intermediate operations are those operations that return _Stream_ itself, allowing for further operations on a stream.

These operations are always lazy, i.e. they do not process the stream at the call site. An intermediate operation can only process data when there is a terminal operation. Some of the intermediate operations are _filter_, _map_ and _flatMap_.

In contrast, terminal operations terminate the pipeline and initiate stream processing. The stream is passed through all intermediate operations during terminal operation call. Terminal operations include _forEach_, _reduce, Collect_ and _sum_.

To drive this point home, let’s look at an example with side effects:

```java
public static void main(String[] args) {
    System.out.println("Stream without terminal operation");
    
    Arrays.stream(new int[] { 1, 2, 3 }).map(i -> {
        System.out.println("doubling " + i);
        return i * 2;
    });
 
    System.out.println("Stream with terminal operation");
        Arrays.stream(new int[] { 1, 2, 3 }).map(i -> {
            System.out.println("doubling " + i);
            return i * 2;
    }).sum();
}
```

The output will be as follows:

```plaintext
Stream without terminal operation
Stream with terminal operation
doubling 1
doubling 2
doubling 3
```

As we can see, the intermediate operations are only triggered when a terminal operation exists.

---
### ***Q15. What Is the Difference Between Map and flatMap Stream Operation?***

There is a difference in signature between _map_ and _flatMap_. Generally speaking, a _map_ operation wraps its return value inside its ordinal type, while _flatMap_ does not.

For example, in _Optional_, a _map_ operation would return `Optional<String>` type, while _flatMap_ would return _String_ type.

So after mapping, we need to unwrap (read “flatten”) the object to retrieve the value, whereas after flat mapping, there is no such need as the object is already flattened. We apply the same concept to mapping and flat mapping in _Stream_.

Both _map_ and _flatMap_ are intermediate stream operations that receive a function and apply this function to all the elements of a stream.

The difference is that for the _map_, this function returns a value, but for _flatMap_, this function returns a stream. The _flatMap_ operation “flattens” the streams into one.

Here’s an example where we take a map of users’ names and lists of phones and “flatten” it down to a list of phones of all the users using _flatMap_:

```java
Map<String, List<String>> people = new HashMap<>();
people.put("John", Arrays.asList("555-1123", "555-3389"));
people.put("Mary", Arrays.asList("555-2243", "555-5264"));
people.put("Steve", Arrays.asList("555-6654", "555-3242"));

List<String> phones = people.values().stream()
  .flatMap(Collection::stream)
    .collect(Collectors.toList());
```

---
### ***Q16. What Is Stream Pipelining in Java 8?***

Stream pipelining is the concept of chaining operations together. We do this by splitting the operations that can happen on a stream into two categories: intermediate operations and terminal operations.

Each intermediate operation returns an instance of Stream itself when it runs. Therefore, we can set up an arbitrary number of intermediate operations to process data, forming a processing pipeline.

There must then be a terminal operation which returns a final value and terminates the pipeline.

---
### ***Q17. Tell Us About the New Date and Time API in Java 8***

A long-standing problem for Java developers has been the inadequate support for the date and time manipulations required by ordinary developers.

The existing classes such as _java.util.Date_ and _SimpleDateFormatter_ aren’t thread-safe, leading to potential concurrency issues for users.

Poor API design is also a reality in the old Java Data API. Here’s just a quick example: years in _java.util.Date_ start at 1900, months start at 1, and days start at 0, which is not very intuitive.

These issues and several others have led to the popularity of third-party date and time libraries, such as Joda-Time.

In order to address these problems and provide better support in JDK, a new date and time API, which is free of these problems, has been designed for Java SE 8 under the package _java.time_.
