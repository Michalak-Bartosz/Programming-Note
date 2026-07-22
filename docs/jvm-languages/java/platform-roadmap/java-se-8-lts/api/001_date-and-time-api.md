---
tags:
  - java
  - jdk-8
  - platform
  - jvm-languages
  - platform-roadmap
  - documentation
---
# 1. Date and Time API

Java 8 introduced new APIs for _Date_ and _Time_ to address the shortcomings of the older _java.util.Date_ and
_java.util.Calendar_.
The API lives in the _java.time_ package while keeping compatibility layers to interoperate with _java.util_ legacy types when required.

!!! tip "Prefer java.time over legacy classes"
    Adopt the immutable types from _java.time_ for all new development and only convert to _java.util.Date_ or
    _Calendar_ when interacting with legacy APIs. This keeps business logic thread safe and far easier to reason about.

## 1.1. Motivations to change
- **Thread Safety.** The _Date_ and _Calendar_ classes are not thread safe, which forces developers to add boilerplate synchronization and debug elusive race conditions. The Java 8 _Date_ and _Time_ APIs are immutable and thread safe, eliminating that burden.
- **API Design and Clarity.** The legacy APIs expose inconsistent models and lack utility methods for everyday work. The new _Date/Time_ API is **ISO-centric**, models date, time, duration, and periods consistently, and offers rich helper methods.
- **Time-Zone Awareness.** Previously, developers had to hand-roll time-zone handling logic. With Java 8 the _Local*_ and _ZonedDateTime_ types provide first-class support for offsets and named regions.

## 1.2. _LocalDate_, _LocalTime_ and _LocalDateTime_

The most commonly used classes are _LocalDate_, _LocalTime_ and _LocalDateTime_. As their names indicate, they represent
the local date/time from the context of the observer.

### 1.2.1. LocalDate

The _LocalDate_ represents a date in ISO format (yyyy-MM-dd) without time. We can use it to store dates like birthdays
and paydays.

An instance of current date can be created from the system clock:

```java
LocalDate localDate = LocalDate.now();
```

And we can get the _LocalDate_ representing a specific day, month and year by using the of method or the parse method.

For example, these code snippets represent the _LocalDate_ for February 20, 2015:

```java
LocalDate.of(2015, 2, 20); // factory method
LocalDate.parse("2015-02-20"); // parsing input String
```

> **NOTE:** `LocalDate` stores only a calendar date. When you need wall-clock information, compose it with _LocalTime_
> or switch to _LocalDateTime_.

The _LocalDate_ provides various utility methods to obtain a variety of information. Some of them:

- Adding one day to the current date to get tomorrow's date:
    ```java
    LocalDate tomorrow = LocalDate.now().plusDays(1);
    ```
- Subtracting one month from the current date to get the same day in the previous month:
    ```java
    LocalDate previousMonthSameDay = LocalDate.now().minus(1, ChronoUnit.MONTHS);
    ```
- Getting the day of the week and day of the month from a specific date:
    ```java
    DayOfWeek sunday = LocalDate.parse("2016-06-12").getDayOfWeek();
    int twelve = LocalDate.parse("2016-06-12").getDayOfMonth();
    ```
- Checking if the current year is a leap year:
    ```java
    boolean leapYear = LocalDate.now().isLeapYear();
    ```
- Getting the beginning of the day and the first day of the month for a specific date:
    ```java
    LocalDateTime beginningOfDay = LocalDate.parse("2016-06-12").atStartOfDay();
    LocalDate firstDayOfMonth = LocalDate.parse("2016-06-12")
        .with(TemporalAdjusters.firstDayOfMonth());
    ```

### 1.2.2. LocalTime

**The _LocalTime_ represents time without a date.** Similar to _LocalDate_, we can create an instance of _LocalTime_
from the system clock or by using parse and of methods.

An instance of current _LocalTime_ can be created from the system clock:

```java
LocalTime now = LocalTime.now();
```

We can create a _LocalTime_ representing 6:30 a.m. by parsing a string representation or factory method:

```java
LocalTime sixThirty = LocalTime.of(6, 30); // factory method
LocalTime parsed = LocalTime.parse("06:30"); // parsing input String
```

The _LocalTime_ like _LocalDate_ provides various utility methods to obtain a variety of information. Some of them:

!!! info "Quick operations on LocalTime"
    Use the fluent API to add or subtract units with `plus`/`minus` and to inspect fields with getters such as
    `getHour()` or `getMinute()`. Time-zone aware logic should move to _ZonedDateTime_.

- Adding one hour to 6:30 a.m. to get 7:30 a.m.:
    ```java
    LocalTime sevenThirty = LocalTime.parse("06:30").plus(1, ChronoUnit.HOURS);
    ```
- Getting the hour part from 6:30 a.m.:
    ```java
    int six = LocalTime.parse("06:30").getHour();
    ```
- Comparing two _LocalTime_ instances:
    ```java
    boolean isBefore = LocalTime.parse("06:30").isBefore(LocalTime.parse("07:30"));
    ```
- Getting the maximum possible _LocalTime_ value:
    ```java
    LocalTime maxTime = LocalTime.MAX; // returns 23:59:59.999999999
    ```

### 1.2.3. LocalDateTime

_LocalDateTime_ is used to represent a combination of date and time. This is the most commonly used class when we need a
combination of date and time.

The class offers a variety of APIs. Here, we’ll look at some of the most commonly used ones.

- Retrieving the current date and time from the system clock:
    ```java
    LocalDateTime.now();
    ```
- Creating a _LocalDateTime_ representing 6:30 a.m. on February 20, 2015:
    ```java
    LocalDateTime.of(2015, Month.FEBRUARY, 20, 6, 30); // factory method
    LocalDateTime.parse("2015-02-20T06:30:00"); // parsing input String
    ```
- Adding or subtracting days or hours:
    ```java
    localDateTime.plusDays(1);
    localDateTime.minusHours(2);
    ```
- Getting the month part from the _LocalDateTime_ instance:
    ```java
    localDateTime.getMonth();
    ```

## 1.3. ZonedDateTime and OffsetDateTime

### 1.3.1. ZonedDateTime

Java 8 provides _ZonedDateTime_ when we need to deal with time-zone-specific date and time. The [_ZoneId_](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) is an identifier used to represent different
zones. There are about 40 different time zones, and the _ZoneId_ represents them as follows.

!!! warning "Always persist a zone identifier"
    Offsets such as `+02:00` change with daylight-saving rules. Persist a named zone (for example,
    `Europe/Paris`) alongside the timestamp to replay historical events accurately.

Here, we create a Zone for Paris:

```java
ZoneId zoneId = ZoneId.of("Europe/Paris");
```

Other useful examples:

- Set of all available zone ids:
    ```java
    Set<String> allZoneIds = ZoneId.getAvailableZoneIds();
    ```
- Convert _LocalDateTime_ to _ZonedDateTime_:
    ```java
    ZonedDateTime zonedDateTime = ZonedDateTime.of(localDateTime, zoneId);
    ```
- Create _LocalDateTime_ instance:
    ```java
    LocalDateTime localDateTime = LocalDateTime.of(2015, Month.FEBRUARY, 20, 6, 30);
    ```
- Create _ZonedDateTime_ instance by parsing a string representation:
    ```java
    ZonedDateTime.parse("2015-05-03T10:15:30+01:00[Europe/Paris]");
    ```

### 1.3.2. OffsetDateTime

Another way to work with time zone is by using _OffsetDateTime_. The _OffsetDateTime_ is an immutable representation of
a **date-time with an offset**. This class **stores all date and time fields, to a precision of nanoseconds**, as well
as the **offset from UTC/Greenwich**.

The _OffSetDateTime_ instance can be created using _ZoneOffset_. Here, we create a LocalDateTime representing 6:30 a.m.
on February 20, 2015. Then we add two hours to the time by creating a _ZoneOffset_ and setting for the localDateTime
instance.

```java
LocalDateTime localDateTime = LocalDateTime.of(2015, Month.FEBRUARY, 20, 6, 30);
ZoneOffset offset = ZoneOffset.of("+02:00");
OffsetDateTime offSetByTwo = OffsetDateTime
        .of(localDateTime, offset); //result 2015-02-20 06:30 +02:00
```

## 1.4. _Period_ and _Duration_

The _Period_ class represents a **quantity of time in terms of years, months and days**, and the _Duration_ class
represents a **quantity of time in terms of seconds and nanoseconds**.

!!! note "Choosing between Period and Duration"
    Use _Period_ for human-friendly calendar math ("two weeks from now") and _Duration_ for machine-precise intervals
    ("add 500 milliseconds"). Mixing them can lead to subtle bugs when months have a different number of days.

### 1.4.1. Period

The _Period_ class is widely used to modify values of given a date or to obtain the difference between two dates:

```java
LocalDate initialDate = LocalDate.parse("2007-05-10");
LocalDate finalDate = initialDate.plus(Period.ofDays(5));
int five = Period.between(initialDate, finalDate).getDays();
```

We can get the Period between two dates in a specific unit such as days or months or years, using ChronoUnit.between:

```java
long five = ChronoUnit.DAYS.between(initialDate, finalDate);
```

### 1.4.2. Duration

Similar to _Period_, the _Duration_ class is used to deal with Time.

Let’s create a _LocalTime_ of 6:30 a.m. and then add a duration of 30 seconds to make a _LocalTime_ of 6:30:30 a.m.:

```java
LocalTime initialTime = LocalTime.of(6, 30, 0);
LocalTime finalTime = initialTime.plus(Duration.ofSeconds(30));
```

We can get the Duration between two instants as either a Duration or a specific unit.

```java
long thirty = Duration.between(initialTime, finalTime).getSeconds();
long thirty = ChronoUnit.SECONDS.between(initialTime, finalTime);
```

## 1.5. Compatibility With old Date and Calendar

Java 8 has added the toInstant() method, which helps to convert existing Date and Calendar instance to new Date and Time
API:

```java
LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault());
LocalDateTime.ofInstant(calendar.toInstant(), ZoneId.systemDefault());
```

The LocalDateTime can be constructed from epoch seconds. The result of the below code would be a _LocalDateTime_
representing 2016-06-13T11:34:50:

```java
LocalDateTime.ofEpochSecond(1_465_817_690, 0, ZoneOffset.UTC);
```

## 1.6. Date and Time Formatting

Java 8 provides APIs for the easy formatting of Date and Time:

```java
LocalDateTime localDateTime = LocalDateTime.of(2015, Month.JANUARY, 25, 6, 30);
String localDateString = localDateTime.format(DateTimeFormatter.ISO_DATE); //result 2015-01-25:
```

The _DateTimeFormatter_ provides various standard formatting options.

Custom **patterns** can be provided to the format method as well, which here returns a LocalDate as **2015/01/25**:

```java
localDateTime.format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
```

We can pass in formatting style either as **SHORT**, **LONG** or **MEDIUM** as part of the formatting option.

For example, this would give an output representing _LocalDateTime_ in 25-Jan-2015, 06:30:00:

```java
localDateTime
        .format(DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM)
        .withLocale(Locale.UK));
```

---

# **References:**

1. [Baeldung - Java 8 Date Time Intro](https://www.baeldung.com/java-8-date-time-intro){ target="_blank" rel="noopener noreferrer" }