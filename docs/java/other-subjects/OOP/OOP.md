# 1. <ins>Object-Oriented Programming (OOP)</ins>
Object-oriented programming is a computer programming model that organizes software design around data, or objects, rather than functions and logic. An object can be defined as a data field that has unique attributes and behavior.

_OOP_ focuses on the objects that developers want to manipulate rather than the logic required to manipulate them. This approach to programming is well suited for software that is large, complex and actively updated or maintained. This includes programs for manufacturing and design, as well as mobile applications. For example, _OOP_ can be used for manufacturing system simulation software.

The organization of an object-oriented program also makes the method beneficial for collaborative development, where projects are divided into groups. Additional benefits of _OOP_ include code reusability, scalability and efficiency.

The first step in _OOP_ is to collect all of the objects a programmer wants to manipulate and identify how they relate to each other -- an exercise known as [Data Modeling](data-modeling.md).

Examples of an object can range from physical entities, such as a human being who is described by properties like name and address, to small computer programs, such as widgets.

Once an object is known, it is labeled with a **class** of objects that defines the kind of data it contains and any logic sequences that can manipulate it. Each distinct logic sequence is known as a **method**. Objects can communicate with well-defined interfaces called messages.

## 1.1. <ins>Principles of OOP</ins>
* [Encapsulation](encapsulation.md) - The encapsulation principle states that all important information is contained inside an object and only select information is exposed. The implementation and state of each object are privately held inside a defined class. Other objects do not have access to this class or the authority to make changes. They are only able to call a list of public functions or methods. This characteristic of data hiding provides greater program security and avoids unintended data corruption.
* [Abstraction](abstraction.md) - Objects only reveal internal mechanisms that are relevant for the use of other objects, hiding any unnecessary implementation code. The derived class can have its functionality extended. This concept can help developers more easily make additional changes or additions over time.
* [Inheritance](inheritance.md) - Classes can reuse code and properties from other classes. Relationships and subclasses between objects can be assigned, enabling developers to reuse common logic, while still maintaining a unique hierarchy. Inheritance forces more thorough data analysis, reduces development time and ensures a higher level of accuracy.
* [Polymorphism](polymorphism.md) - Objects are designed to share behaviors, and they can take on more than one form. The program determines which meaning or usage is necessary for each execution of that object from a parent class, reducing the need to duplicate code. A child class is then created, which extends the functionality of the parent class. Polymorphism enables different types of objects to pass through the same interface.

**_Extra:_**
* **Syntax** - This is the set of rules that define how words and punctuation are organized in a programming language.
* **Coupling** - This is the degree to which software elements are connected to one another. For example, if a class has its attributes change, then any other coupled class also changes.
* **Association** - This is the connection between one or more classes. Associations can be one to one, many to many, one to many or many to one.

## 1.2. <ins>Benefits of OOP</ins>
* **Modularity** - Encapsulation enables objects to be self-contained, making troubleshooting and collaborative development easier.
* **Reusability** - Code can be reused through inheritance, meaning a team does not have to write the same code multiple times.
* **Productivity** - Programmers can construct new programs quickly through the use of multiple libraries and reusable code.
* **Easily upgradable and scalable** - Programmers can implement system functionalities independently.
* **Interface descriptions** - Descriptions of external systems are simple, due to message-passing techniques that are used for object communication.
* **Security** - Using encapsulation and abstraction, complex code is hidden, software maintenance is easier and internet protocols are protected.
* **Flexibility** - Polymorphism enables a single function to adapt to the class it is placed in. Different objects can also pass through the same interface.
* **Code maintenance** - Parts of a system can be updated and maintained without needing to make significant adjustments.
* **Lower cost** - Other benefits, such as its maintenance and reusability, reduce development costs.

## 1.3. <ins>Drawbacks of OOP</ins>
Developers have criticized the object-oriented programming model for multiple reasons. The largest concern is that OOP overemphasizes the data component of software development and does not focus enough on computation or algorithms. Additionally, OOP code may be more complicated to write and take longer to compile.

Other common criticisms include the fact that inheritance comes with drawbacks, such as fragile base classes. Additionally, objects are sometimes more clear while isolated but are harder to understand when operating in the actual program.

## 1.4. <ins>Other programming models:</ins>
* **[Functional programming](functional-programming.md)** - This includes languages such as Erlang and Scala, which are used for telecommunications and fault-tolerant systems.
* **[Structured or modular programming](structured-or-modular-programming.md)** - This includes languages such as PHP and C#.
* **[Imperative programming](imperative-programming.md)** - This alternative to OOP focuses on function rather than models. Imperative programming languages include C++ and Java.
* **[Declarative programming](declarative-programming.md)** - This programming method involves statements on what the task or desired outcome is but not how to achieve it. Declarative programming languages include Prolog and Lisp.
* **[Logical programming](logical-programming.md)** - This method, which is based mostly on formal logic and uses languages such as Prolog, contains a set of sentences that express facts or rules about a problem domain. It focuses on tasks that can benefit from rule-based logical queries.

**Most advanced programming languages** enable developers to **combine models** because they can be used for different programming methods. For example, JavaScript and Scala can be used for OOP and functional programming.

# **References:**
1. https://www.techtarget.com/searchapparchitecture/definition/object-oriented-programming-OOP
