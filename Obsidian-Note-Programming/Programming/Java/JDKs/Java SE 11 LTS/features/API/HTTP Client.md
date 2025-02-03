# 1. <ins>HTTP Client</ins>

In Java 11 introduced HTTP client API that implements HTTP/2 and Web Socket.

It aims to replace the legacy *HttpUrlConnection* class that has been present in the JDK since the very early years of Java.

Until very recently, Java provided only the _HttpURLConnection_ API, which is low-level and isn’t known for being feature-rich and user-friendly.

Therefore, some widely used third-party libraries were commonly used, such as [Apache HttpClient](https://hc.apache.org/httpcomponents-client-ga/), [Jetty](https://eclipse.dev/jetty/documentation/jetty-9/index.html#http-client-api) and Spring’s [RestTemplate](https://www.baeldung.com/rest-template).

## 1.1. <ins>Changes introduced in [JEP 321](https://openjdk.org/jeps/321)</ins>

1. The incubated HTTP API from Java 9 is now officially incorporated into the Java SE API. The new [HTTP APIs](https://docs.oracle.com/en/java/javase/21/docs/api/java.net.http/java/net/http/package-summary.html) can be found in package: **java.net.http.\***.
2. The newer version of the HTTP protocol is designed to improve the overall performance of sending requests by a client and receiving responses from the server. This is achieved by introducing a number of changes such as stream multiplexing, header compression and push promises.
3. As of Java 11, **the API is now fully asynchronous (the previous HTTP/1.1 implementation was blocking).** Asynchronous calls are implemented using _CompletableFuture_.The _CompletableFuture_ implementation takes care of applying each stage once the previous one has finished, so this whole flow is asynchronous.
4. The new HTTP client API provides a standard way to perform HTTP network operations with support for modern Web features such as HTTP/2, without the need to add third-party dependencies.
5. The new APIs provide native support for HTTP 1.1/2 WebSocket. The core classes and interface providing the core functionality include:

	- The _HttpClient_ class, _java.net.http.HttpClient_
	- The _HttpRequest_ class, _java.net.http.HttpRequest_
	- The _HttpResponse_<T> interface, _java.net.http.HttpResponse_
	- The _WebSocket_ interface, _java.net.http.WebSocket_

## 1.2. <ins>Problems With the Pre-Java 11 HTTP Client</ins>

The existing _HttpURLConnection_ API and its implementation had numerous problems:

- URLConnection API was designed with multiple protocols that are now no longer functioning (FTP, gopher, etc.).
- The API predates HTTP/1.1 and is too abstract.
- It works in blocking mode only (i.e., one thread per request/response).
- It is very hard to maintain.

# 2. <ins>Elements of the HTTP API</ins>

## 2.1. <ins>HTTP Request</ins>

_HttpRequest_ is an object that represents the request we want to send. New instances can be created using _HttpRequest.Builder._

We can get it by calling _HttpRequest.newBuilder()_. _Builder_ class provides a bunch of methods that we can use to configure our request.

**Note:** In JDK 16, there is a new _HttpRequest.newBuilder(HttpRequest request, BiPredicate<String,​String> filter)_ method, which creates a _Builder_ whose initial state is copied from an existing _HttpRequest_.

This builder can be used to build an _HttpRequest_, equivalent to the original, while allowing amendment of the request state prior to construction, for example, removing headers:
```java
HttpRequest.newBuilder(request, (name, value) -> !name.equalsIgnoreCase("Foo-Bar"))
```
There are the necessary actions needed to use HttpClient. They are listed below.

### 2.1.1. <ins>Setting URI</ins>
The first thing we have to do when creating a request is to provide the URL.

We can do that in two ways — using the constructor for _Builder_ with _URI_ ([[URI, URL and URN]]) parameter or calling method _uri(URI)_ on the _Builder_ instance:
```java
//constructor
HttpRequest.newBuilder(new URI("https://postman-echo.com/get"))
 
//method uri(URL)
HttpRequest.newBuilder()
  .uri(new URI("https://postman-echo.com/get"))
```

### 2.1.2. <ins>HTTP Method</ins>

The last thing we have to configure to create a basic request is an HTTP method.

We can define the HTTP method that our request will use by calling one of the methods from Builder:
* GET()
* POST(BodyPublisher body)
* PUT(BodyPublisher body)
* DELETE()

*BodyPublisher* is covered in details later.

Simple GET request example:
```java 
HttpRequest request = HttpRequest.newBuilder()
  .uri(new URI("https://postman-echo.com/get"))
  .GET()
  .build();
```

This request has all parameters required by HttpClient.

However, we sometimes need to add additional parameters to our request. Here are some important ones:
* The version of the HTTP protocol
* Headers
* A timeout

### 2.1.3. <ins>HTTP Protocol Version</ins>

The API fully leverages the HTTP/2 protocol and uses it by default, but we can define which version of the protocol we want to use:

```java
HttpRequest request = HttpRequest.newBuilder()
  .uri(new URI("https://postman-echo.com/get"))
  .version(HttpClient.Version.HTTP_2)
  .GET()
  .build();
```

Important to mention here is that the client will fall back to, e.g., HTTP/1.1 if HTTP/2 isn’t supported.

### 2.1.4. <ins>Headers</ins>

In case we want to add additional headers to our request, we can use the provided builder methods.

We can do that by either passing all headers as key-value pairs to the *headers()* method or by using *header()* method for the single key-value header:

```java
//headers() method example
HttpRequest request = HttpRequest.newBuilder()
  .uri(new URI("https://postman-echo.com/get"))
  .headers("key1", "value1", "key2", "value2")
  .GET()
  .build();

//few invokes of header() method example
HttpRequest request2 = HttpRequest.newBuilder()
  .uri(new URI("https://postman-echo.com/get"))
  .header("key1", "value1")
  .header("key2", "value2")
  .GET()
  .build();

```

### 2.1.5. <ins>Timeout</ins>

The last useful method we can use to customize our request is a timeout(). It's the amount of time we want to wait for a response.

If the set time expires, a *HttpTimeoutException* will be thrown. **The default timeout is set to infinity.**

The timeout can be set with the *Duration* object by calling method *timeout()* on the builder instance:

```java
HttpRequest request = HttpRequest.newBuilder()
  .uri(new URI("https://postman-echo.com/get"))
  .timeout(Duration.of(10, SECONDS))
  .GET()
  .build();
```

### 2.1.6. <ins>Request Body</ins>

We can add a body to a request by using the request builder methods:
* POST(BodyPublisher body)
* PUT(BodyPublisher body)
* DELETE()

The new API provides a number of *BodyPublisher* implementations out-of-the-box that simplify passing the request body:
* **StringProcessor** – reads body from a *String*, created with *HttpRequest.BodyPublishers.ofString*
* **InputStreamProcessor** – reads body from an InputStream, created with *HttpRequest.BodyPublishers.ofInputStream*
* **ByteArrayProcessor** – reads body from a byte array, created with *HttpRequest.BodyPublishers.ofByteArray*
* **FileProcessor** – reads body from a file at the given path, created with *HttpRequest.BodyPublishers.ofFile*

In case we don’t need a body, we can simply pass in an *HttpRequest.BodyPublishers.noBody()*:

```java
HttpRequest request = HttpRequest.newBuilder()
  .uri(new URI("https://postman-echo.com/post"))
  .POST(HttpRequest.BodyPublishers.noBody())
  .build();
```
**Note:** In JDK 16, there’s a new *HttpRequest.BodyPublishers.concat(BodyPublisher…)* method that helps us building a request body from the concatenation of the request bodies published by a sequence of publishers. The request body published by a concatenation publisher is logically equivalent to the request body that would have been published by concatenating all the bytes of each publisher in sequence.

#### 2.1.6.1. <ins>StringBodyPublisher</ins>

Setting a request body with any *BodyPublishers* implementation is very simple and intuitive. For example, if we want to pass a simple String as a body, we can use StringBodyPublishers.

As we already mentioned, this object can be created with a factory method *ofString()* — it takes just a *String* object as an argument and creates a body from it:

```java
HttpRequest request = HttpRequest.newBuilder()
  .uri(new URI("https://postman-echo.com/post"))
  .headers("Content-Type", "text/plain;charset=UTF-8")
  .POST(HttpRequest.BodyPublishers.ofString("Sample request body"))
  .build();
```

#### 2.1.6.2. <ins>InputStreamBodyPublisher</ins>

The *InputStream* has to be passed as a *Supplier* (to make its creation lazy), so it’s a little bit different than StringBodyPublishers.

However, this is also quite straightforward:

```java
byte[] sampleData = "Sample request body".getBytes();
HttpRequest request = HttpRequest.newBuilder()
  .uri(new URI("https://postman-echo.com/post"))
  .headers("Content-Type", "text/plain;charset=UTF-8")
  .POST(HttpRequest.BodyPublishers
   .ofInputStream(() -> new ByteArrayInputStream(sampleData)))
  .build();
```
Notice usage of simple ByteArrayInputStream here. It could be any InputStream implementation.

#### 2.1.6.3. <ins>ByteArrayProcessor</ins>

We can also use ByteArrayProcessor and pass an array of bytes as the parameter:

```java
byte[] sampleData = "Sample request body".getBytes();
HttpRequest request = HttpRequest.newBuilder()
  .uri(new URI("https://postman-echo.com/post"))
  .headers("Content-Type", "text/plain;charset=UTF-8")
  .POST(HttpRequest.BodyPublishers.ofByteArray(sampleData))
  .build();
```

#### 2.1.6.4. <ins>FileProcessor</ins>

To work with a File, we can make use of the provided *FileProcessor*. Its factory method takes a *path* to the file as a parameter and creates a *body* from the content:

```java
HttpRequest request = HttpRequest.newBuilder()
  .uri(new URI("https://postman-echo.com/post"))
  .headers("Content-Type", "text/plain;charset=UTF-8")
  .POST(HttpRequest.BodyPublishers.fromFile(
    Paths.get("src/test/resources/sample.txt")))
  .build();
```

## 2.2. <ins>HttpClient</ins>

All requests are sent using *HttpClient*, which can be instantiated using the *HttpClient.newBuilder()* method or by calling *HttpClient.newHttpClient()*.

It provides a lot of useful and self-describing methods we can use to handle our request/response.

### 2.2.1. <ins>Handling Response Body</ins>

Similar to the fluent methods for creating publishers, there are methods dedicated to creating handlers for common body types:
* *BodyHandlers.ofByteArray*
* *BodyHandlers.ofString*
* *BodyHandlers.ofFile*
* *BodyHandlers.discarding*
* *BodyHandlers.replacing*
* *BodyHandlers.ofLines*
* *BodyHandlers.fromLineSubscriber*

Pay attention to the usage of the new *BodyHandlers* factory class.

Before Java 11, we had to do something like this:

```java
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandler.asString());
```

From Java 11 we can now simplify it:

```java
HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
```

### 2.2.2. <ins>Setting Proxy</ins>

We can define a proxy for the connection by just calling proxy() method on a Builder instance:

```java
HttpResponse<String> response = HttpClient
  .newBuilder()
  .proxy(ProxySelector.getDefault())
  .build()
  .send(request, BodyHandlers.ofString());
```

In our example, we used the default system proxy.

### 2.2.3. <ins>Redirect Policy</ins>

Sometimes the page we want to access has moved to a different address. In that case, we’ll receive HTTP status code 3xx, usually with the information about new URI. HttpClient can redirect the request to the new URI automatically if we set the appropriate redirect policy.

```java
HttpResponse<String> response = HttpClient.newBuilder()
  .followRedirects(HttpClient.Redirect.ALWAYS)
  .build()
  .send(request, BodyHandlers.ofString());
```

All policies are defined and described in enum *[HttpClient.Redirect](https://docs.oracle.com/en%2Fjava%2Fjavase%2F11%2Fdocs%2Fapi%2F%2F/java.net.http/java/net/http/HttpClient.Redirect.html)*

### 2.2.4. <ins>Authenticator for a Connection</ins>

An *Authenticator* is an object that negotiates credentials (HTTP authentication) for a connection.

It provides different authentication schemes (such as basic or digest authentication).

In most cases, authentication requires username and password to connect to a server.

We can use *PasswordAuthentication* class, which is just a holder of these values:

```java
HttpResponse<String> response = HttpClient.newBuilder()
  .authenticator(new Authenticator() {
    @Override
    protected PasswordAuthentication getPasswordAuthentication() {
      return new PasswordAuthentication(
        "username", 
        "password".toCharArray());
    }
}).build()
  .send(request, BodyHandlers.ofString());
```

Here we passed the *username* and *password* values as a plaintext. **Of course, this would have to be different in a production scenario**.

Note that not every request should use the same username and password. The *Authenticator* class provides a number of getXXX (e.g., getRequestingSite()) methods that can be used to find out what values should be provided.

### 2.2.5. <ins>Send Requests – Sync vs Async</ins>

*HttpClient* provides two possibilities for sending a request to a server:
* send(…) – synchronously (blocks until the response comes)
* sendAsync(…) – asynchronously (doesn’t wait for the response, non-blocking)
Up until now, the send(...) method naturally waits for a response:

```java
HttpResponse<String> response = HttpClient.newBuilder()
  .build()
  .send(request, BodyHandlers.ofString());
```

This call returns an *HttpResponse* object, and we’re sure that the next instruction from our application flow will be run only when the response is already here.

However, it has a lot of drawbacks especially when we are processing large amounts of data.

So, now we can use *sendAsync(...)* method — which returns *CompletableFeature<HttpResponse>* — **to process a request asynchronously**:

```java
CompletableFuture<HttpResponse<String>> response = HttpClient.newBuilder()
  .build()
  .sendAsync(request, HttpResponse.BodyHandlers.ofString());
```

The new API can also deal with multiple responses, and stream the request and response bodies:

```java
List<URI> targets = Arrays.asList(
  new URI("https://postman-echo.com/get?foo1=bar1"),
  new URI("https://postman-echo.com/get?foo2=bar2"));
HttpClient client = HttpClient.newHttpClient();
List<CompletableFuture<String>> futures = targets.stream()
  .map(target -> client
    .sendAsync(
      HttpRequest.newBuilder(target).GET().build(),
      HttpResponse.BodyHandlers.ofString())
    .thenApply(response -> response.body()))
  .collect(Collectors.toList());
```

### 2.2.6. <ins>Executor for Asynchronous Calls</ins>

We can also define an *Executor* that provides threads to be used by asynchronous calls.

This way we can, for example, limit the number of threads used for processing requests:

```java
ExecutorService executorService = Executors.newFixedThreadPool(2);

CompletableFuture<HttpResponse<String>> response1 = HttpClient.newBuilder()
  .executor(executorService)
  .build()
  .sendAsync(request, HttpResponse.BodyHandlers.ofString());

CompletableFuture<HttpResponse<String>> response2 = HttpClient.newBuilder()
  .executor(executorService)
  .build()
  .sendAsync(request, HttpResponse.BodyHandlers.ofString());
```

By default, the *HttpClient* uses executor *java.util.concurrent.Executors.newCachedThreadPool()*.

### 2.2.6. <ins>CookieHandler</ins>

With new API and builder, it’s straightforward to set a *CookieHandler* ([[Cookie]]) for our connection. We can use builder method *cookieHandler(CookieHandler cookieHandler)* to define client-specific *CookieHandler*.

Define CookieManager (a concrete implementation of *CookieHandler* that separates the storage of cookies from the policy surrounding accepting and rejecting cookies) that doesn’t allow to accept cookies at all:

```java
HttpClient.newBuilder()
  .cookieHandler(new CookieManager(null, CookiePolicy.ACCEPT_NONE))
  .build();
```

In case our *CookieManager* allows cookies to be stored, we can access them by checking *CookieHandler* from our *HttpClient*:

```java
((CookieManager) httpClient.cookieHandler().get()).getCookieStore()
```

## 2.3. <ins>HTTP Response</ins>

The *HttpResponse* class represents the response from the server. It provides a number of useful methods, but these are the two most important:
* *statusCode()* returns status code (type int) for a response (*HttpURLConnection* class contains possible values).
* *body()* returns a body for a response (return type depends on the response *BodyHandler* parameter passed to the *send()* method).

The response object has other useful methods such as:
* uri()
* headers()
* trailers()
* version()

## 2.3.1. <ins>URI of Response Object</ins>

The method *uri()* on the response object returns the *URI* [[URI, URL and URN]] from which we received the response.

Sometimes it can be different than *URI* in the request object because a redirection may occur:

```java
assertThat(request.uri()
  .toString(), equalTo("http://stackoverflow.com"));
assertThat(response.uri()
  .toString(), equalTo("https://stackoverflow.com/"));
```

## 2.3.2. <ins>Headers from Response</ins>

We can obtain headers from the response by calling method *headers()* on a response object:

```java
HttpResponse<String> response = HttpClient.newHttpClient()
  .send(request, HttpResponse.BodyHandlers.ofString());
HttpHeaders responseHeaders = response.headers();
```

It returns *HttpHeaders* object, which represents a read-only view of HTTP Headers.

It has some useful methods that simplify searching for headers value.

## 2.3.3. <ins>Version of the Response</ins>

The method *version()* defines which version of HTTP protocol was used to talk with a server.

**Remember that even if we define that we want to use HTTP/2, the server can answer via HTTP/1.1.**

The version in which the server answered is specified in the response:

```java
HttpRequest request = HttpRequest.newBuilder()
  .uri(new URI("https://postman-echo.com/get"))
  .version(HttpClient.Version.HTTP_2)
  .GET()
  .build();
HttpResponse<String> response = HttpClient.newHttpClient()
  .send(request, HttpResponse.BodyHandlers.ofString());
assertThat(response.version(), equalTo(HttpClient.Version.HTTP_1_1));
```

# 3. <ins>Handling Push Promises in HTTP/2</ins>

New *HttpClient* supports push promises through *PushPromiseHandler* interface [[Interface]].

It allows the server to “push” content to the client additional resources while requesting the primary resource, saving more roundtrip and as a result improves performance in page rendering.

**It is really the multiplexing feature of HTTP/2 that allows us to forget about resource bundling. For each resource, the server sends a special request, known as a push promise to the client.**

Push promises received, if any, are handled by the given *PushPromiseHandler*. A null valued *PushPromiseHandler* rejects any push promises.

The *HttpClient* has an overloaded *sendAsync* method that allows us to handle such promises, as shown below.

Example of PushPromiseHandler:

```java
private static PushPromiseHandler<String> pushPromiseHandler() {
    return (HttpRequest initiatingRequest, 
        HttpRequest pushPromiseRequest, 
        Function<HttpResponse.BodyHandler<String>, 
        CompletableFuture<HttpResponse<String>>> acceptor) -> {
        acceptor.apply(BodyHandlers.ofString())
            .thenAccept(resp -> {
                System.out.println(" Pushed response: " + resp.uri() + ", headers: " + resp.headers());
            });
        System.out.println("Promise request: " + pushPromiseRequest.uri());
        System.out.println("Promise request: " + pushPromiseRequest.headers());
    };
}
```

Next, let’s use sendAsync method to handle this push promise:

```java
httpClient.sendAsync(pageRequest, BodyHandlers.ofString(), pushPromiseHandler())
    .thenAccept(pageResponse -> {
        System.out.println("Page response status code: " + pageResponse.statusCode());
        System.out.println("Page response headers: " + pageResponse.headers());
        String responseBody = pageResponse.body();
        System.out.println(responseBody);
    })
    .join();
```

# **References:**
1. https://www.baeldung.com/java-9-http-client
