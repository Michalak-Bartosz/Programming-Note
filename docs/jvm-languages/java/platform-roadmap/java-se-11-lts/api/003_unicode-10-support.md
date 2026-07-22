---
tags:
  - java
  - jdk-11
  - platform
  - jvm-languages
  - platform-roadmap
  - documentation
---
# 1. Unicode 10 Support

Support has been added for Unicode 10.0.0. Java Platform, Standard Edition (Java SE) 9 and 10 supported Unicode 8.0.

The Unicode 10.0 standard includes 16,018 characters and 10 scripts that were introduced since Unicode 8.0, all of which are supported in Java SE 11.

## 1.1. Summary
Upgrade existing platform APIs to support version 10.0 of the Unicode Standard.

## 1.2. Goals
Support the latest version of Unicode, mainly in the following classes:
* Character and String in the java.lang package,
* NumericShaper in the java.awt.font package, and
* Bidi, BreakIterator, and Normalizer in the java.text package.

## 1.3. Non-Goals
Four related Unicode specifications will not be implemented by this JEP:
* UTS #10, Unicode Collation Algorithm
* UTS #39, Unicode Security Mechanisms
* UTS #46, Unicode IDNA Compatibility Processing
* UTS #51, Unicode Emoji

## 1.4. Motivation
Unicode is an evolving industry standard, so we must keep Java to date with the latest version.

## 1.5. Description
Java SE 10 implements Unicode 8.0. Unicode 9.0 adds 7,500 characters and six new scripts, and Unicode 10.0.0 adds 8,518 characters and four new scripts. This upgrade will include the Unicode 9.0 changes, and thus will add a total of 16,018 characters and ten new scripts.

# **References:**
1. [Oracle - Internationalization Enhancements Java 11](https://docs.oracle.com/en/java/javase/11/intl/internationalization-enhancements1.html#GUID-6F2441EE-EACC-4D87-B295-9CE5EC6CC26B){ target="_blank" rel="noopener noreferrer" }