# **Chapter 6: Finding the Path**

In this chapter, we explore the foundations of **React routing** and two essential React hooks, `useState` and `useEffect`. These tools are crucial for building dynamic, interactive, and efficient React applications. Let’s break it down step by step.

---

### **1. Introduction to `useEffect` Hook**

The `useEffect` hook is a powerful utility in React used to handle **side effects** in functional components. Side effects include operations like:
- Fetching data from an API.
- Setting up subscriptions.
- Directly interacting with the DOM.

The `useEffect` hook takes two arguments:
1. **Callback Function** – The code that will execute after the component renders.
2. **Dependency Array** (optional) – Controls when the callback should re-execute.

---

### **2. Behavior of `useEffect`**

#### **Scenario 1: No Dependency Array**
- **Behavior**: The `useEffect` runs **after every render**, including initial and subsequent re-renders caused by state or prop changes.
- **Example**:
  ```javascript
  useEffect(() => {
    console.log("useEffect Called");
  });
  ```
- **Use Case**: Rarely used because it can cause unnecessary executions and performance issues.

---

#### **Scenario 2: Empty Dependency Array (`[]`)**
- **Behavior**: The `useEffect` runs **only once**, after the component’s initial render.
- **Example**:
  ```javascript
  useEffect(() => {
    console.log("useEffect Called Once");
  }, []);
  ```
- **Use Case**: Ideal for operations that should occur only when the component mounts, such as fetching initial data.

---

#### **Scenario 3: Dependency Array with Specific Variables**
- **Behavior**: The `useEffect` runs after the initial render and every time any variable in the dependency array changes.
- **Example**:
  ```javascript
  useEffect(() => {
    console.log("useEffect Called when authBtn changes");
  }, [authBtn]);
  ```
- **Use Case**: Useful for triggering updates based on specific state or prop changes, such as re-fetching data when a search term changes.

---

### **3. Best Practices for `useEffect`**
- Use dependencies wisely to avoid unnecessary executions.
- Always include dependencies for variables used inside the callback to ensure correct behavior.
- Use cleanup functions to prevent memory leaks, especially with subscriptions or timers.

---

### **4. Introduction to `useState` Hook**

The `useState` hook is a React tool for managing **local state** in functional components. It returns:
1. **State Variable** – Holds the current state value.
2. **Setter Function** – Updates the state and triggers a re-render.

#### Example:
```javascript
const [authBtn, setAuthBtn] = useState("Login");
```

- **`authBtn`**: The current state value.
- **`setAuthBtn`**: The function used to update `authBtn`.

---

### **5. Best Practices for `useState`**

1. **Always Use Inside Functional Components**:
   - Hooks like `useState` cannot be used outside of components. Doing so will result in an error.

2. **Declare at the Top Level**:
   - Always declare state variables at the top of the functional component. This ensures consistent ordering of hooks across renders, avoiding bugs.

3. **Avoid Conditional or Nested Declarations**:
   - Never declare `useState` inside loops, conditional blocks, or nested functions. React expects hooks to execute in the same order on every render.
   - **Incorrect**:
     ```javascript
     if (someCondition) {
       const [state, setState] = useState(false);
     }
     ```
   - **Correct**:
     ```javascript
     const [state, setState] = useState(false);
     if (someCondition) {
       // Do something
     }
     ```

4. **Use for Local State Only**:
   - `useState` is best for managing local state within a single component. For global state, consider using a context or a state management library like Redux.

---

### **6. Why Combine `useState` and `useEffect`?**

- `useState` manages the **current state**, while `useEffect` handles **side effects** that depend on that state.
- Together, they enable:
  - Fetching data when a component mounts or state changes.
  - Dynamically updating UI based on user interactions.

#### Example:
```javascript
import { useState, useEffect } from "react";

const Header = () => {
  const [authBtn, setAuthBtn] = useState("Login");

  useEffect(() => {
    console.log(`Auth button state changed to: ${authBtn}`);
  }, [authBtn]);

  return (
    <button onClick={() => setAuthBtn(authBtn === "Login" ? "Logout" : "Login")}>
      {authBtn}
    </button>
  );
};
```

---

### **7. Practical Example: Login/Logout Button**

#### Initial Attempt with Local Variables:
```javascript
const Header = () => {
  let authBtn = "Login";

  return (
    <button
      onClick={() => {
        authBtn = "Logout"; // Changes the variable
        console.log(authBtn); // Logs the new value
      }}
    >
      {authBtn}
    </button>
  );
};
```

**Problem**: The UI does not update because React doesn’t track changes to local variables.

---

#### Solution: Use State Variables
```javascript
import { useState } from "react";

const Header = () => {
  const [authBtn, setAuthBtn] = useState("Login");

  return (
    <button
      onClick={() => {
        setAuthBtn(authBtn === "Login" ? "Logout" : "Login");
      }}
    >
      {authBtn}
    </button>
  );
};
```

**Why It Works**:
- `authBtn` is now a state variable.
- Calling `setAuthBtn` updates the state and triggers a re-render, updating the UI with the new state value.

---

### **8. Understanding React’s Internal Process**

1. **Initial Render**:
   - React calls the component function.
   - State variables are initialized with their default values.

2. **State Update**:
   - Calling a setter function (e.g., `setAuthBtn`) updates the state.
   - React schedules a re-render.

3. **Re-Render**:
   - React calls the component function again.
   - State variables are re-declared with their updated values.
   - The updated virtual DOM is compared with the previous one, and only the changes are applied to the real DOM.

---

### **9. What’s Next?**

With a solid understanding of `useState` and `useEffect`, we’re ready to explore **React routing**. Routing enables the creation of multi-page applications by managing URLs and rendering different components based on the route. Stay tuned for the next part, where we’ll dive into `react-router-dom` and its capabilities.

--- 

### **Key Takeaways**

1. **`useState`**:
   - Manages local state within components.
   - Triggers re-renders when updated.
   - Must be declared at the top level of functional components.

2. **`useEffect`**:
   - Handles side effects like data fetching or subscriptions.
   - Runs based on the dependency array.

3. **Best Practices**:
   - Declare hooks in a predictable order.
   - Use state variables for dynamic UI updates.
   - Avoid placing hooks inside conditions or loops.

By mastering these concepts, you’re laying the foundation for building scalable and interactive React applications.

---

## **Routing in React**
Routing enables us to build multi-page applications in React, providing users with a seamless navigation experience. In this part, we explore how to set up React Router DOM, address common issues, and implement routing effectively.

---

### **1. React Router DOM Setup**

To implement routing in React:
1. Install React Router DOM:
   ```bash
   npm install react-router-dom
   ```
2. Import the necessary modules:
   ```javascript
   import { createBrowserRouter, RouterProvider } from "react-router-dom";
   ```

---

### **2. Creating Pages**
Each page in your application is a functional React component. For example:

#### **About.js**
```javascript
const About = () => {
  return (
    <div>
      <h1>This Is About Section</h1>
      <p>Welcome to About of Namaste React</p>
    </div>
  );
};

export default About;
```

#### **Contact.js**
```javascript
const Contact = () => {
  return (
    <div>
      <h1>Thanks For Contacting Us</h1>
    </div>
  );
};

export default Contact;
```

---

### **3. Defining Routes**
React Router DOM uses the `createBrowserRouter` function to define routes. Each route is an object containing:
- `path`: The URL path (e.g., `/about`).
- `element`: The component to render for that path.
- `errorElement` (optional): A custom error component for handling invalid routes.

#### Example:
```javascript
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />, // Custom error component
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);
```

---

### **4. Rendering Routes**
To enable the routing configuration:
- Use the `RouterProvider` component.
- Pass the router object (`appRouter`) as a prop.

#### Example:
```javascript
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
```

---

### **5. Addressing Missing Steps**

If routing doesn’t work as expected, ensure:
1. **RouterProvider is Used**:
   - Without the `RouterProvider`, React Router cannot manage routes.
   - Ensure you’ve replaced `root.render(<App />)` with `root.render(<RouterProvider router={appRouter} />)`.

2. **Default Error Handling**:
   - React Router provides a built-in error page for invalid routes, but customizing it improves user experience.
   - Create an `Error` component to display personalized error messages.

#### Error Component Example:
```javascript
const Error = () => {
  return (
    <div>
      <h1>Oops! Page Not Found</h1>
      <p>Looks like you've hit a broken link!</p>
    </div>
  );
};

export default Error;
```

3. **Alternate Setup**:
   - React Router DOM also supports `BrowserRouter` and `Routes` for defining routes.
   - This approach works well for simpler configurations.

#### Example with `BrowserRouter`:
```javascript
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Error />} /> {/* Catch-all for invalid routes */}
      </Routes>
    </BrowserRouter>
  );
};

root.render(<AppRouter />);
```

---

### **6. Final Implementation**

Here’s the final working code for routing:

#### **AppLayout.js**
```javascript
import Header from "./components/Header";
import Body from "./components/Body";

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

export default AppLayout;
```

#### **App.js**
```javascript
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
```

---

### **7. Key Features of React Router DOM**

- **Dynamic Routing**: Allows routes to be created dynamically at runtime.
- **Error Handling**: Supports custom error components via the `errorElement` property.
- **Nested Routes**: Enables defining child routes for components.
- **Hooks**: Provides powerful hooks like `useRouteError` for accessing error details.

---

### **8. Best Practices**

1. **Use `createBrowserRouter`**:
   - Recommended for most modern web applications.
   - Provides better support for advanced features like data fetching and loaders.

2. **Error Handling**:
   - Always define an `errorElement` to display user-friendly error messages.

3. **Modular Components**:
   - Keep each page or section in a separate file to improve readability and maintainability.

4. **Use React Router's Tools**:
   - Take advantage of hooks like `useRouteError` to access error information programmatically.

---

### **9. Conclusion**

React Router DOM simplifies routing in React applications, enabling seamless navigation and error handling. By following these steps, you can set up robust and maintainable routing configurations for any project. Understanding the nuances of `RouterProvider`, `createBrowserRouter`, and error handling ensures a smooth user experience, paving the way for scalable applications.

---

### **Using `useRouteError` in React Router**

The `useRouteError` hook is a powerful tool provided by React Router DOM that allows us to access detailed information about the error that caused the application to render the error component. This is particularly useful for creating dynamic and informative error messages.

Here’s how the `useRouteError` hook works and its integration with the error handling setup.

---

### **Understanding `useRouteError`**

- **Purpose**: The `useRouteError` hook provides access to the error object when an error occurs in routing (e.g., navigating to a non-existent route).
- **Common Use Case**: Displaying error status codes and messages dynamically on a custom error page.

---

### **Error Component with `useRouteError`**

#### Implementation:

```javascript
import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  // Get the error object using useRouteError
  const err = useRouteError();

  return (
    <div>
      <h1>Oops! Page Not Found</h1>
      <h3>Looks like you've hit a broken link!</h3>
      {/* Display error details dynamically */}
      <h3>
        {err.status}: {err.statusText}
      </h3>
    </div>
  );
};

export default Error;
```

---

### **How It Works**

1. **Integration with the Routing Configuration**:
   - The `errorElement` property in `createBrowserRouter` allows specifying a custom error component.
   - When an invalid route is accessed, React Router renders this error component.

#### Example Routing Configuration:
```javascript
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />, // Specify the custom error component
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);

export default appRouter;
```

2. **Using `useRouteError`**:
   - When a user navigates to a non-existent route, React Router passes the error object to the `useRouteError` hook.
   - The `err` object contains properties like:
     - `status`: The HTTP status code (e.g., `404` for "Not Found").
     - `statusText`: A brief description of the error (e.g., "Not Found").

---

### **Output Example**

When a user navigates to an undefined route like `/random`, the `Error` component displays:

```
Oops! Page Not Found
Looks like you've hit a broken link!
404: Not Found
```

---

### **Customizing the Error Page**

You can further enhance the error page with additional details:
- Add navigation buttons to return to the homepage or other sections.
- Style the error page with CSS for a more user-friendly design.
- Log error details for debugging purposes.

#### Example with Navigation and Logging:
```javascript
import React from "react";
import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const err = useRouteError();

  console.error("Error occurred:", err); // Log error details for debugging

  return (
    <div>
      <h1>Oops! Page Not Found</h1>
      <h3>Looks like you've hit a broken link!</h3>
      <h3>
        {err.status}: {err.statusText}
      </h3>
      <Link to="/">
        <button>Go Back to Home</button>
      </Link>
    </div>
  );
};

export default Error;
```

---

### **Key Benefits of Using `useRouteError`**

1. **Dynamic Error Handling**:
   - Displays error messages tailored to the specific issue.

2. **Enhanced User Experience**:
   - Provides users with meaningful feedback when they encounter errors.

3. **Debugging Support**:
   - Logs error details for easier debugging and fixing of issues.


---

### **Summary**
Using `useRouteError`:
- Provides flexibility in handling errors dynamically.
- Improves user experience by showing relevant error details.
- Makes debugging easier by logging error information.

By incorporating `useRouteError`, you can create professional and responsive error pages for your React applications.