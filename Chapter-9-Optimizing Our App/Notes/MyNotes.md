# Chapter 9 Part 1 – Optimizing Our App

Optimizing code for performance, maintainability, and scalability is a hallmark of proficient development. In this chapter, we’ll delve into the **Single Responsibility Principle (SRP)**, modularity, and the power of **custom hooks** to make our React app cleaner, faster, and more reusable.

---

## **The Single Responsibility Principle (SRP)**

### **What Is SRP?**
The SRP dictates that every component, function, or module should handle **one responsibility**. In React:
- A `RestaurantCard` should **only render restaurant details**.
- A `Header` should focus on **displaying the app header**.

This separation ensures:
1. **Readability**: Components are easier to understand at a glance.
2. **Testability**: Testing isolated components simplifies debugging.
3. **Reusability**: Modular components are versatile and adaptable.

### **Implementing SRP**
If a component does more than one thing, such as fetching data and rendering a UI, separate the responsibilities:
- Use **custom hooks** for data fetching.
- Keep components focused on rendering.

Example: Splitting `RestaurantMenu` into rendering logic and a custom hook for data fetching.

---

## **Modularity in React**

Breaking down functionality into reusable, isolated pieces helps in:
1. **Debugging**: Smaller components are easier to test.
2. **Collaboration**: Clearer responsibilities make teamwork smoother.
3. **Scalability**: Modular components adapt better as apps grow.

---

## **Custom Hooks: Simplifying Logic**

### **What Are Custom Hooks?**
Custom hooks encapsulate reusable logic, such as fetching data or handling form inputs. They’re simply JavaScript functions that use React hooks (`useState`, `useEffect`, etc.) internally.

### **Benefits**
- **Encapsulation**: Logic is centralized in one place.
- **Reusability**: Share logic across multiple components.
- **Readability**: Components become leaner and more focused.

---

## **Implementing a Custom Hook**

### **Scenario**
In the `RestaurantMenu` component, fetching data and rendering are mixed. We’ll create a custom hook, `useRestaurantMenu`, to handle data fetching.

---

### **Step 1: Initial State**

**Before Optimization: `RestaurantMenu.js`**
```javascript
const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(MENU_URL + resId);
      const json = await data.json();
      setResInfo(json.data);
    };
    fetchData();
  }, []);

  if (!resInfo) return <Shimmer />;
  return <div>{/* Render restaurant details */}</div>;
};
```

### **Step 2: Create Custom Hook**

**New File: `useRestaurantMenu.js`**
```javascript
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MENU_URL } from "./constants";

const useRestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(MENU_URL + resId);
      const json = await data.json();
      setResInfo(json.data);
    };
    fetchData();
  }, [resId]);

  return resInfo;
};

export default useRestaurantMenu;
```

---

### **Step 3: Refactor Component**

**Updated: `RestaurantMenu.js`**
```javascript
import React from "react";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const resInfo = useRestaurantMenu();

  if (!resInfo) return <Shimmer />;

  const {
    name,
    cuisines,
    avgRatingString,
    totalRatingsString,
    costForTwoMessage,
  } = resInfo?.cards[2]?.card?.card?.info || {};

  return (
    <div>
      <h1>{name}</h1>
      <p>{cuisines.join(", ")}</p>
      <p>Ratings: {avgRatingString} ({totalRatingsString})</p>
      <p>{costForTwoMessage}</p>
    </div>
  );
};

export default RestaurantMenu;
```

---

## **Advantages of Custom Hooks**

### **1. Cleaner Components**
The `RestaurantMenu` component now focuses solely on rendering the UI, with no concern for data fetching.

### **2. Reusability**
The `useRestaurantMenu` hook can be reused in any component that requires restaurant data.

### **3. Easy Maintenance**
If there’s an issue with data fetching, it’s isolated to the hook, simplifying debugging.

---

## **Summary**

### **Key Takeaways**
1. **Single Responsibility Principle**: Keep components focused on a single task.
2. **Modularity**: Divide your app into reusable, testable pieces.
3. **Custom Hooks**: Encapsulate shared logic to simplify components.

---

In this section, we dive deeper into custom hooks, exploring how they can transform your React codebase. By encapsulating reusable logic into custom hooks, you can improve the modularity, readability, and maintainability of your application. Let’s take an example of creating a custom hook, `useOnlineStatus`, to track the user’s internet connection status.

---

In this example, the `useOnlineStatus` hook tracks the user’s online/offline status using browser events. This information can be displayed in various components, such as `Header`, `Body`, or `RestaurantMenu`.

---

## **Building the `useOnlineStatus` Hook**

### **1. Hook Definition**

Create `useOnlineStatus.js` to encapsulate the logic for tracking online/offline status:
```javascript
import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(true);

  useEffect(() => {
    const handleOffline = () => setOnlineStatus(false);
    const handleOnline = () => setOnlineStatus(true);

    // Add event listeners
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return onlineStatus;
};

export default useOnlineStatus;
```

---

## **Integrating `useOnlineStatus`**

### **2. Using in the `Body` Component**

Enhance the `Body` component to show an offline message:
```javascript
import React, { useEffect, useState } from "react";
import useOnlineStatus from "../utils/useOnlineStatus";
import Shimmer from "./Shimmer";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";
import { SWIGGY_URL } from "../utils/constants";

const Body = () => {
  const [resList, setResList] = useState([]);
  const [renderRes, setRenderRes] = useState([]);
  const [searchRes, setSearchRes] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(SWIGGY_URL);
      const json = await data.json();
      const restaurants =
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];
      setResList(restaurants);
      setRenderRes(restaurants);
    };
    fetchData();
  }, []);

  const onlineStatus = useOnlineStatus();

  if (!onlineStatus) {
    return (
      <h1>
        Looks like you're offline! Please check your internet connection.
      </h1>
    );
  }

  return resList.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      {/* Filter Section */}
      <div className="filter">
        {/* Search Bar */}
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchRes}
            onChange={(e) => setSearchRes(e.target.value)}
          />
          <button
            className="searchBtn"
            onClick={() => {
              const filteredRes = resList.filter((res) =>
                res.info.name.toLowerCase().includes(searchRes.toLowerCase())
              );
              setRenderRes(filteredRes);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredRes = resList.filter(
              (res) => res.info.avgRating >= 4
            );
            setRenderRes(filteredRes);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>

      {/* Restaurant List */}
      <div className="res-container">
        {renderRes.map((restaurant) => (
          <Link key={restaurant.info.id} to={`/restaurant/${restaurant.info.id}`}>
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Body;
```

### **3. Using in the `Header` Component**

Show online/offline status in the `Header` component:
```javascript
import React from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const onlineStatus = useOnlineStatus();

  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img className="logo" src="/logo.png" alt="Logo" />
        </Link>
      </div>
      <div className="nav-items">
        <ul>
          <li>Online Status: {onlineStatus ? "✅" : "🔴"}</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
```

---

## **Advantages of `useOnlineStatus`**

### **1. Simplicity**
- By encapsulating online/offline logic, components like `Body` and `Header` focus solely on rendering.

### **2. Reusability**
- The same hook can be used in multiple components without duplicating logic.

### **3. Performance**
- Proper cleanup of event listeners ensures efficient resource usage.

---

## **Key Takeaways**

1. **Encapsulate Logic**: Use custom hooks to separate logic from UI.
2. **Reusable Hooks**: Build hooks like `useOnlineStatus` for shared functionality.
3. **Separation of Concerns**: Keep components focused on rendering, delegating side effects to hooks.
4. **Cleanup Matters**: Always clean up side effects to avoid memory leaks.

By creating and using custom hooks like `useOnlineStatus`, you improve code clarity, reduce redundancy, and create a more maintainable and scalable React application. Experiment with creating more hooks tailored to your app’s needs to further optimize your development workflow.

---

In this part, we delve deeper into advanced React optimization techniques such as **chunking**, **code splitting**, **dynamic bundling**, **lazy loading**, and **on-demand loading**. These strategies are essential for building scalable and high-performing React applications, especially as the complexity of your application grows.

---

## **Understanding Key Optimization Concepts**
These terms may sound different, but they essentially describe the same underlying concepts. Let’s break them down:

### **1. Chunking**
- **Definition**: Splitting the codebase into smaller, manageable pieces or "chunks" to improve load times.
- **Why it matters**: Instead of loading a single, large JavaScript bundle, chunking allows only the necessary code to load on demand, reducing initial load time.

### **2. Code Splitting**
- **Definition**: Dividing your application into logical sections that can be loaded independently.
- **Why it matters**: Ensures only the code required for the current feature or page is loaded, improving performance and user experience.

### **3. Dynamic Bundling**
- **Definition**: Bundling parts of your code dynamically based on runtime requirements.
- **Why it matters**: Dynamically generated bundles ensure optimized resource usage, loading only what is needed when it’s needed.

### **4. Lazy Loading**
- **Definition**: Dynamically loading components or modules only when they are needed.
- **Why it matters**: Reduces the initial bundle size, enabling faster page loads.

### **5. On-Demand Loading**
- **Definition**: Loading code or resources as needed during runtime.
- **Why it matters**: Ensures users download only necessary resources, optimizing bandwidth and performance.

### **6. Dynamic Import**
- **Definition**: A JavaScript feature used to load modules dynamically at runtime.
- **Why it matters**: Enables lazy loading and dynamic bundling.

These terms often describe different facets of the same goal: optimizing performance by reducing initial load time and improving scalability.

---

## **Why Do We Need Lazy Loading?**

Lazy loading is essential for handling large, heavy applications effectively. Here’s why:

1. **Optimizes Initial Load Time**: Ensures faster initial page loads by fetching only the required code.
2. **Improves User Experience**: Offers quicker interactions and seamless transitions.
3. **Minimizes Bandwidth Usage**: Saves resources for users on slower networks.
4. **Enhances Scalability**: Prevents bundle sizes from becoming unmanageably large as your application grows.

For example, in a food delivery app, users visiting the homepage don’t need to load components for the "Grocery" page immediately.

---

## **Why Do We Need Suspense?**

React’s `lazy` function dynamically imports components, but React doesn’t know how long the component will take to load. Without `Suspense`, React would throw an error if it tried to render an unloaded component.

### **What Suspense Does**
- Acts as a **placeholder UI** while the lazy-loaded component is being fetched.
- Prevents crashes during loading by providing a fallback UI.

Example:
```javascript
<Suspense fallback={<h1>Loading...</h1>}>
  <Grocery />
</Suspense>
```
Here, `<h1>Loading...</h1>` is displayed until the `Grocery` component is ready, enhancing user experience.

---

## **Implementing Dynamic Bundling and Lazy Loading**

### **1. Dynamic Import and Lazy Loading**
React’s `lazy` function dynamically imports components. For example:
```javascript
const Grocery = lazy(() => import('./components/Grocery'));
```

### **2. Adding Suspense for Fallback**
Use the `Suspense` component to handle delays during loading:
```javascript
const GroceryPage = () => (
  <Suspense fallback={<h1>Loading Grocery Store...</h1>}>
    <Grocery />
  </Suspense>
);
```

### **3. Updating the Router**
Integrate lazy-loaded components into the router:
```javascript
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/grocery", element: (
        <Suspense fallback={<h1>Loading Grocery Store...</h1>}>
          <Grocery />
        </Suspense>
      )},
    ],
  },
]);
```

---

## **Code Implementation**

### **Grocery Component**
```javascript
const Grocery = () => {
  return <h1>This is our Grocery Store</h1>;
};
export default Grocery;
```

### **Header Component**
```javascript
<div className="nav-items">
  <ul>
    <li><Link to="/grocery">Grocery</Link></li>
  </ul>
</div>
```

### **App.js**
```javascript
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import AppLayout from "./components/AppLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Grocery = lazy(() => import("./components/Grocery"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading Grocery Store...</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
```

---

## **Benefits of Optimization Techniques**

1. **Reduced Initial Load Time**: By loading only necessary code, initial page load is faster.
2. **Improved User Experience**: Smooth transitions and quicker interactions.
3. **Optimized Performance**: Smaller bundles improve performance, especially for users on slow networks.
4. **Scalability**: Dynamic bundling prevents bloated bundles as the app grows.

---

## **Common Pitfalls**

1. **Forgetting Fallbacks**: Always use `Suspense` to avoid rendering issues.
2. **Overusing Lazy Loading**: Focus on larger or less-used components to avoid excessive runtime fetches.
3. **Improper Dependency Management**: Ensure dynamically loaded components have the correct dependencies.

---

## **Conclusion**

Dynamic bundling, lazy loading, and related optimization techniques are crucial for building scalable, high-performing React applications. These strategies reduce initial load times, improve user experience, and optimize resource usage. By combining these concepts with tools like React’s `lazy` and `Suspense`, you can create efficient, user-friendly applications that scale effortlessly. Experiment with these techniques to master React optimization!

