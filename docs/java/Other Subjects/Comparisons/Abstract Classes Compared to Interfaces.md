# <ins>Abstract Classes Compared to Interfaces</ins>
Abstract classes are similar to interfaces ([Interface](interface.md)). You cannot instantiate them, and they may contain a mix of methods declared with or without an implementation. However, with abstract classes, you can declare fields that are not static and final, and define public, protected, and private concrete methods. With interfaces, all fields are automatically public, static, and final, and all methods that you declare or define (as default methods) are public. In addition, you can extend only one class, whether it is abstract, whereas you can implement any number of interfaces.

Which should you use, abstract classes or interfaces?

Consider using **<ins>abstract</ins>** classes if any of these statements apply to your situation:
* You want to share code among several closely related classes.
* You expect that classes that extend your abstract class have many common methods or fields, or require access modifiers other than public (such as protected and private).
* You want to declare non-static or non-final fields. This enables you to define methods that can access and modify the state of the object to which they belong.

Consider using **<ins>interfaces</ins>** if any of these statements apply to your situation:
* You expect that unrelated classes would implement your interface. For example, the interfaces Comparable and Cloneable are implemented by many unrelated classes.
* You want to specify the behavior of a particular data type, but not concerned about who implements its behavior.
* You want to take advantage of multiple inheritance of type.


* **Example:**

**An example of an abstract** class in the JDK is _AbstractMap_, which is part of the Collections Framework. Its subclasses (which include _HashMap_, _TreeMap_, and _ConcurrentHashMap_) share many methods (including get, put, isEmpty, containsKey, and containsValue) that _AbstractMap_ defines.

**An example of** a class in the JDK that implements several **interfaces** is _HashMap_, which implements the interfaces Serializable, Cloneable, and _Map<**K, V**>_. By reading this list of interfaces, you can infer that an instance of _HashMap_ (regardless of the developer or company who implemented the class) can be cloned, is serializable (which means that it can be converted into a byte stream; see the section Serializable Objects), and has the functionality of a map. In addition, the _Map<**K, V**>_ interface has been enhanced with many default methods such as merge and forEach that older classes that have implemented this interface do not have to define.

Note that many software libraries **use both abstract classes and interfaces;** the _HashMap_ class implements several interfaces and also extends the abstract class _AbstractMap_.

# **References:**
1. [Abstract Methods and Classes](https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html)