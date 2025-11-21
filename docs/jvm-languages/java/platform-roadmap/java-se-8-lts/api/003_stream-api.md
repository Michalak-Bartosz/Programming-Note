---
tags:
  - java
  - jdk-8
  - platform
---



# 1. Stream API

check: https://www.baeldung.com/java-8-streams

The key library abstraction. A stream represents a sequence of values, and exposes a set of aggregate operations that allow us to express common manipulations on those values easily and clearly. The libraries provide convenient ways to obtain stream views of collections, arrays, and other data sources.
<br/>Streams API as top-level abstraction use [Lambda Expressions](../language/003_lambda-expressions.md) inside.

* **Example:**

```java
//1
shapes.stream()
        .filter(s->s.getColor()==BLUE)
        .forEach(s->s.setColor(RED));

//2
        List<Shape> blue=shapes.stream()
        .filter(s->s.getColor()==BLUE)
        .collect(Collectors.toList());

//3
        Set<Box> hasBlueShape=shapes.stream()
        .filter(s->s.getColor()==BLUE)
        .map(s->s.getContainingBox())
        .collect(Collectors.toSet());

//4
        int sum=shapes.stream()
        .filter(s->s.getColor()==BLUE)
        .mapToInt(s->s.getWeight())
        .sum();
```

## 1.1. Laziness
Operations like filtering or mapping, can be performed **eagerly** (where the filtering is performed on all elements before the filter method returns), or **lazily** (where the Stream representing the filtered result only applies the filter to elements from its source as needed.) Performing computations lazily, where practical, can be beneficial. For example, if we perform filtering lazily, we can fuse the filtering with other operations later in the pipeline, so as not to require multiple passes on the data. Similarly, if we are searching a large collection for the first element that matches a given criteria, we can stop once we find one, rather than processing the entire collection. (This is especially important for infinite sources; whereas laziness is merely an optimization for finite sources, it makes operations on infinite sources possible, whereas an eager approach would never terminate.)

In a pipeline such as:
```java
int sum = shapes.stream()
        .filter(s -> s.getColor() == BLUE)
        .mapToInt(s -> s.getWeight())
        .sum();
```
...the filtering and mapping operations are **lazy**. This means that we **don't start drawing elements from the source until we start the sum operation**, and when we do perform the sum operation, we fuse filtering, mapping, and addition into a single pass on the data. This **minimizes the bookkeeping costs** required to manage intermediate elements.

Conveniently, when used in a source-lazy-lazy-eager pipeline, the laziness is mostly invisible, as the computation is "sandwiched" with a source at one end (often a collection), and an operation that produces the desired result (or side-effect) at the other end. This turns out to yield good usability and performance in an API with a relatively small surface area.

Methods like _anyMatch(Predicate)_ or _findFirst()_, while **eager**, can use short-circuiting to stop processing once they can determine the final result.

* **Example:**
```java
Optional<Shape> firstBlue = shapes.stream()
                                  .filter(s -> s.getColor() == BLUE)
                                  .findFirst();
```
The _filter_ step is **lazy**, so the findFirst implementation will only draw from upstream until it gets an element, which means we need only apply the predicate to input elements until we find one for which the predicate is true, rather than all of them. The _findFirst()_ method returns an _Optional_, since there might not be any elements matching the desired criteria. Optional provides a means to describe a value that might or might not be present.

Note that the **user didn't have to ask for laziness, or even think about it very much; the right thing happened, with the library arranging for as little computation as it could.**

## 1.2. Parallelism
Stream pipelines can execute either in serial or parallel; this choice is a property of the stream. Unless you explicitly ask for a parallel stream, the JDK implementations always return sequential streams (a sequential stream may be converted into a parallel one with the _parallel()_ method.)

While **parallelism is always explicit**, it need not be **intrusive**. Our sum-of-weights example can be executed in parallel simply by invoking the _parallelStream()_ method on the source collection instead of stream().

* **Example:**
```java
// usage of parallelStream
int sum = shapes.parallelStream()
        .filter(s -> s.getColor() == BLUE)
        .mapToInt(s -> s.getWeight())
        .sum();

//add parallel to existing stream
int sum = shapes.stream()
        .parallel()
        .filter(s -> s.getColor() == BLUE)
        .mapToInt(s -> s.getWeight())
        .sum();
```
The result is that the serial and parallel expressions of the same computation look similar, but parallel executions are still clearly identified as parallel (without the parallel machinery overwhelming the code).

Because the stream source might be a mutable collection, there is the possibility for interference if the source is modified while it is being traversed. **Non-interference** requirement includes not only not interfering with the source, but not interfering with other lambdas; this sort of interference can arise when one lambda modifies mutable state and another lambda reads it.

As long as the non-interference requirement is satisfied, we can execute parallel operations safely and with predictable results even on non-thread-safe sources such as ArrayList.

## 1.3. Collectors
In the examples so far, we've used the _collect()_ method to gather the elements of a stream into a List or Set. The argument to _collect()_ is a **Collector**, which embodies a recipe for folding elements into a data structure or summary. The Collectors class contains factories for many common collectors; **toList()** and **toSet()** are among **the most commonly used**, but there are many more that can be used to perform sophisticated transforms on the data.

A **Collector is parameterized by its input and output types**. The toList() collector has an input type of some T and an output type of List<T>. A slightly more complicated Collector is toMap, of which there are several versions. The simplest version takes a pair of functions, one which maps input elements to map keys, and the other to map values. It takes a T as input and produces a Map<K,V>, where K and V are the result types of the key and value mapping functions. (More complex versions allow you to customize the type of the resulting map, or to resolve duplicates when multiple elements map to the same key.) 

* **Example:**
```java
Map<Integer, Album> albumsByCatalogNumber =
    albums.stream()
          .collect(Collectors.toMap(a -> a.getCatalogNumber(), a -> a));
```
In this example wer create a reverse index on a known unique key such as catalog number. Related to toMap is groupingBy. Let's say we wanted to tabulate our favorite tracks by artist. We want a Collector that takes as input Track and produces a Map<Artist,List<Track>>. This exactly matches the behavior of the simplest form of the groupingBy collector, which takes a classification function and produces a map keyed by that function, whose corresponding values are a list of input elements who correspond to that key.
```java
Map<Artist, List<Track>> favsByArtist =
    tracks.stream()
          .filter(t -> t.rating >= 4)
          .collect(Collectors.groupingBy(t -> t.artist));
```

## 1.4. Streams vs Collections:

Collections and streams, while bearing some superficial similarities, have different goals. Collections are primarily concerned with the efficient management of, and access to, their elements. By contrast, streams do not provide a means to directly access or manipulate their elements, and are instead concerned with declarative describing the computational operations which will be performed in aggregate on that source.

Accordingly, streams differ from Collections in several ways:

* **No storage.** Streams don't have storage for values; they carry values from a source (which could be a data structure, a generating function, an I/O channel, etc.) through a pipeline of computational steps.
* **Functional in nature.** Operations on a stream produce a result, but do not modify its underlying data source.
* **Laziness-seeking.** Many stream operations, such as filtering, mapping, sorting, or duplicate removal) can be implemented lazily. This facilitates efficient single-pass execution of entire pipelines, as well as facilitating efficient implementation of short-circuiting operations.
* **Bounds optional.** There are many problems that are sensible to express as infinite streams, letting clients consume values until they are satisfied. (If we were enumerating perfect numbers, it is easy to express this as a filtering operation on the stream of all integers.) While a Collection is constrained to be finite, a stream is not. (To terminate in finite time, a stream pipeline with an infinite source can use short-circuiting operations; alternately, you can request an Iterator from a Stream and traverse it manually.)

As an API, Streams is **completely independent of Collections**. While it is easy to use a collection as the source for a stream (Collection has _stream()_ and _parallelStream()_ methods) or to dump the elements of a stream into a collection (using the _collect()_ operation as shown earlier), aggregates other than Collection can be used as sources for streams as well. Many JDK classes, such as BufferedReader, Random, and BitSet, have been retrofitted to act as sources for streams, and Arrays.stream() provides stream view of arrays. In fact, anything that can be described with an Iterator can be used as a stream source, though if more information is available (such as size or metadata about stream contents like sortedness), the library can provide an optimized execution.

# **References:**
1. [Lambda Expressions](../language/003_lambda-expressions.md)
2. [State of the Lambda](https://cr.openjdk.org/~briangoetz/lambda/lambda-state-final.html)
