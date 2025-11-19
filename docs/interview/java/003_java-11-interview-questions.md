---
tags:
  - interview
  - java
  - jdk-11
---



# Java 11 Interview Questions

### ***Q1: What are the methods added in String API in Java 11?***

* **isBlank** - returns true if the String is empty or contains only spaces
* **lines** - returns a stream of lines extracted from the string, separated by line terminators such as _\n, \r_
* **strip(), stripLeading(), stripTrailing()** - strip whitespaces from the string (all, leading or trailing)
* **repeat(int n)** - returns a new string which is the concatenation of this string repeated 'n' times

---
### ***Q2: What is the Z Garbage Collector introduced in Java 11?***

(Also known as ZGC) Scalable low latency garbage collector designed to meet the following goals:
* Pause times do not exceed 10ms
* Pause times do not increase with the heap or live-set size
* Handle heaps ranging from a few hundred megabytes to multiterabytes in size

---
### ***Q3: What is the Java Flight Recorder introduced in Java 11?***

Java Flight Recorder (JFR) is a Java profiling tool that monitors and diagnoses a running Java application. It is responsible for collecting data about the running environment, JVM and Java application and dumps the recorded data into a `.jfr` file, and we can use Java Mission Control (JMC) to analyze and visualize the `.jfr` file.

---
### ***Q4: How to launch Single-File Source-Code Programs in JDK 11?***

* Before Java 11
  ```java
  javac HelloWorld.java
  java HelloWorld
  ```
* Java 11
  ```java
  java HelloWorld.java
  ```

---
### ***Q5: How to get Java 11 run-time environment working since there is no more JRE 11 for download?***

* Download and use an OpenJDK Java 11 JDK from the OpenJDK site.
* Download and use an Oracle Java 11 JDK from the Oracle site and be sure that you fully understand the restrictions on "commercial use" that now apply to the Oracle Java 11+ releases.
* Roll own Windows JRE for Windows from the OpenJDK sources; see Create jre from OpenJDK Windows.
* Look into using the new jlink tool to create a custom image (basically a cut-down JRE) for your application. This seems to be the option that Oracle want 3rd-party application developers to use.
* Talk to Oracle sales about a Java support contract, and specifically ask about how to get a JRE build.
* Use a 3rd-party Java JRE distribution such as AdoptOpenJDK.

---
### ***Q6: How to install OpenJDK 11 on Windows?***

1) **Set a PATH:** Go to `Advanced` and then `Environment Variables` and give path of your JDK bin
2) **Set JAVA_HOME:** Create a variable named `JAVA_HOME` and give JDK path till JDK folder (above bin)

---
### ***Q7: What are the key features of Java 11?***

Java 11, released in September 2018, introduced several new features and enhancements. Some of the key features of Java 11 include:
* **Local-Variable Syntax for Lambda Parameters:** Java 11 allows the use of the var keyword in Lambda expressions, making the code more concise and readable.
```java
(var x, var y) -gt; x + y
```
* **HTTP Client API:** Java 11 comes with a new built-in HTTP client API in the `java.net.http package`. This API provides a more efficient and modern way to perform HTTP requests and handle responses.
```java
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("https://example.com"))
        .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
String responseBody = response.body();
```
* **Dynamic Class-File Constants:** Java 11 adds support for loading constant values dynamically from class files, enabling future-proofing of code that relies on external constants.
```java
class MyClass {
    static final String MESSAGE = "Hello, World!";
}
```
* **Enhanced Security with Transport Layer Security (TLS) 1.3:** Java 11 includes TLS 1.3, the latest version of the TLS protocol, which provides better security and improved performance for secure network communication.
* **Easier Migration to Java Modules:** Java 11 introduces additional support for migrating from the classpath to using Java modules (introduced in Java 9). It allows developers to use unnamed modules to ease the migration process.
* **Launch Single-File Source-Code Programs:** Java 11 enables developers to directly run a single-file Java source code program without first compiling it. This feature is particularly useful for small utility programs or one-off scripts.
```java
$ java MyClass.java
```
* **HTTP/2 Support in the Servlet API:** Java 11 enhances the Servlet API with native support for the HTTP/2 protocol, enabling faster and more efficient communication between servers and clients.
* **Flight Recorder:** Java 11 includes the Java Flight Recorder (JFR) feature as a commercial feature, allowing developers to collect detailed runtime information about their applications with low overhead.

These are some of the key features introduced in Java 11. However, it is important to note that the Java platform continuously evolves, and new features and enhancements may be introduced in future versions.

---
### ***Q8: What is the purpose of the var keyword introduced in Java 11?***

The `var` keyword, introduced in Java 11, is used to declare and initialize local variables with implicit type inference. The purpose of introducing the `var` keyword is to make the code more concise and readable by reducing unnecessary repetitions of the variable type. It helps to avoid code redundancy when the variable type is already clear from the right-hand side expression or initialization value. Using the `var` keyword, the Java compiler infers the appropriate type based on the context and the assigned value. The type inference is done at compile-time and does not introduce dynamic typing. Here's an example to illustrate the usage of the var keyword:
```java
var age = 25; // implicitly inferred as int
var name = "John Doe"; // implicitly inferred as String
var list = new ArrayList<>(); // implicitly inferred as ArrayList<Object>
```
In the above code snippet, the appropriate types of variables age, name, and list are inferred automatically, making the code more concise. The inferred types are int, String, and `ArrayList<Object>` respectively. It's important to note that the var keyword should be used only for local variables with an initializer. It cannot be used for method parameters, return types, or class fields. The `var` keyword does not affect the runtime behavior or performance of the code. The compiled bytecode still includes the actual type information for the variables. However, it's recommended to use the `var` keyword judiciously, ensuring that the variable names and the assigned values provide enough context to understand the inferred type without explicitly mentioning it. By using the `var` keyword effectively, developers can write more concise and readable code while maintaining the type safety provided by the Java language.

---
### ***Q9: How does the new HTTP Client API in Java 11 differ from the traditional HttpURLConnection?***

Java 11 introduced a new built-in HTTP Client API in the `java.net.http package`, providing a more efficient and modern way to perform HTTP requests and handle responses compared to the traditional HttpURLConnection.

The new HTTP Client API offers several advantages:
* **Asynchronous and Reactive:** The new API is natively asynchronous and supports reactive programming. It provides CompletableFuture-based methods for sending requests and receiving responses asynchronously. This allows developers to make non-blocking HTTP calls, improving the efficiency and responsiveness of applications.
* **Fluent API:** The HTTP Client API provides a fluent and easy-to-use API for constructing HTTP requests. It allows developers to chain multiple method calls together to build the request, making the code more concise and readable.

Here's an example of constructing an HTTP GET request using the new HTTP Client API:
```java
HttpRequest request = HttpRequest.newBuilder()
        .GET()
        .uri(URI.create("https://example.com/api/users"))
        .header("Authorization", "Bearer token")
        .build();
```
In comparison, the traditional HttpURLConnection API requires multiple method calls and explicit handling of input and output streams, making the code more verbose and error-prone.
* **Response Handling:** The new HTTP Client API provides a streamlined way to handle responses. It returns an HttpResponse object encapsulating the response status, headers, and body. The body can be processed using `HttpResponse.BodyHandlers`, which provide built-in support for handling different response types, like String, InputStream, or JSON.

Here's an example of handling an HTTP response using the new API:
```java
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
String responseBody = response.body();
```
The traditional HttpURLConnection API, on the other hand, requires manual parsing and handling of the response stream, making the code more error-prone and harder to maintain.
* **Transparent Compression and Decompression:** The new HTTP Client API can automatically handle content compression and decompression using gzip or deflate algorithms based on the Accept-Encoding header. This helps in reducing network bandwidth and improving performance.

Overall, the new HTTP Client API in Java 11 provides a more modern and efficient way to perform HTTP requests and handle responses compared to the traditional HttpURLConnection API. It simplifies the code, improves readability, and enhances the performance of HTTP communication within Java applications.

---
### ***Q10: How does Java 11 support easier migration to Java modules?***

Java 11 introduces additional support for migrating from the classpath to using Java modules (introduced in Java 9). It aims to ease the migration process, especially for existing applications that were developed before the introduction of the module system.

One of the challenges faced during the migration is dealing with external dependencies that are not yet modularized. Prior to Java 11, all dependencies needed to be resolved and modularized before an application could fully utilize the module system. Java 11 introduces the concept of **"unnamed modules"** to overcome this challenge.

An **unnamed module** is a module that operates in the classpath, not requiring explicit modularization. It allows existing non-modular JAR files to be used in a modular application. When an unnamed module reads other modules, it can access the types exported by the modules, but it cannot read any non-exported types or use reflection to access internal elements of the modules.

The introduction of unnamed modules in Java 11 enables developers to gradually migrate their applications to the module system by retaining legacy dependencies in the classpath while developing new modules using the Java module system. This incremental migration approach helps to minimize disruption and allows developers to leverage the benefits of the module system gradually.

Here's an example to illustrate the usage of unnamed modules: Consider an existing application "myapp" with the following classpath dependencies: `"library1.jar"` and `"library2.jar"`. These libraries are not yet modularized. To start migrating to the module system, a new module descriptor file `"module-info.java"` can be created for the application:
```java
module myapp {
    requires library1;
    requires library2;
}
```
Since the libraries are not yet modularized, they don't have their own module-info.java files. However, they can still be used in the unnamed module as non-modular JARs. By using the unnamed modules, the migration process can continue, and new modules can be developed using the module system. As the external dependencies get modularized, they can be transitioned from the classpath to the module path. Java 11 also introduced the jdeps tool with additional options to analyze classpath dependencies and identify potential issues and conflicts when migrating to modules.

Migrating to the module system provides several benefits, such as improved encapsulation, strong encapsulation, and reliable configuration. The support for unnamed modules in Java 11 makes the migration process easier and provides flexibility while retaining compatibility with existing non-modular dependencies.

---
### ***Q11: What are the security enhancements provided by Java 11 with Transport Layer Security (TLS) 1.3?***

Java 11 includes support for the latest version of the **Transport Layer Security (TLS) protocol, TLS 1.3.** TLS is a cryptographic protocol used to ensure secure communication over a network, commonly used in applications such as HTTPS.

The introduction of TLS 1.3 in Java 11 brings several security enhancements:
* **Improved Security:** TLS 1.3 provides better security compared to its predecessor TLS 1.2. It removes outdated and insecure cryptographic algorithms and introduces new algorithms that offer stronger security.
* **Faster Handshake:** TLS 1.3 reduces the number of network round-trips required during the handshake phase, making the handshake faster and improving the overall performance of secure communication.
* **Forward Secrecy by Default:** In TLS 1.3, forward secrecy is enabled by default. Forward secrecy ensures that even if the private key of a server is compromised in the future, past communications cannot be decrypted. This enhances the confidentiality and integrity of data exchanged over a secure connection.
* **0-RTT (Zero Round-Trip Time) Mode:** TLS 1.3 introduces a zero round-trip time mode, allowing clients and servers that have previously established a connection to resume it without performing a full handshake. This reduces latency for subsequent connections and improves the performance of TLS sessions.
* **Extended Support for Digital Certificates:** TLS 1.3 supports new digital certificate formats, such as the Ed25519 and Ed448 elliptic curve signature algorithms. These algorithms provide improved security and performance compared to traditional RSA and DSA algorithms. 
* **Key Updates:** TLS 1.3 introduces a more secure approach for updating cryptographic keys during a session. This enhances the security of the session and mitigates some attacks. 

By upgrading to TLS 1.3, Java 11 provides a more secure and efficient protocol for secure communication. It is important for organizations to ensure their applications and systems are compatible with TLS 1.3 to take advantage of the enhanced security features and performance improvements. It's worth noting that before migrating to TLS 1.3, compatibility with older versions and client support should be taken into consideration. Also, additional security best practices like using strong cryptographic algorithms, secure key management, and proper certificate validation should be followed to ensure a secure communication channel.

---
### ***Q12: How can you create and run a single-file source-code program in Java 11?***

With the introduction of Java 11, developers can create and execute single-file source-code programs directly without the need for explicit compilation. To create and run a single-file source-code program, follow these steps: 
1. Create a new file with the desired program code and save it with a `.java` extension. For example, `MyProgram.java`. 
2. Open the file in a text editor or an integrated development environment (IDE). 
3. Write the code for the program directly in the `.java` file. Remember that it should be a self-contained program that can be executed independently. 
4. Save the file after writing the code. Once the file is ready, it can be executed without explicitly compiling it using the `java` command. Open the command prompt or terminal and navigate to the directory where the `.java` file is located. 
5. To execute the single-file source-code program, run the following command:

```java
java MyProgram.java
```

Replace `MyProgram.java` with the actual filename and its path, if necessary. When the command is executed, Java 11 will internally compile the source code, execute it, and display the output on the console. It's important to note that single-file source-code programs are primarily intended for small utility programs or simple scripts. 
They are not suitable for large-scale applications or projects that require modularization and separate compilation steps. Java 11's support for running single-file source-code programs provides a convenient way to quickly test ideas, write small tools, or execute one-off scripts without the need for a full project setup and explicit compilation.

---
### ***Q13: How does Java 11 enhance the Servlet API with native HTTP/2 support?***

Java 11 introduces native support for the HTTP/2 protocol in the Servlet API, providing better performance and efficiency for communication between servers and clients. The new native HTTP/2 support in Java 11's Servlet API includes the following enhancements: 
* **Protocol Upgrade:** The HTTP/2 support allows servers and clients to upgrade their connection from HTTP/1.1 to HTTP/2, enabling advanced features like multiplexing, server push, and header compression.
* **Multiplexing:** HTTP/2 allows multiple requests and responses to be multiplexed over a single TCP connection, reducing the latency and improving the performance of client-server communication. This is achieved by sending and receiving individual frames instead of complete requests or responses.
* **Server Push:** HTTP/2 introduces the concept of server push, where the server can proactively send additional resources to the client without waiting for explicit requests. This helps in optimizing the loading of web pages and improves the overall user experience.
* **Header Compression:** HTTP/2 uses a more efficient header compression algorithm, known as HPACK, to reduce the size of header fields sent over the network. This reduces bandwidth consumption and improves performance. 

To enable native HTTP/2 support in a Java 11 Servlet application, the following steps need to be taken: 
1. Configure the web server to support the HTTP/2 protocol. This may involve updating the server configuration file or using a server-specific API. 
2. Update the Servlet API version to at least 4.0 in the project's build configuration or dependency management. 
3. Modify the application's `web.xml` or `webapp/web.xml` file to declare the `http2` flag as true in the `<web-app>` element:
```xml
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                             http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0"
         metadata-complete="true">

    <http2>true</http2>
    ...
</web-app>
```
Once the required configuration changes are made, the Servlet API in Java 11 will be capable of natively handling the HTTP/2 protocol. By leveraging Java 11's native HTTP/2 support in the Servlet API, developers can benefit from improved performance, reduced latency, and enhanced user experiences in their Java web applications.

---
### ***Q14: How does Java 11's Flight Recorder feature work and what benefits does it provide?***

Java 11 introduced the Java Flight Recorder (JFR) feature as part of the JDK, providing a built-in tool for collecting detailed runtime information about Java applications with low overhead. Java Flight Recorder works by collecting various runtime data points, such as method profiling, memory allocation, thread activity, garbage collection details, and much more. This information is recorded in a highly efficient binary format and can later be analyzed to understand and optimize the application's behavior and performance. 

To use Java Flight Recorder, the following steps need to be performed: 
1. Enable Flight Recorder: Start the Java application with the `-XX:+FlightRecorder` JVM argument to enable the Flight Recorder feature. This activates the recording of runtime data during the application's execution. 
2. Specify Recording Options: Optionally, additional flags can be used to configure the Flight Recorder behavior, such as the duration of the recording, the frequency of the collected data, and the maximum amount of recorded data. 
3. Store Recorded Data: By default, Flight Recorder stores the recorded data in a `.jfr` file in the current working directory. However, the output file location can be customized with the `-XX:FlightRecorderOptions` JVM argument. 
4. Analyze Recorded Data: The recorded data can be analyzed using the Java Flight Recorder tool, called `jfr` in the JDK `bin` directory.

The tool provides various commands to open, inspect, and extract information from the recorded data. The benefits of using Java Flight Recorder include: 
* **Low Overhead:** Flight Recorder is designed to collect runtime data with minimal performance impact on the application. The recorded data is compressed and collected in a non-blocking manner, ensuring minimal disruption to the application's execution.
* **Profiling and Troubleshooting:** Flight Recorder provides detailed information about the application's behavior, performance, and resource utilization. This helps in identifying bottlenecks, memory leaks, threading issues, and other performance problems, making it easier to troubleshoot and optimize the application.
* **Real-time Monitoring:** Flight Recorder supports continuous recording, allowing real-time monitoring of the application's behavior. It provides a rich set of metrics and events that can be analyzed to monitor the application's health and performance characteristics. 
* **Production-Ready:** Flight Recorder is designed to be used in production environments without significantly impacting the application's performance. It is well-integrated with commonly used monitoring tools and debugging frameworks, making it suitable for use in various deployment scenarios.
* **Standardized Format:** The recorded data is stored in a standardized binary format, making it portable across different platforms and JDK versions. This allows recorded data to be analyzed and shared across different environments without compatibility issues. Java Flight Recorder is a valuable tool for gathering insights into the runtime behavior of Java applications. It facilitates performance tuning, troubleshooting, and monitoring of applications in production environments, aiding in the overall improvement of the application's stability and efficiency.
