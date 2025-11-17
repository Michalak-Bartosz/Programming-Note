# 1. <ins>Date and Time API</ins>
Java 8 introduced new APIs for _Date_ and _Time_ to address the shortcomings of the older _java.util.Date_ and _java.util.Calendar_.
The API use _javax.time.*_ retaining the possibility to use _java.util.time.*_.

## 1.1. <ins>Motivations to change</ins>
* **Thread safety** – The _Date_ and _Calendar_ classes are not thread safe, leaving developers to deal with the headache of hard-to-debug concurrency issues and to write additional code to handle thread safety. On the contrary, the new _Date_ and _Time_ APIs introduced in Java 8 are immutable and thread safe, thus taking that concurrency headache away from developers.
* **API design and ease of understanding** – The _Date_ and _Calendar_ APIs are poorly designed with inadequate methods to perform day-to-day operations. The new _Date/Time_ API is **ISO-centric** and follows consistent domain models for date, time, duration and periods. There are a wide variety of utility methods that support the most common operations.
* **_ZonedDate_ and _Time_** – Developers had to write additional logic to handle time-zone logic with the old APIs, whereas with the new APIs, handling of time zone can be done with _Local_ and _ZonedDate/Time_ APIs.

## 1.2. <ins>_LocalDate_, _LocalTime_ and _LocalDateTime_</ins>
The most commonly used classes are _LocalDate_, _LocalTime_ and _LocalDateTime_. As their names indicate, they represent the local date/time from the context of the observer.

### 1.2.1. <ins>LocalDate</ins>
The _LocalDate_ represents a date in ISO format (yyyy-MM-dd) without time. We can use it to store dates like birthdays and paydays.

An instance of current date can be created from the system clock:
```java
LocalDate localDate = LocalDate.now();
```
And we can get the _LocalDate_ representing a specific day, month and year by using the of method or the parse method.

For example, these code snippets represent the _LocalDate_ for February 20, 2015:
```java
LocalDate.of(2015, 02, 20); //factory method
LocalDate.parse("2015-02-20"); //parsing input String
```
The _LocalDate_ provides various utility methods to obtain a variety of information. Some of them:
* ```java
  LocalDate tomorrow = LocalDate.now().plusDays(1);
  ```
* ```java
  LocalDate previousMonthSameDay = LocalDate.now().minus(1, ChronoUnit.MONTHS);
  ```
* ```java
  DayOfWeek sunday = LocalDate.parse("2016-06-12").getDayOfWeek();
  int twelve = LocalDate.parse("2016-06-12").getDayOfMonth();
  ```
* ```java
  boolean leapYear = LocalDate.now().isLeapYear();
  ```
* ```java
  LocalDateTime beginningOfDay = LocalDate.parse("2016-06-12").atStartOfDay();
  LocalDate firstDayOfMonth = LocalDate.parse("2016-06-12")
    .with(TemporalAdjusters.firstDayOfMonth());
  ```

### 1.2.2. <ins>LocalTime</ins>
**The _LocalTime_ represents time without a date.** Similar to _LocalDate_, we can create an instance of _LocalTime_ from the system clock or by using parse and of methods.

An instance of current _LocalTime_ can be created from the system clock:
```java
LocalTime now = LocalTime.now();
```
We can create a _LocalTime_ representing 6:30 a.m. by parsing a string representation or factory method:
```java
LocalTime sixThirty = LocalTime.of(6, 30); //factory method
LocalTime sixThirty = LocalTime.parse("06:30"); //parsing input String
```
The _LocalTime_ like _LocalDate_ provides various utility methods to obtain a variety of information. Some of them:
* ```java
  LocalTime sevenThirty = LocalTime.parse("06:30").plus(1, ChronoUnit.HOURS);
  ```
* ```java
  int six = LocalTime.parse("06:30").getHour();
  ```
* ```java
  boolean isbefore = LocalTime.parse("06:30").isBefore(LocalTime.parse("07:30"));
  ```
* ```java
  LocalTime maxTime = LocalTime.MAX //return 23:59:59.99
  ```
### 1.2.3. <ins>LocalDateTime</ins>
_LocalDateTime_ is used to represent a combination of date and time. This is the most commonly used class when we need a combination of date and time.

The class offers a variety of APIs. Here, we’ll look at some of the most commonly used ones.
* ```java
  LocalDateTime.now(); //return current date and time from the system clock
  ```
* ```java
  LocalDateTime.of(2015, Month.FEBRUARY, 20, 06, 30); //factory method
  LocalDateTime.parse("2015-02-20T06:30:00"); //parsing input String
  ```
* ```java
  localDateTime.plusDays(1);
  localDateTime.minusHours(2);
  ```
* ```java
  localDateTime.getMonth();
  ```
## 1.3. <ins>ZonedDateTime and OffsetDateTime</ins>
### 1.3.1. <ins>ZonedDateTime</ins>
Java 8 provides _ZonedDateTime_ when we need to deal with time-zone-specific date and time. The [_ZoneId_](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) is an identifier used to represent different zones. There are about 40 different time zones, and the _ZoneId_ represents them as follows.

Here, we create a Zone for Paris:
```java
ZoneId zoneId = ZoneId.of("Europe/Paris");
```
Other usefull examples:
* ```java
  Set<String> allZoneIds = ZoneId.getAvailableZoneIds(); //set of all zone ids
  ```
* ```java
  ZonedDateTime zonedDateTime = ZonedDateTime.of(localDateTime, zoneId); //convert LocalDateTime to a specific zone
  ```
* ```java
  LocalDateTime localDateTime = LocalDateTime.of(2015, Month.FEBRUARY, 20, 06, 30); // 
  ZonedDateTime.parse("2015-05-03T10:15:30+01:00[Europe/Paris]");
  ```

### 1.3.2. <ins>OffsetDateTime</ins>
Another way to work with time zone is by using _OffsetDateTime_. The _OffsetDateTime_ is an immutable representation of a **date-time with an offset**. This class **stores all date and time fields, to a precision of nanoseconds**, as well as the **offset from UTC/Greenwich**.

The _OffSetDateTime_ instance can be created using _ZoneOffset_. Here, we create a LocalDateTime representing 6:30 a.m. on February 20, 2015. Then we add two hours to the time by creating a _ZoneOffset_ and setting for the localDateTime instance.
```java
LocalDateTime localDateTime = LocalDateTime.of(2015, Month.FEBRUARY, 20, 06, 30);
ZoneOffset offset = ZoneOffset.of("+02:00");
OffsetDateTime offSetByTwo = OffsetDateTime
  .of(localDateTime, offset); //result 2015-02-20 06:30 +02:00
```

## 1.4. <ins>_Period_ and _Duration_</ins>
The _Period_ class represents a **quantity of time in terms of years, months and days**, and the _Duration_ class represents a **quantity of time in terms of seconds and nanoseconds**.

### 1.4.1. <ins>Period</ins>
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

### 1.4.1. <ins>Duration</ins>
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

## 1.5. <ins>Compatibility With old Date and Calendar</ins>
Java 8 has added the toInstant() method, which helps to convert existing Date and Calendar instance to new Date and Time API:
```java
LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault());
LocalDateTime.ofInstant(calendar.toInstant(), ZoneId.systemDefault());
```
The LocalDateTime can be constructed from epoch seconds. The result of the below code would be a _LocalDateTime_ representing 2016-06-13T11:34:50:
```java
LocalDateTime.ofEpochSecond(1465817690, 0, ZoneOffset.UTC);
```

## 1.6. <ins>Date and Time Formatting</ins>
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

# **References:**
1. https://www.baeldung.com/java-8-date-time-intro
