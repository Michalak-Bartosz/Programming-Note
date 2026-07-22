---
tags:
  - java
  - jdk-21
  - performance
  - platform
  - jvm-languages
  - platform-roadmap
  - documentation
---
# 1. Generational ZGC

Generational ZGC separates young and old objects so that the collector can focus more efficiently on short-lived allocations. The goal is to improve throughput while preserving ZGC's low-pause characteristics.