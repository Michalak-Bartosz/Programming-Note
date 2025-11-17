# 1. <ins>Effectively Final Variables</ins>

It allows us to not write the *final* modifier for variables, fields, and parameters that are effectively treated and used like final ones.

The main purpose of _effectively final_ variables is to enable lambdas ([Lambda Expressions](lambda-expressions.md)) to use local variables that are not explicitly declared _final_([Final Modifier](final-modifier.md)). However, **the Java compiler won’t perform static code optimization for effectively final variables the way it does for final variables!**

## 1.1. <ins>Origin</ins>
In simple terms, **objects or primitive values are _effectively final_ if we do not change their values after initialization**. In the case of objects, if we do not change the reference of an object, then it is effectively final — even if a change occurs in the state of the referenced object.

Prior to it's introduction, we could not use a *non-final* local variable in an [Anonymous Classes](anonymous-classes.md). We still cannot use variables that have more than one value assigned to them inside [Anonymous Classes](anonymous-classes.md), inner classes, and lambda expressions. The introduction of this feature allows us to not have to use the final modifier on variables that are effectively final, saving us a few keystrokes.

[Anonymous Classes](anonymous-classes.md) are inner classes, and they cannot access non-final or non-effectively-final variables or mutate them in their enclosing scopes as specified by [JLS 8.1.3](https://docs.oracle.com/javase/specs/jls/se8/html/jls-8.html#jls-8.1.3). The same limitation applies to lambda expressions ([Lambda Expressions](lambda-expressions.md)), as having access can potentially produce concurrency issues.

# 1.2. <ins>Final vs Effectively Final</ins>
The simplest way to understand whether a _final_ variable is _effectively final_ is to think whether removing the _final_ keyword would allow the code to compile and run.
* **Example:**
```java
@FunctionalInterface
public interface FunctionalInterface {
    void testEffectivelyFinal();
    default void test() {
        int effectivelyFinalInt = 10;
        FunctionalInterface functionalInterface 
            = () -> System.out.println("Value of effectively variable is : " + effectivelyFinalInt);
    }
}
```
Reassigning a value or mutating the above effectively final variable would make the code invalid regardless of where it occurs.

# 1.3. <ins>Compiler Treatment</ins>
JLS 4.12.4 states that if we remove the final modifier from a parameter or a local variable in a valid program without introducing compile-time errors, then it becomes effectively final. Moreover, it’s also safe to add the final modifier to an effectively final variable or parameter.

The Java compiler doesn’t do additional optimization for effectively final variables, unlike it does for final variables.

Let’s consider a simple example that declares two final String variables but only uses them for concatenation:
```java
public static void main(String[] args) {
    final String hello = "hello";
    final String world = "world";
    String test = hello + " " + world;
    System.out.println(test);
}
```
The compiler would change the code executed in the main method above to:
```java
public static void main(String[] var0) {
    String var1 = "hello world";
    System.out.println(var1);
}
```
On the other hand, **if we remove the final modifiers**, the variables would be considered effectively final, but **the compiler won’t remove them** since they’re only used for concatenation.

# 1.4. <ins>Atomic Modification</ins>
Generally, it’s not a good practice to modify variables used in lambda expressions and [Anonymous Classes](anonymous-classes.md). We cannot know how these variables are going to be used inside method blocks. Mutating them might lead to unexpected results in multithreading environments.

We already have a tutorial explaining the best practices when using lambda expressions and another that explains common anti-patterns when we modify them. But there’s an alternative approach that allows us to modify variables in such cases that achieves thread-safety through atomicity.

The package java.util.concurrent.atomic offers classes such as AtomicReference and AtomicInteger. We can use them to atomically modify variables inside lambda expressions:
```java
public static void main(String[] args) {
    AtomicInteger effectivelyFinalInt = new AtomicInteger(10);
    FunctionalInterface functionalInterface = effectivelyFinalInt::incrementAndGet;
}
```

# **References:**
1. https://www.baeldung.com/java-effectively-final
2. https://javarush.com/pl/groups/posts/pl.591.tak-ostateczna
3. https://javaleader.pl/2019/07/15/java-8-final-vs-effectively-final/