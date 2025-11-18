---
tags:
  - Java
  - Interview Questions
  - Core Java
---

# Core Java Questions for Beginners

### ***Q1. Is Data Passed by Reference or by Value in Java?***

Although the answer to this question is pretty simple, this question may be confusing for beginners. First, let's clarify what the question is about:

1. **Passing by value –** means that we pass **a copy of an object** as a parameter into a method.
2. **Passing by reference –** means that we pass **a reference to an object** as a parameter into a method.

To answer the question we have to analyze two cases. They represent two types of data that we can pass to a method: a primitive and an object.

When we pass primitives to a method, its value is copied into a new variable. When it comes to objects, the value of the reference is copied into a new variable. **So we can say that Java is a strictly _pass-by-value_ language.**

### ***Q2. What Is the Difference Between Import and Static Imports?***

We can use regular imports to import a specific class or all classes defined in a different package:

```java
import java.util.ArrayList; //specific class
import java.util.*; //all classes in util package
```

We can also use them to import public nested classes of an enclosing class:

```java
import com.baeldung.A.*
```

However, we should be aware that the import above doesn’t import class _A_ itself.

**There are also static imports that enable us to import static members or nested classes:**

```java
import static java.util.Collections.EMPTY_LIST;
```

The effect is that we can use the static variable EMPTY_LIST without prepending the fully qualified class name, i.e. as if it was declared in the current class.

### ***Q3. Which Access Modifiers Are Available in Java and What Is Their Purpose?***

There are four access modifiers in _Java_:
1. _private_
2. _default_ (package)
3. _protected_
4. _public_

**The _private_ modifier assures that class members won’t be accessible outside the class.** It can be applied to methods, properties, constructors, nested classes, but not to top-level classes themselves.

Unlike the _private_ modifier, we can apply the _default_ modifier to all types of class members and to the class itself. We can apply _default_ visibility by not adding any access modifier at all. **If we use _default_ visibility our class or its members will be accessible only inside the package of our class.** We should keep in mind that the default access modifier has nothing in common with the _default_ keyword.

Similar to the _default_ modifier, all classes within one package can access _protected_ members. **What’s more, the _protected_ modifier allows subclasses to access the protected members of a superclass, even if they are not within the same package.** We can’t apply this access modifier to classes, only to class members.

The _public_ modifier can be used together with the _class_ keyword and all class members. **It makes classes and class members accessible in all packages and by all classes.**

### ***Q4. Which Other Modifiers Are Available in Java and What Is Their Purpose?***

There are five other modifiers available in Java:
- _static_
- _final_
- _abstract_
- _synchronized_
- _volatile_

These do not control visibility.

First of all, we can apply the _static_ keyword to fields and methods. **Static fields or methods are class members, whereas non-static ones are object members**. Class members don’t need an instance to be invoked. They are called with the class name instead of the object reference name.

Then, we have the _final_ keyword. We can use it with fields, methods, and classes. **When _final_ is used on a field, it means that the field reference cannot be changed.** So it can’t be reassigned to another object. **When _final_ is applied to a class or a method, it assures us that that class or method cannot be extended or overridden.**

The next keyword is _abstract_. This one can describe classes and methods. **When classes are _abstract_, they can’t be instantiated.** Instead, they are meant to be subclassed. When methods are _abstract_, they are left without implementation and can be overridden in subclasses.

The _synchronized_ keyword may be the most advanced. We can use it with the instance as well as with static methods and code blocks. **When we use this keyword, we make Java use a monitor lock to provide synchronization on a given code fragment.**

The last keyword we’re going to discuss is _volatile_. We can only use it together with instance and static fields. **It declares that the field value must be read from and written to the main memory – bypassing the CPU cache.** All reads and writes for a volatile variable are atomic.

### ***Q5. What Is the Difference Between JDK, JRE, and JVM?***

_JDK_ stands for _Java Development Kit_, which is a set of tools necessary for developers to write applications in Java. There are three types of JDK environments:
- **Standard Edition** – development kit for creating portable desktop or server applications
- **Enterprise Edition** – an extension to the Standard Edition with support for distributed computing or web services
- **Micro Edition** – development platform for embedded and mobile applications

There are plenty of tools included in the JDK which **help programmers with writing, debugging, or maintaining applications**. The most popular ones are a compiler (_javac_), an interpreter (_java_), an archiver (_jar_), and a documentation generator (_javadoc_).

_JRE_ is a _Java Runtime Environment_. It’s a part of the JDK, but **it contains the minimum functionality to run Java applications**. It consists of a _Java Virtual Machine_, core classes, and supporting files. For example, it doesn’t have any compiler.

_JVM_ is the acronym for _Java Virtual Machine_, which is a virtual machine able to run programs compiled to bytecode. It’s described by the JVM specification, as it’s important to ensure interoperability between different implementations. **The most important function of a JVM is to enable users to deploy the same Java application into different operating systems and environments without worrying about what lies underneath**.

### Q6. What Is the Difference Between Stack and Heap?

There are two parts of memory where all variables and objects are stored by the JVM. The first is the _stack_ and the second is the _heap_.

The **_stack_ is a place where the JVM reserves blocks for local variables and additional data**. The stack is a _LIFO_ (last in first out) structure. It means that whenever a method is called, a new block is reserved for local variables and object references. Each new method invocation reserves the next block. When methods finish their execution, blocks are released in the reversed manner they were started.

Every new thread has its own stack.

We should be aware that the stack has much less memory space than the heap. And when a stack is full, the JVM will throw a _StackOverflowError_. It’s likely to occur when there is a bad recursive call and the recursion goes too deep.

**Every new object is created on the Java _h__eap_ which is used for a dynamic allocation**. There is a _g__arbage collector_ which is responsible for erasing unused objects which are divided into young (nursery) and old spaces. Memory access to the heap is slower than access to the stack. The JVM throws an _OutOfMemoryError_ when the heap is full.

### ***Q7. What Is the Difference Between the Comparable and Comparator Interfaces?***

Sometimes when we write a new class, we would like to be able to compare objects of that class. It’s especially helpful when we want to use sorted collections. There are two ways we can do this: with the _Comparable_ interface or with the _Comparator_ interface.

First, let’s look at the _Comparable_ interface:

```java
public interface Comparable<T> {
    int compareTo(T var1);
}
```

We should implement that interface by the class whose objects we want to sort.

It has the _compareTo()_ method and returns an integer. It can return three values: -1, 0, and 1 which means that this object is less than, equal to or greater than the compared object.

**It’s worth mentioning that the overridden _compareT0()_ method should be consistent with the _equals()_ method.**

On the other hand, we can use the _Comparator_ interface. It can be passed to the _sort()_ methods of the _Collection_ interface or when instantiating sorted collections. That’s why it’s mostly used to create a one-time sorting strategy.

**What’s more, it’s also useful when we use a third-party class that doesn’t implement the Comparable interface.**

Like the _compareTo()_ method, the overridden _compare()_ methods should be consistent with the _equals()_ method, but they may optionally allow comparison with nulls.

### ***Q8. What Is the void Type and When Do We Use It?***

Every time we write a method in Java, it must have a return type. If we want the method to return no value, we can use the _void_ keyword.

We should also know that there is a _Void_ class. It’s a placeholder class that may be used, for example, when working with generics. The _Void_ class can neither be instantiated nor extended.

### ***Q9. What Are the Methods of the Object Class and What Do They Do?***

It’s important to know what methods the _Object_ class contains and how they work. It’s also very helpful when we want to override those methods:
- _clone()_ – returns a copy of this object
- _equals()_ – returns _true_ when this object is equal to the object passed as a parameter
- _finalize()_ – the garbage collector calls this method while it’s cleaning the memory
- _getClass()_ – returns the runtime class of this object
- _hashCode()_ – returns a hash code of this object. **We should be aware that it should be consistent with the _equals()_ method**
- _notify()_ – sends a notification to a single thread waiting for the object’s monitor
- _notifyAll()_ – sends a notification to all threads waiting for the object’s monitor
- _toString()_ – returns a string representation of this object
- _wait()_ – there are three overloaded versions of this method. It forces the current thread to wait the specified amount of time until another thread calls _notify()_ or _notifyAll()_ on this object.

### ***Q10. What Is an Enum and How We Can Use It?***

_Enum_ is a type of class that allows developers to specify a set of predefined constant values. To create such a class we have to use the _enum_ keyword. Let’s imagine an enum of days of the week:

```java
public enum Day {
    SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY 
}
```

To iterate over all constants we can use the static _values()_ method. What’s more, enums enable us to define members such as properties and methods like regular classes.

**Although it’s a special type of class, we can’t subclass it.** An enum can, however, implement an interface.

Another interesting advantage of _Enums_ is that they are thread-safe and so they are popularly used as singletons.

### ***Q11. What Is a JAR?***

_JAR_ is a shortcut for _Java archive_. It’s an archive file packaged using the ZIP file format. We can use it to include the class files and auxiliary resources that are necessary for applications. It has many features:
- **Security –** we can digitally sign JAR files
- **Compression –** while using a JAR, we can compress files for efficient storage
- **Portability –** we can use the same JAR file across multiple platforms
- **Versioning –** JAR files can hold metadata about the files they contain
- **Sealing –** we can seal a package within a JAR file. This means that all classes from one package must be included in the same JAR file
- **Extensions –** we can use the JAR file format to package modules or extensions for existing software

### ***Q12. What Is a NullPointerException?***

The _NullPointerException_ is probably the most common exception in the Java world.  It’s an unchecked exception and thus extends _RuntimeException_. We shouldn’t try to handle it.

This exception is thrown when we try to access a variable or call a method of a null reference, like when:
- invoking a method of a null reference
- setting or getting a field of a null reference
- checking the length of a null array reference
- setting or getting an item of a null array reference
- throwing _null_

### ***Q13. What Are Two Types of Casting in Java? Which Exception May Be Thrown While Casting? How Can We Avoid It?***

We can distinguish two types of casting in Java. **We can do upcasting which is casting an object to a supertype or downcasting which is casting an object to a subtype.**

_Upcasting_ is very simple, as we always can do that. For example, we can upcast a _String_ instance to the _Object_ type:

```java
Object str = "string";
```

Alternatively, we can _downcast_ a variable. It’s not as safe as upcasting as it involves a type check. If we incorrectly cast an object, the JVM will throw a _ClassCastExcpetion_ at runtime. **Fortunately, we can use the _instanceof_ keyword to prevent invalid casting:**

```java
Object o = "string";
String str = (String) o; // it's ok

Object o2 = new Object();
String str2 = (String) o2; // ClassCastException will be thrown

if (o2 instanceof String) { // returns false
    String str3 = (String) o2;
}
```

# Core Java Questions for Advanced Programmers

### ***Q1. Why Is String an Immutable Class?***

We should know that _String_ objects are treated differently than other objects by the _JVM_. One difference is that _String_ objects are immutable. **It means that we can’t change them once we have created them.** There are several reasons why they behave that way:
1. They are stored in the _string pool_ which is a special part of the heap memory. It’s responsible for saving a lot of space.
2. The immutability of the _String_ class guarantees that its hash code won’t change. **Due to that fact, _Strings_ can be effectively used as keys in hashing collections.** We can be sure that we won’t overwrite any data because of a change in hash codes.
3. They can be used safely across several threads. **No thread can change the value of a _String_ object, so we get thread safety for free.**
4. Strings are immutable to avoid serious security issues. Sensitive data such as passwords could be changed by an unreliable source or another thread.

### ***Q2. What Is the Difference Between Dynamic Binding and Static Binding?***

Binding in Java is a process of associating a method call with the proper method body. We can distinguish two types of binding in Java: static and dynamic.

**The main difference between static binding and dynamic binding is that static binding occurs at compile time and dynamic binding at runtime.**

_Static binding_ uses class information for binding. It’s responsible for resolving class members that are _private_ or _static_ and _final_ methods and variables. Also, static binding binds overloaded methods.

_Dynamic binding_, on the other hand, uses object information to resolve bindings. That’s why it’s responsible for resolving virtual and overridden methods.

### ***Q3. What Is JIT?***

_JIT_ stands for “just in time”. It’s a component of the JRE that runs in the runtime and increases the performance of the application. **Specifically, it’s a compiler that runs just after the program’s start.**

This is different from the regular Java compiler which compiles the code long before the application is started. JIT can speed up the application in different ways.

For example, the JIT compiler is responsible for compiling bytecode into native instructions on the fly to improve performance. Also, it can optimize the code to the targeted CPU and operating system.

Additionally, it has access to many runtime statistics which may be used for recompilation for optimal performance. With this, it can also do some global code optimizations or rearrange code for better cache utilization.

### ***Q4. What Is Reflection in Java?***

Reflection is a very powerful mechanism in Java. Reflection is a mechanism of Java language which enables programmers to examine or modify the internal state of the program (properties, methods, classes etc.) at runtime. The java.lang.reflect package provides all required components for using reflection.

When using this feature, we can access all possible fields, methods, constructors that are included within a class definition. We can access them irrespective of their access modifier. It means that for example, we are able to access private members. To do that, we don’t have to know their names. All we have to do is to use some static methods of _Class_.

It’s worth knowing that there is a possibility to restrict access via reflection. To do that we can use the Java security manager and the Java security policy file. They allow us to grant permissions to classes.

When working with modules since Java 9, we should know that by default, we aren’t able to use reflection on classes imported from another module. To allow other classes to use reflection to access the private members of a package we have to grant the “Reflection” Permission.

### ***Q5. What Is a Classloader?***

The _classloader_ is one of the most important components in Java. It’s a part of the JRE.

Simply put, the _classloader_ is responsible for loading classes into the JVM. We can distinguish three types of classloaders:
- **Bootstrap classloader –** it loads the core Java classes. They are located in the _<JAVA_HOME>/jre/lib_ directory
- **Extension classloader –** it loads classes located in _<JAVA_HOME>/jre/lib/ext_ or in the path defined by the _java.ext.dirs_ property
- **System classloader –** it loads classes on the classpath of our application

A classloader loads classes “on demand”. It means that classes are loaded after they are called by the program. What’s more, a classloader can load a class with a given name only once. However, if the same class is loaded by two different class loaders, then those classes fail in an equality check.

### ***Q6. What Is the Difference Between Static and Dynamic Class Loading?***

Static class loading takes place when we have source classes available at compile time. We can make use of it by creating object instances with the _new_ keyword.

Dynamic class loading refers to a situation when we can’t provide a class definition at the compile time. Yet, we can do that at runtime. To create an instance of a class, we have to use the _Class.forName()_ method:

```java
Class.forName("oracle.jdbc.driver.OracleDriver")
```

### ***Q7. What Is the Purpose of the Serializable Interface?***

**We can use the _Serializable_ interface to enable the serializability of a class, using Java’s Serialization API.** Serialization is a mechanism for saving the state of an object as a sequence of bytes while deserialization is a mechanism for restoring the state of an object from a sequence of bytes. The serialized output holds the object’s state and some metadata about the object’s type and types of its fields.

We should know that subtypes of serializable classes are also serializable. However, if we want to make a class serializable, but its supertype is non-serializable we have to do two things:

- implement the _Serializable_ interface
- assure that a no-argument constructor is present in the superclass

### ***Q8. Is There a Destructor in Java?***

In Java, the garbage collector automatically deletes the unused objects to free up the memory. Developers have no need to mark the objects for deletion, which is error-prone. **So it’s sensible Java has no destructors available.**

In case the objects hold open sockets, open files, or database connections, **the garbage collector is not able to reclaim those resources**. We can release the resources in the _close_ method and use _try-finally_ syntax to call the method afterward before Java 7, such as the I/O classes _FileInputStream_and _FileOutputStream_. **As of Java 7, we can implement the interface _AutoCloseable_ and use _try-with-resources_ statement to write shorter and cleaner code**.  But it’s possible the API users forget to call the _close_ method, so the _finalize_ method and _Cleaner_ class come into existence to act as the safety net. **But please be cautioned they are not equivalent to the destructor.**

**It’s not assured both _the finalize_ method and the _Cleaner_ class will run promptly.** They even get no chance to run before the JVM exits. Although we could call _System.runFinalization_ to suggest that JVM run the _finalize_ methods of any objects pending for finalization, it’s still non-deterministic.

Moreover, the _finalize_ method can cause performance issues, deadlocks, etc.

**As of Java 9**, the **_Cleaner_ class is added to replace the _finalize_ method** because of the downsides it has. As a result, we have better control over the thread which does the cleaning actions.

But the java spec points out the behavior of cleaners during _System.exit_ is implementation-specific and Java provides no guarantees whether cleaning actions will be invoked or not.