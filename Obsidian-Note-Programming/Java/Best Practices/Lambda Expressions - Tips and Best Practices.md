# 1. <ins>Lambda Expressions - Tips and Best Practices</ins>

# 2. <ins>Referred Functionalities:</ins>
1. [[Lambda Expressions]]
# 3. <ins>Tips:</ins>

## 3.1. <ins>Don’t Treat Lambda Expressions as Inner Classes</ins>

Where we essentially substituted inner class by a lambda expression, the two concepts are different in an important way: scope.

When we use an inner class, it creates a new scope. We can hide local variables from the enclosing scope by instantiating new local variables with the same names. We can also use the keyword _**this**_ inside our inner class as a reference to its instance.

Lambda expressions, however, work with enclosing scope. We can’t hide variables from the enclosing scope inside the lambda’s body. In this case, the keyword _**this**_ is a reference to an enclosing instance.

**Example:**
```java
private String value = "Enclosing scope value";
```
Then in some method of this class, place the following code and execute this method:
```java
public String scopeExperiment() {
    Foo fooIC = new Foo() {
        String value = "Inner class value";

        @Override
        public String method(String string) {
            return this.value;
        }
    };
    String resultIC = fooIC.method("");

    Foo fooLambda = parameter -> {
        String value = "Lambda value";
        return this.value;
    };
    String resultLambda = fooLambda.method("");

    return "Results: resultIC = " + resultIC + 
      ", resultLambda = " + resultLambda;
}
```
If we execute the _scopeExperiment()_ method, we’ll get the following result: 
```java
resultIC = Inner class value, resultLambda = Enclosing scope value
```
As we can see, by calling *this.value* in IC, we can access a local variable from its instance. In the case of the lambda, *this.value* call gives us access to the variable _value,_ which is defined in the *UseFoo* class, but not to the variable *value* defined inside the lambda’s body.

## 3.2. <ins>Keep Lambda Expressions Short and Self-explanatory</ins>

If possible, we should use one line constructions instead of a large block of code. Remember, **lambdas should be an** **expression, not a narrative.** Despite its concise syntax, **lambdas should specifically express the functionality they provide.**

This is mainly stylistic advice, as performance will not change drastically. In general, however, it is much easier to understand and to work with such code.

This can be achieved in many ways.
### 3.2.1. <ins>Avoid Blocks of Code in Lambda’s Body</ins>

If we have a large block of code, the lambda’s functionality is not immediately clear.

With this in mind, do the following:
```java
Foo foo = parameter -> buildString(parameter);

private String buildString(String parameter) {
    String result = "Something " + parameter;
    //many lines of code
    return result;
}
```
Instead of:
```java
Foo foo = parameter -> { String result = "Something " + parameter; 
    //many lines of code 
    return result; 
}
```
**It is important to note, we shouldn’t use this “one-line lambda” rule as dogma**. If we have two or three lines in lambda’s definition, it may not be valuable to extract that code into another method.

### 3.2.2. <ins>Avoid Specifying Parameter Types</ins>

A compiler, in most cases, is able to resolve the type of lambda parameters with the help of [[Type Inference]]. Consequently, adding a type to the parameters is optional and can be omitted.

We can do this:
```java
(a, b) -> a.toLowerCase() + b.toLowerCase();
```
Instead of this:
```java
(String a, String b) -> a.toLowerCase() + b.toLowerCase();
```

### 3.2.3. <ins>Avoid Parentheses Around a Single Parameter</ins>

Lambda syntax only requires parentheses around more than one parameter, or when there is no parameter at all. That’s why it’s safe to make our code a little bit shorter, and to exclude parentheses when there is only one parameter.

So we can do this:
```java
a -> a.toLowerCase();
```

Instead of this:
```java
(a) -> a.toLowerCase();
```

### 3.2.4 <ins>Avoid Return Statement and Braces</ins>

**Braces** and **return** statements are optional in one-line lambda bodies. This means that they can be omitted for clarity and conciseness.

We can do this:
```java
a -> a.toLowerCase();
```
Instead of this:
```java
a -> {return a.toLowerCase()};
```

### 3.2.5. <ins>Use Method References</ins>

Very often, even in our previous examples, lambda expressions just call methods which are already implemented elsewhere. In this situation, it is very useful to use another Java 8 feature: method references.

The lambda expression would be:
```java
a -> a.toLowerCase();
```
We could substitute it with:
```java
String::toLowerCase;
```
This is not always shorter, but it makes the code more readable.

## 3.3. <ins>Use “Effectively Final” Variables</ins>

Accessing a non-final variable inside lambda expressions will cause a compile-time error, **but that doesn’t mean that we should mark every target variable as *final*.**

According to the [[Effectively Final Variables]] concept, a compiler treats every variable as _final_ as long as it is assigned only once.

It’s safe to use such variables inside lambdas because the compiler will control their state and trigger a compile-time error immediately after any attempt to change them.

For example, the following code will not compile:
```java
public void method() {
    String localVariable = "Local";
    Foo foo = parameter -> {
        String localVariable = parameter;
        return localVariable;
    };
}
```
The compiler will inform us that:
```java
Variable 'localVariable' is already defined in the scope.
```
This approach should simplify the process of making lambda execution thread-safe.

### 3.4. <ins>Protect Object Variables From Mutation</ins>

One of the main purposes of lambdas is use in parallel computing, which means that they’re really helpful when it comes to thread-safety.

The “effectively final” paradigm helps a lot here, but not in every case. Lambdas can’t change a value of an object from enclosing scope. But in the case of mutable object variables, a state could be changed inside lambda expressions.

Consider the following code:
```java
int[] total = new int[1];
Runnable r = () -> total[0]++;
r.run();
```
This code is legal, as _total_ variable remains “effectively final,” but will the object it references have the same state after execution of the lambda? No!

Keep this example as a reminder to avoid code that can cause unexpected mutations.

# References:
1. https://www.baeldung.com/java-8-lambda-expressions-tips