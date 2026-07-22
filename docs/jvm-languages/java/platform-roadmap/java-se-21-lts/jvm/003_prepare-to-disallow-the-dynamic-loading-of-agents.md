---
tags:
  - java
  - jdk-21
  - platform
  - security
  - jvm-languages
  - platform-roadmap
  - documentation
---
# 1. Prepare to Disallow the Dynamic Loading of Agents

This change prepares the JVM to restrict dynamic agent loading, which can modify running applications and affect observability or security. The direction encourages explicit startup configuration and makes runtime instrumentation easier to audit.