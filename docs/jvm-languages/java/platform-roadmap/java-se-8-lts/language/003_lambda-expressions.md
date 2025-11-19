---
tags:
  - java
  - jdk-8
  - language
  - platform
---



# 1. Lambda Expressions
A new language feature, has been introduced in this release. They enable you to treat functionality as a method
argument, or code as data. Lambda expressions let you express instances of single-method interfaces (referred to as
functional interfaces) more compactly.

## 1.1. Internal & External Iteration:

In external iteration, the user of an API is responsible for traversing the data structure, while in internal
iteration, the API is responsible for traversing the data structure.

* **Example of External:**
```java
for(Shape s:shapes){
        s.setColor(RED);
        }
```

* **Example of Internal:**
```java
shapes.forEach(s->s.setColor(RED));
```

Whereas **external** iteration mixes _what_ (color the shapes red) and _how_ (get an Iterator and iterate it sequentially), **internal** iteration lets the client dictate _what_ but lets the library control the _how_. This offers several potential benefits:
* client code can be clearer, since it need only focus on stating the problem, not the details of how to go about solving it,
* we can move complex optimization code into libraries where it can benefit all users.

## 1.2. Streams and lambdas:
Lambda Expressions are common used with [Stream API](../api/003_stream-api.md).

1. [Lambda Expressions - Tips and Best Practices](../../../best-practices/002_lambda-expressions-tips-and-best-practices.md)

# **References:**
1. [Lambda Expressions](https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html){ target="_blank" rel="noopener noreferrer" }
2. [State of the Lambda](https://cr.openjdk.org/~briangoetz/lambda/lambda-state-final.html){ target="_blank" rel="noopener noreferrer" }
3. [State of the Lambda: Libraries Edition](https://cr.openjdk.org/~briangoetz/lambda/lambda-libraries-final.html){ target="_blank" rel="noopener noreferrer" }
