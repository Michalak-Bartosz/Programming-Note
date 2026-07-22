---
tags:
  - java
  - jdk-11
  - performance
  - platform
  - jvm-languages
  - platform-roadmap
  - documentation
---
# 1. Epsilon GC

Epsilon GC is a no-op garbage collector designed for performance testing and short-lived experiments. It allocates memory but does not reclaim it, which makes it useful for measuring allocation behavior without the overhead of normal GC cycles.