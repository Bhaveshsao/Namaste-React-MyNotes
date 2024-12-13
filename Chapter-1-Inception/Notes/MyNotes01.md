# Chapter 1: Inception

## Understanding React Basics with Code Examples

### Code 1: Basic HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Namaste React</title>
  </head>
  <body>
    <!-- Using HTML -->
    <div>Hello World!</div>
  </body>
</html>
```

This is a simple HTML file displaying `Hello World!` inside a `<div>` element.

### Code 2: Adding JavaScript for Dynamic Content

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Namaste React</title>
  </head>
  <body>
    <div id="root"></div>

    <script>
        const heading = document.createElement('h1');
        heading.innerHTML = "Hello World from JavaScript!";
        const root = document.getElementById('root');
        root.appendChild(heading);
    </script>
  </body>
</html>
```

Here, JavaScript is used to dynamically create an `<h1>` element with the text `Hello World from JavaScript!` and append it to the DOM.

### Code 3: Introducing React

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Namaste React</title>
  </head>
  <body>
    <div id="root"></div>

    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
    ></script>
    <script>
        const heading = React.createElement('h1', {}, "Hello World from React!");
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(heading);
    </script>
  </body>
</html>
```

React simplifies DOM manipulation by providing the `React.createElement` method to create elements programmatically.


#### What Are the CDN Links?

1. **CDN (Content Delivery Network):**
   A CDN delivers resources (like React libraries) from distributed servers to ensure faster load times.

2. **React CDN (`react.development.js`):**
   Loads the core React library responsible for creating elements and components.

3. **ReactDOM CDN (`react-dom.development.js`):**
   Renders React elements into the DOM, bridging React with the browser's DOM.

4. **Why Use CDN Links?**
   - **Quick Start:** Use React without local setup.
   - **Convenience:** No need to install packages.
   - **Always Updated:** Provides the latest stable versions.

5. **Crossorigin Attribute:**
   Ensures secure loading of resources from external domains.


### Why Two Separate React Files?

- **`react`**: Core React library for creating React elements and components.
- **`react-dom`**: Responsible for rendering React components into the DOM. Acts as a bridge between React and the browser.

### Moving to `App.js`

Instead of writing React code directly in the `<script>` tag, it's better practice to move it to a separate file, like `App.js`.

**Why `App.js`?**

- Separation of concerns: Keeps the HTML clean and focuses on rendering elements from a dedicated JavaScript file.
- Scalability: Better organization as the application grows.

#### Updated `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Namaste React</title>
  </head>
  <body>
    <div id="root"></div>

    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
    ></script>
    <script src="./App.js"></script>
  </body>
</html>
```

#### `App.js`

```javascript
const heading = React.createElement(
  "h1",
  {
    id: "heading",
    class: "header",
  },
  "Hello World from React!"
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(heading);

console.log(heading);
```

### Key Questions Answered

1. **What is `heading` in `App.js`?**

   - `heading` is a React element, which is a JavaScript object representing the structure of the DOM element.

2. **What does `ReactDOM.createRoot` do?**

   - It initializes the root for rendering React elements.

3. **What is `root.render(heading)`?**

   - It takes the React element (`heading`) and converts it into a real DOM element, which is then added to the browser's DOM.

4. **What are props?**

   - Props (short for properties) are custom inputs passed to React elements/components. They allow elements to be dynamic.

### Understanding `React.createElement`

The `React.createElement` function accepts three arguments:

1. **Type (String or Component)**: Specifies the HTML tag or React component (e.g., `"h1"`, `"div"`).
2. **Props (Object)**: An object containing attributes for the element. Example:
   ```javascript
   { id: "heading", class: "header" }
   ```
   Props are optional and can be empty (`{}`).
3. **Children (String, Array, or Another Element)**: The content or child elements inside the created element.

Example:
```javascript
const heading = React.createElement(
  "h1",
  { id: "heading", class: "header" },
  "Hello World from React!"
);
```
- **Type**: `"h1"`
- **Props**: `{ id: "heading", class: "header" }`
- **Children**: `"Hello World from React!"`

### Nested Elements in React

#### Creating Nested Elements

To create:

```html
<div id="parent">
  <div id="child">
    <h1>I am from h1 tag</h1>
  </div>
</div>
```

Use React:

```javascript
const parent = React.createElement(
  "div",
  { id: "parent" },
  React.createElement(
    "div",
    { id: "child" },
    React.createElement("h1", {}, "I am from h1")
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);
```

#### Adding Sibling Elements

To add sibling elements like this:

```html
<div id="parent">
  <div id="child">
    <h1>I am from h1 tag</h1>
    <h2>I am from h2 tag</h2>
  </div>
</div>
```

Use an array to pass multiple elements:

```javascript
const parent = React.createElement(
  "div",
  { id: "parent" },
  React.createElement("div", { id: "child" }, [
    React.createElement("h1", {}, "I am from h1"),
    React.createElement("h2", {}, "I am from h2"),
  ])
);
```

### Increasing Complexity with Deep Nesting

Consider this structure:

```html
<div id="parent">
  <div id="child1">
    <h1>I am from h1 inside child 1</h1>
    <h2>I am from h2 inside child 1</h2>
  </div>
  <div id="child2">
    <h1>I am from h1 inside child 2</h1>
    <h2>I am from h2 inside child 2</h2>
  </div>
</div>
```

Using React:

```javascript
const parent = React.createElement("div", { id: "parent" }, [
  React.createElement("div", { id: "child1" }, [
    React.createElement("h1", {}, "I am from h1 inside child 1"),
    React.createElement("h2", {}, "I am from h2 inside child 1"),
  ]),
  React.createElement("div", { id: "child2" }, [
    React.createElement("h1", {}, "I am from h1 inside child 2"),
    React.createElement("h2", {}, "I am from h2 inside child 2"),
  ]),
]);
```

As complexity grows, the code becomes less readable, which is why JSX is preferred. However, understanding `React.createElement` is crucial as it forms the core of React.

### Additional Questions

1. **Does the order of scripts matter?**

   - Yes, `react` must be loaded before `react-dom`, as the latter depends on the former.

2. **What happens if the `root` element already contains content?**

   - If the `root` element already contains content (e.g., placeholder text), React will replace it with the new render. However, the existing content will remain visible for a short moment until the React script loads and completes rendering. This is because React takes control of the DOM only after the JavaScript execution begins, creating a brief interval where the original content might still be displayed.

3. **What happens if there is placeholder text outside the `root` element in the HTML file? Will React replace that as well?**

   - No, React only controls and replaces the content inside the `root` element or any other element explicitly targeted using `ReactDOM.createRoot`. Placeholder text or content outside the `root` element remains untouched by React, as React does not have access to or manage the rest of the DOM unless explicitly specified.


4. **Why is React a library, not a framework?**

   - React is a **library** because it focuses solely on building and managing the user interface (UI) without enforcing a specific structure or including additional tools like routing or state management. Developers have the freedom to decide how to structure their applications and can integrate React with other libraries as needed.
   
   - A **framework**, on the other hand, provides a more opinionated approach, dictating the structure and flow of the application. React gives developers full control over how and when to use its features, making it a library rather than a framework.

   - The key difference lies in **Inversion of Control**:
     - In a library, the developer calls the functions as needed.
     - In a framework, the framework controls the flow and calls the developer's code.

5. **What is Cross-Origin?**

   - The `crossorigin` attribute in a script tag enables **Cross-Origin Resource Sharing (CORS)**, which allows scripts to access resources from a different origin than the hosting web page. This is particularly useful when loading external JavaScript files from CDNs or third-party servers.

   - For example:
     ```html
     <script
       crossorigin
       src="https://unpkg.com/react@18/umd/react.development.js"
     ></script>
     ```
     - The `crossorigin` attribute ensures secure loading of the script and allows it to make HTTP requests or retrieve data from the server hosting the external file.


### Summary of Concepts

1. **HTML Basics**:
   - A basic HTML structure is used to display static content like `Hello World!` in a `<div>`.

2. **Dynamic Content with JavaScript**:
   - JavaScript can dynamically create and append elements to the DOM using `document.createElement` and `appendChild`.

3. **Introduction to React**:
   - React simplifies DOM manipulation using `React.createElement` to programmatically create and manage elements.
   - CDN links for React and ReactDOM enable quick setup without local installations.

4. **React CDN and Cross-Origin**:
   - **React CDN** provides the core library for creating elements and components.
   - **ReactDOM CDN** handles rendering React elements into the browser's DOM.
   - The `crossorigin` attribute allows secure loading of resources from external origins.

5. **Separation of Concerns with `App.js`**:
   - Moving React code to a separate file like `App.js` helps organize code, improves scalability, and separates HTML structure from functionality.

6. **React Key Features**:
   - **`ReactDOM.createRoot`**: Initializes the rendering root for React elements.
   - **`root.render`**: Converts React elements into real DOM elements.

7. **Understanding `React.createElement`**:
   - It creates React elements by specifying a type (e.g., `"h1"`), properties (props), and children (content).
   - Nested elements and sibling elements can also be created programmatically.

8. **Complex Nested Structures**:
   - React enables the creation of deeply nested and complex DOM structures using arrays to manage multiple children.

9. **Library vs. Framework**:
   - React is a **library** because it focuses only on UI and allows developers full control over application flow.
   - Frameworks, in contrast, control the structure and flow of the application.

10. **Key Questions Answered**:
    - The order of scripts matters because `react-dom` depends on `react`.
    - React replaces the `root` element's content but leaves content outside the `root` untouched.
    - Placeholder content in the `root` remains visible briefly until the script loads and React takes over.

11. **What is a CDN?**
    - A **Content Delivery Network (CDN)** is a distributed network of servers that delivers resources like JavaScript libraries from a location closest to the user.
    - **Benefits**:
      - **Improved Performance**: Reduced latency by serving files from nearby servers.
      - **Scalability**: Handles large volumes of traffic without impacting server performance.
      - **Reliability**: Ensures availability even during high traffic or server outages.
    - Example in React:
      ```html
      <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
      ```

12. **Crossorigin Attribute**:
    - The `crossorigin` attribute in a `<script>` tag enables **Cross-Origin Resource Sharing (CORS)**.
    - **Purpose**:
      - Allows scripts to access resources from a server hosted at a different origin than the web page.
      - Ensures compatibility and security by managing how resources are fetched and used.
    - Example:
      ```html
      <script
        crossorigin
        src="https://unpkg.com/react@18/umd/react.development.js"
      ></script>
      ```
    - **Key Benefits**:
      - Securely loads scripts and resources from external servers (e.g., CDNs).
      - Supports modern web applications that often rely on resources hosted across different domains.


