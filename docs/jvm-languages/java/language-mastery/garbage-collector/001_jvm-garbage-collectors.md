---
tags:
  - java
  - performance
  - platform
  - jvm-languages
  - language-mastery
  - garbage-collector
  - documentation
---
# 1. JVM Garbage Collectors

```mermaid
---
title: General workflow in one cycle of Garbage Collector (GC)
---
flowchart LR
  A((GC)) --> B[STEPS]
  B --> C(MARK)
  C --> |Identifies which pieces of memory are in use and which aren't| D(SWEEP)
  B --> D
  D --> |Removes unused memory from Mark step| E(((Cycle<br/>Complete)))

style A fill:#008c31,font-size:3rem,stroke-width: 0.2rem;
style E fill:#a81f00,stroke-width: 0.2rem;
style C stroke:#0089a8,stroke-width: 0.2rem;
style D stroke:#95a800,stroke-width: 0.2rem;
```

---

```mermaid
---
title: Garbage Collector (GC) advantages and disadvantages
---
flowchart TB
  G((GC)) --> A[Advantages]
  G --> D[Disadvantages]

  A --> A1(No manual memory allocation/deallocation handling because unused memory space is automatically handled by GC)
  A --> A2(No overhead of handling Dangling Pointer)
  A --> A3(Automatic Memory Leak management - GC on its own can't guarantee the full proof solution to memory leaking; however, it takes care of a good portion of it)
  
  D --> D1(Since JVM has to keep track of object reference creation/deletion, this activity requires <br/>**MORE CPU POWER** than the original application. It may affect the performance of requests which <br/>**REQUIRE LARGE MEMORY**)
  D --> D2(Programmers have <br/>**NO CONTROL OVER THE SCHEDULING OF CPU TIME** dedicated to freeing objects that are no longer needed)
  D --> D3(Using some GC implementations might result in the <br/>**APPLICATION STOPPING UNPREDICTABLY**)
  D --> D4(Automatized memory management would <br/>**NOT BE AS EFFICIENT AS THE PROPER MANUAL MEMORY ALLOCATION/DELLOCATION**)

style G fill:#008c31,font-size:2rem,stroke-width: 0.2rem;
style A fill:#2eab00
style D fill:#a81f00

style A1 stroke:#2eab00,stroke-width: 0.2rem;
style A2 stroke:#2eab00,stroke-width: 0.2rem;
style A3 stroke:#2eab00,stroke-width: 0.2rem;

style D1 stroke:#a81f00,stroke-width: 0.2rem;
style D2 stroke:#a81f00,stroke-width: 0.2rem;
style D3 stroke:#a81f00,stroke-width: 0.2rem;
style D4 stroke:#a81f00,stroke-width: 0.2rem;
```

---

```mermaid
---
title: JVM Garbage Collector Types
---
flowchart TB
  A((JVM GC Types))
  A --> B1(Serial Garbage Collector)
  A --> B2(Parallel Garbage Collector)
  A --> B3(G1 Garbage Collector)
  A --> B4(Z Garbage Collector)

style A fill:#008c31,font-size:1rem,stroke-width: 0.2rem;
style B1 stroke:#2eab00,stroke-width: 0.2rem;
style B2 stroke:#2eab00,stroke-width: 0.2rem;
style B3 stroke:#2eab00,stroke-width: 0.2rem;
style B4 stroke:#2eab00,stroke-width: 0.2rem;
```

---

```mermaid
---
title: Serial Garbage Collector
---
flowchart TB
  G((Serial Garbage<br/>Collector))
  G --> A1(**Simplest implementation.**<br/>Works with a single thread)
  G --> D1(**Freezes all application threads when it runs.**<br/>It's not good idea to use it with multi-threaded apps, like server environments)
  G --> N1(Good choice **for most applications that don't have small pause time requirements and run on client-style machines.**)
  G --> C1("**JVM Argument:**<br/>java -XX:+UseSerialGC -jar Application.java")

style G fill:#008c31,font-size:1rem,stroke-width: 0.2rem;
style A1 stroke:#2eab00,stroke-width: 0.2rem;
style D1 stroke:#a81f00,stroke-width: 0.2rem;
style N1 stroke:#0089a8,stroke-width: 0.2rem;
style C1 stroke-width: 0.2rem;
```

---

```mermaid
---
title: Parallel Garbage Collector
---
graph TB
  G((Parallel Garbage<br/>Collector ))
  G ==> A1(**Uses multiple threads for managing heap space**)
  G ===> A2(Can specify _maximum garbage collection threads_ and _pause time_, _throughput_, and<br/>_footprint - heap size_)
  G ==> D1(**Freezes all application threads when it runs.**<br/>It's not good idea to use it with multi-threaded apps, like server environments)
  G ==> N1(**Default GC of the JVM from Java 5 until Java 8**<br/>and is sometimes called Throughput Collectors.)
  G ==> C1("**JVM Argument:**<br/>java -XX:+UseParallelGC -jar Application.java")
  subgraph JVM OPTIONS
  A2 <-.-> A21("**Numbers of garbage collector threads<br/>JVM option:**<br/>XX:ParallelGCThreads=_NUMBER_OF_THREADS_")
  A2 <-.-> A22("**Maximum pause time goal - a hint to the GC that pause times of _NUMBER_OR_MILLISECONDS_ milliseconds or less are desired<br/>JVM option:**<br/>XX:MaxGCPauseMillis=_NUMBER_OR_MILLISECONDS_")
  A2 <-.-> A23("**Time spent doing garbage collection versus the time spent outside of garbage collection is called the maximum throughput target<br/>JVM option:**<br/>XX:GCTimeRatio=_MAXIMUM_THROUGHPUT_")
  A2 <-.-> A24("**Maximum heap footprint - the amount of heap memory that a program requires while running<br/>JVM option:**<br/>XmxAMOUNT_OF_HEAP_MEMORY")
  end

style G fill:#008c31,font-size:1rem,stroke-width: 0.2rem;
style A1 stroke:#2eab00,stroke-width: 0.2rem;
style A2 stroke:#2eab00,stroke-width: 0.2rem;
style A21 stroke:#2eab00,stroke-width: 0.2rem;
style A22 stroke:#2eab00,stroke-width: 0.2rem;
style A23 stroke:#2eab00,stroke-width: 0.2rem;
style A24 stroke:#2eab00,stroke-width: 0.2rem;
style D1 stroke:#a81f00,stroke-width: 0.2rem;
style N1 stroke:#0089a8,stroke-width: 0.2rem;
style C1 stroke-width: 0.2rem;
```

---

```mermaid
---
title: G1 Garbage Collector (Garbage First)
---
graph LR
  G((G1 Garbage<br/>Collector ))
  G ==> A1(**Designed for applications running on multi-processor machines with large memory space**)
  G ==> N1(**Available from the JDK7 Update 4 and in later releases.**)
  G ==> N2(Steps of cycle)
  G ==> C1("**JVM Argument:**<br/>java -XX:+UseG1GC -jar Application.java")

  subgraph STEPS
  N2 --> N21(G1 partitions the heap into a set of equal-sized heap regions, each a contiguous range of virtual memory)
  N21 -.-> N22("G1 shows a concurrent global marking phase<br/>(i.e. phase 1, known as **Marking**) to determine the liveness of objects throughout the heap.")
  N22 -.-> N23("G1 knows which regions are mostly empty. It collects in these areas first, which usually yields a significant amount of free space<br/>(i.e. phase 2, known as **Sweeping**)")
  N23 -.-> N24(End of cycle)
  N24 --> N2
  end

style G fill:#008c31,font-size:1rem,stroke-width: 0.2rem;
style A1 stroke:#2eab00,stroke-width: 0.2rem;
style N1 stroke:#0089a8,stroke-width: 0.2rem;
style N2 fill:#0089a8,stroke-width: 0.2rem;
style N21 stroke:#0089a8,stroke-width: 0.2rem;
style N22 stroke:#0089a8,stroke-width: 0.2rem;
style N23 stroke:#0089a8,stroke-width: 0.2rem;
style N24 fill:#0089a8,stroke-width: 0.2rem;
style C1 stroke-width: 0.2rem;
```

---

## Java 8 Changes

_Java 8u20_ has introduced one more _JVM_ parameter for reducing the unnecessary use of memory by creating too many instances of the same _String._ This optimizes the heap memory by removing duplicate _String_ values to a global single _char[]_ array.

We can enable this parameter by adding _**-XX:+UseStringDeduplication**_ as a _JVM_ parameter.

---

```mermaid
---
title: Z Garbage Collector (ZGC)
---
graph LR
  G((ZGC))
  subgraph ADVANTAGES
    A1(**Scalable and low-latency garbage collector**)
    A2(Similar to G1, Z Garbage Collector partitions the heap, except that<br/>**heap regions can have different sizes.**)
    A3(ZGC works without stopping the execution of application threads for **more than 10 ms**, which makes it suitable for applications that require low latency.)
    A4(It uses load barriers with colored pointers to perform concurrent operations when the threads are running, and they're used to keep track of heap usage.)
  end
  subgraph FEATURE
    N1(**ZGC has obtained the production status from Java 15 onwards**)
    N2("**Reference colored pointers are the core concept of ZGC.** It means that ZGC uses some metadata bits of reference to mark the state of the object. It also handles heaps ranging from 8MB to 16TB in size.")
    N3("Pause times don't increase with the heap, live-set, or root-set size.")
  end
  subgraph ENABLE_ZGC [ENABLE ZGC]
    C1("**JDK versions lower than 15<br/>JVM Argument:**<br/><span style='white-space: nowrap'>java -XX:+UnlockExperimentalVMOptions -XX:+UseZGC Application.java</span>")
    C2("**From version 15 on, we don't need experimental mode on<br/>JVM Argument:**<br/><span style='white-space: nowrap'>java -XX:+UseZGC Application.java</span>")
  end
  G ==> ADVANTAGES
  G ==> FEATURE
  G ==> ENABLE_ZGC

style G fill:#008c31,font-size:2rem,stroke-width: 0.2rem;
style A1 stroke:#2eab00,stroke-width: 0.2rem;
style A2 stroke:#2eab00,stroke-width: 0.2rem;
style A3 stroke:#2eab00,stroke-width: 0.2rem;
style A4 stroke:#2eab00,stroke-width: 0.2rem;
style N1 stroke:#0089a8,stroke-width: 0.2rem;
style N2 stroke:#0089a8,stroke-width: 0.2rem;
style N3 stroke:#0089a8,stroke-width: 0.2rem;
style C1 stroke-width: 0.2rem;
style C2 stroke-width: 0.2rem;
```

# **References:**
1. [JVM Garbage Collectors - Baeldung](https://www.baeldung.com/jvm-garbage-collectors){ target="_blank" rel="noopener noreferrer" }