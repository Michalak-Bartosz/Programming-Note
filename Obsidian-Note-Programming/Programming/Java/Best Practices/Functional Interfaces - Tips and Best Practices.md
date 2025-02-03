# 1. <ins>Functional Interfaces - Tips and Best Practices</ins>

# 2. <ins>Referred Functionalities:</ins>
1. [[Functional Interfaces]]
# 3. <ins>Tips:</ins>
## 3.1. <ins>Prefer Standard Functional Interfaces</ins>

Functional interfaces, which are gathered in the [[java.util.function APIs]] package, satisfy most developers’ needs in providing target types for lambda expressions and method references. Each of these interfaces is general and abstract, making them easy to adapt to almost any lambda expression. Developers should explore this package before creating new functional interfaces.

**Example:**
This new functional interface...
```java
//Define new functional interface
@FunctionalInterface public interface Foo {
	String method(String string);
}

//Use it in method
public String add(String string, Foo foo) {
	return foo.method(string);
}

//Execute Foo functional interface
Foo foo = parameter -> parameter + " from lambda";
String result = useFoo.add("Message ", foo);
```
... can be replaced by *Function<T,R>* functional interface from *java.util.function* package:
```java
//Use it in method
public String add(String string, Function<String, String> fn) {
    return fn.apply(string);
}

//Execute
Function<String, String> fn = parameter -> parameter + " from lambda";
String result = useFoo.add("Message ", fn);
```

## 3.2. <ins>Use the @FunctionalInterface Annotation</ins>

Annotate our functional interfaces with *@FunctionalInterface* At first, this annotation seems to be useless. Even without it, our interface will be treated as functional as long as it has just one abstract method.

However, let’s imagine a big project with several interfaces; it’s hard to control everything manually. An interface, which was designed to be functional, could accidentally be changed by adding another abstract method/methods, rendering it unusable as a functional interface.

By using the _@FunctionalInterface_ annotation, the compiler will trigger an error in response to any attempt to break the predefined structure of a functional interface. It is also a very handy tool to make our application architecture easier to understand for other developers.

## 3.3. <ins>Don’t Overuse Default Methods in Functional Interfaces</ins>

We can easily add default methods to the functional interface. This is acceptable to the functional interface contract as long as there is only one abstract method declaration. 
```java
@FunctionalInterface
public interface Foo {
    String method(String string);
    default void defaultMethod() {}
}
```
Functional interfaces can be extended by other functional interfaces if their abstract methods have the same signature.
```java
@FunctionalInterface
public interface FooExtended extends Baz, Bar {}
	
@FunctionalInterface
public interface Baz {	
    String method(String string);	
    default String defaultBaz() {}		
}
	
@FunctionalInterface
public interface Bar {	
    String method(String string);	
    default String defaultBar() {}	
}
```
Just as with regular interfaces, **extending different functional interfaces with the same default method can be problematic**.

For example, let’s add the _defaultCommon()_ method to the _Bar_ and _Baz_ interfaces.
```java
@FunctionalInterface
public interface Baz {
    String method(String string);
    default String defaultBaz() {}
    default String defaultCommon(){}
}

@FunctionalInterface
public interface Bar {
    String method(String string);
    default String defaultBar() {}
    default String defaultCommon() {}
}
```
We will get an error:
```java
interface FooExtended inherits unrelated defaults for defaultCommon() from types Baz and Bar...
```
To fix this, the _defaultCommon()_ method should be overridden in the _FooExtended_ interface. We can provide a custom implementation of this method; however, **we can also reuse the implementation from the parent interface**.
```java
@FunctionalInterface
public interface FooExtended extends Baz, Bar {
    @Override
    default String defaultCommon() {
        return Bar.super.defaultCommon();
    }
}
```
It’s important to note that we have to be careful. **Adding too many default methods to the interface is not a very good architectural decision.** This should be considered a compromise, only to be used when required for upgrading existing interfaces without breaking backward compatibility.

## 3.4. <ins>Instantiate Functional Interfaces With Lambda Expressions</ins>

The compiler will allow us to use an inner class to instantiate a functional interface; however, this can lead to very verbose code. We should prefer to use lambda expressions:
```java
Foo foo = parameter -> parameter + " from Foo";
```
Over an inner class:
```java
Foo fooByIC = new Foo() {
    @Override
    public String method(String string) {
        return string + " from Foo";
    }
};
```
**The lambda expression approach can be used for any suitable interface from old libraries.** It is usable for interfaces like _Runnable_, _Comparator_, and so on; **however, this doesn’t mean that we should review our whole older code base and change everything.**

## 3.5. <ins>Avoid Overloading Methods With Functional Interfaces as Parameters</ins>

We should use methods with different names to avoid collisions.
**Example:**
```java
public interface Processor {
    String process(Callable<String> c) throws Exception;
    String process(Supplier<String> s);
}

public class ProcessorImpl implements Processor {
    @Override
    public String process(Callable<String> c) throws Exception {
        // implementation details
    }

    @Override
    public String process(Supplier<String> s) {
        // implementation details
    }
}
```
At first glance, this seems reasonable, but any attempt to execute either of the _ProcessorImpl_‘s methods.
```java
String result = processor.process(() -> "abc");
```
Ends with an error with the following message:
```java
reference to process is ambiguous
both method process(java.util.concurrent.Callable<java.lang.String>) 
in com.baeldung.java8.lambda.tips.ProcessorImpl 
and method process(java.util.function.Supplier<java.lang.String>) 
in com.baeldung.java8.lambda.tips.ProcessorImpl match
```
To solve this problem, we have two options. **The first option is to use methods with different names:**
```java
String processWithCallable(Callable<String> c) throws Exception;
String processWithSupplier(Supplier<String> s);
```
**The second option is to perform casting manually,** which is not preferred:
```java
String result = processor.process((Supplier<String>) () -> "abc");
```

# **References:**
1. https://www.baeldung.com/java-8-lambda-expressions-tips