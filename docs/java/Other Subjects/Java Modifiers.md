# <ins>Java Modifiers</ins>

## 1.1. <ins>Modifiers</ins>
* Modifiers in Java are used for setting the access level to classes, variables, methods, and constructors.

## 1.2. <ins>Access Modifiers</ins>
There are four access modifiers: **public**, **private**, **protected**, and **default (no keyword/package-private)**. Before we begin, please note that a top-level class can only use public or default access modifiers. At the member level, we can use all four.

### 1.2.1. <ins>Visibility based on access modifiers:</ins>
* **public** - available to the whole world
* **protected** - same package (as with package-private access level), as well as from all subclasses of its class
* **default** - all members are visible within the same package,
* **private** - accessible from the same class only

The table below summarizes the available access modifiers. We can see that a class, regardless of the access modifiers used, always has access to its members:

| Modifier  | Class | Package | Subclass | World |
|-----------|-------|---------|----------|-------|
| public    | Y     | Y       | Y        | Y     |
| protected | Y     | Y       | Y        | N     |
| default   | Y     | Y       | N        | N     |
| private   | Y     | N       | N        | N     |

## 1.2. <ins> Modifiers Order</ins>
* The Java Language Specification ([Java Development Process](java-development-process.md)) recommends listing modifiers in the following order:
1. Annotations [Annotations](annotations.md)
2. public
3. protected
4. private
5. abstract
6. static
7. final [Final Modifier](final-modifier.md)
8. transient
9. volatile
10. synchronized
11. native
12. default
13. strictfp

# **References:**
1. https://www.baeldung.com/java-access-modifiers
2. SonarQube
