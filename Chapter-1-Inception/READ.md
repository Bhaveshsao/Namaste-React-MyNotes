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

   - React replaces the content with the new render.

3. **Why is React a library, not a framework?**

   - React focuses solely on UI, without enforcing a specific structure or additional tools (like routing or state management).

### Concepts Explained

1. **CDN**: Content Delivery Network. It provides resources (like React) from distributed servers, improving load times and reliability.
2. **Crossorigin Attribute**: Allows scripts to access resources from different origins while handling security-related restrictions.

