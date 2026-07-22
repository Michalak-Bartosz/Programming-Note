---
tags:
  - java
  - spring
  - spring-boot
  - jvm-languages
  - frameworks
  - documentation
---
# 1. Spring Bean Scopes

Spring bean scopes define how long a bean instance lives and how it is shared within the application context. In Spring, the default scope is singleton, which means one shared bean instance per container, but other scopes such as prototype, request, and session are also available depending on the use case.

Understanding bean scopes is important when designing components that should be shared, recreated, or tied to a specific web request or user session.

# **References:**
1. [Spring Bean Scopes - Baeldung](https://www.baeldung.com/spring-bean-scopes){ target="_blank" rel="noopener noreferrer" }