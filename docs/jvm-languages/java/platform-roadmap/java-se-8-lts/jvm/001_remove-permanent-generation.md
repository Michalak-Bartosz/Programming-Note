---
tags:
  - java
  - jdk-8
  - performance
  - platform
---



# 1. Remove Permanent Generation and replace by _Metaspace_

## 1.1. Permanent Generation (_PermGen_)
**_PermGen_ is a special heap space separated from the main memory heap.**

The JVM keeps track of loaded class metadata in the _PermGen_. Additionally, the JVM ([Java Virtual Machine](../../../language-mastery/012_java-virtual-machine.md)) stores all the static content in this memory section. This includes all the static methods, primitive variables, and references to the static objects.

Furthermore, **it contains data about bytecode, names, and JIT information** (Just-In-Time - [JIT Compilation](../../../language-mastery/013_jit-compilation.md)). Before Java 7, the String Pool was also part of this memory. The disadvantages of the fixed pool size are listed in [Java String Pool](../../../language-mastery/011_java-string-pool.md).

The default maximum memory size for 32-bit JVM is 64 MB and 82 MB for the 64-bit version.

However, we can change the default size with the JVM options:
* -XX:PermSize=[size] is the initial or minimum size of the _PermGen_ space
* -XX:MaxPermSize=[size] is the maximum size
**Oracle completely removed this memory space in the JDK 8 release**. Therefore, if we use these tuning flags in Java 8 and newer versions, we’ll get the following warnings:
```java
>> java -XX:PermSize=100m -XX:MaxPermSize=200m -version
OpenJDK 64-Bit Server VM warning: Ignoring option PermSize; support was removed in 8.0
OpenJDK 64-Bit Server VM warning: Ignoring option MaxPermSize; support was removed in 8.0
```
With its limited memory size, _PermGen_ is involved in generating the famous **OutOfMemoryError**. Simply put, the class loaders weren’t garbage collected properly and, as a result, generated a memory leak.

## 1.2. Metaspace
Simply put, _Metaspace_ is a new memory space – starting from the Java 8 version; it has replaced the older _PermGen_ memory space. The most significant difference is how it handles memory allocation.

**Specifically, this native memory region grows automatically by default.**

We also have new flags to tune the memory:
* **_MetaspaceSize_ and _MaxMetaspaceSize_** – we can set the _Metaspace_ upper bounds.
* **_MinMetaspaceFreeRatio_** – is the minimum percentage of class metadata capacity free after garbage collection ([JVM Garbage Collectors](../../../language-mastery/garbage-collector/001_jvm-garbage-collectors.md))
* **_MaxMetaspaceFreeRatio_** – is the maximum percentage of class metadata capacity free after a garbage collection to avoid a reduction in the amount of space
Additionally, the garbage collection process also gains some benefits from this change. The garbage collector now automatically triggers the cleaning of the dead classes once the class metadata usage reaches its maximum _Metaspace_ size.

Therefore, **with this improvement, JVM reduces the chance to get the OutOfMemory error**.
Despite all of these improvements, we still need to monitor and tune the metaspace to avoid memory leaks ([JVM Parameters](../../../language-mastery/014_jvm-parameters.md)).

# **References:**
1. [Baeldung - Java PermGen vs Metaspace](https://www.baeldung.com/java-permgen-metaspace){ target="_blank" rel="noopener noreferrer" }

