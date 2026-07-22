---
tags:
  - best-practices
  - java
  - platform
  - jvm-languages
  - language-mastery
  - documentation
---
# 1. Java Development Process

## 1.1. _JCP_ - Java Community Process
Java is developed through a formalized process called the Java Community Process. Within this process are change requests (_JSRs_). Everyone goes through a multistep process where proposed changes are taken more and more seriously, modified, analyzed and possibly implemented, or rejected.

## 1.2. _JSR_ - Java Specification Request
A _JSR_ is a document created as part of the _Java Community Process (JCP)_ that sets the scope for a team of people to develop a new specification. These specifications are always related to Java, but often deal with things that will not be core Java SE or Java EE technology. A _JSR_ usually takes up a mature technology, or an issue. The idea is not to create a specification that is flawed at the start because some cases were not anticipated. For example, _JSR_ 310 took up the topic of date and time, and its result is the Java Date/Time API. At the time, they built on the flaws of the previous version (java.util.Date and java.util.Calendar) and existing implementations such as Joda-Time. Interestingly, the creator of this library, Stephen Colebourne, was involved in this process.

## 1.3. _JEP_ - Java Enhancement Proposal
A _JEP_ is a document that proposes improvements to Java's core technology. These proposals are usually for enhancements that are not yet ready for specification. As the _JEP-0_ document says, the _JEP_ may require exploration of novel (even “strange”) ideas. It is often a process of prototyping and exploring what is possible. Often, after a long time, it turns out that a solution that seemed ready hits a dead end and is incompatible with the rest of the language. On the basis of the _JEP_, a JSR can be developed.

## 1.4. _JLS_ - Java Language Specification
_JLS_ is a specification of the Java language. It describes all(!) elements of the language. In the case of Java 18, it is more than 800 pages long. It is the definition of the language. It describes in great detail what conditions must be met for a program to compile correctly. Interestingly, this specification is written quite accessibly, and sometimes you can refer to it if you come across some case where it seems that it should compile, and it doesn't.


## The relationship between _JEPs_, _JSRs_ and specifications (_JLSs_) is like this:
* _JEPs_ propose and develop experimental ideas to the point where they could be specified. Not all _JEPs_ come to fruition.
* _JSRs_ take mature ideas (e.g. resulting from a _JEP_), and produce a new specification, or modifications to an existing specification. Not all _JSRs_ come to fruition.
* A specification is a common work product of a JSR. (Others include source code of interfaces, and reference implementations.) The _JLS_ is an example of a specification. Others include the JVM specification (JVMS), the Servlet and JSP specifications, the EJB specifications and so on.

# **References:**
1. [Proces Rozwoju Javy](https://javastart.pl/baza-wiedzy/slownik/proces-rozwoju-javy){ target="_blank" rel="noopener noreferrer" }
2. [What is difference between jls jsr and jep](https://stackoverflow.com/questions/51282326/what-is-the-difference-or-relation-between-jls-jsr-and-jep){ target="_blank" rel="noopener noreferrer" }