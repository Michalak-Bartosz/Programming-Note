---
title: Maven Commands

tags:
  - java
  - maven
  - tooling
  - documentation
---
# 1. Maven Commands

This page collects the most practical Maven commands for dependency management, builds, and project inspection.

## 1.1. Dependency Management

- Show all dependencies which could be upgraded (and the newest possible version to patch)
  ```bash
  mvn versions:display-dependency-updates
  ```