# 1. <ins>JVM Garbage Collectors</ins>

![[1.GeneralWorkFlowInOneCycleOfGarbageCollector.svg]]

---

![[2.GarbageCollectorAdvantagesAndDisadvantages.svg]]

---

![[3.JVMGarbageCollectorTypes.svg]]

---

![[4.SerialGarbageCollector.svg]]

---

![[5.ParallelGarbageCollector.svg]]


---

![[6.G1GarbageCollector.svg]]

---
## <ins>Java 8 Changes</ins>

_Java 8u20_ has introduced one more _JVM_ parameter for reducing the unnecessary use of memory by creating too many instances of the same _String._ This optimizes the heap memory by removing duplicate _String_ values to a global single _char[]_ array.

We can enable this parameter by adding _**-XX:+UseStringDeduplication**_ as a _JVM_ parameter.

---

![[7.ZGarbageCollector.svg]]

# **References:**
1. https://www.baeldung.com/jvm-garbage-collectors
