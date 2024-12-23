# Chapter 5: Let’s Get Hooked


### **Recap from the Previous Episode**

1. Built a **Food Ordering App** that displayed restaurant cards using real-time data from an API (like Swiggy's).
2. Explored the concept of **Config-Driven UI**, enabling dynamic and reusable user interfaces.

---

## **Why Use React Over Plain HTML, CSS, and JavaScript?**

### **Advantages of React**
1. **Efficiency**:
   - React’s **Virtual DOM** enables efficient updates, reducing unnecessary re-renders.
   - Unlike plain HTML, React only updates the changed elements instead of re-rendering the entire page.

2. **Component Reusability**:
   - React allows breaking down the UI into **reusable components** like `Header`, `Body`, and `RestaurantCard`.
   - Reduces redundancy and improves maintainability.

3. **Developer Experience**:
   - Tools like **hooks** (`useState`, `useEffect`) simplify managing state and lifecycle.
   - Component-based architecture organizes code into manageable pieces.

4. **Scalability**:
   - With React’s modular architecture, applications can grow without becoming unmanageable.

---

## **Cleaning Up the App**

### **Why Refactor?**
- Placing all code inside a single `App.js` file is cluttered and hard to maintain.
- The best practice is to **modularize** by creating separate files for each component.

---

## **Folder Structure**

Adopting an industry-standard folder structure makes the app scalable and easy to navigate.

### **Refactored Structure**
```
src/
|-- components/
|   |-- Header.js
|   |-- Body.js
|   |-- RestaurantCard.js
|-- utils/
|   |-- constants.js
|   |-- mocks--->resList.js
|-- App.js
|-- index.js
```

### **Key Points**
1. **`components/`**: Contains all reusable components.
2. **`utils/`**: Contains utility files like constants and mock data.
3. **`App.js`**: Acts as the main container for combining components.

---

## **Exporting and Importing in React**

### **Types of Exports/Imports**
1. **Default Export/Import**:
   - Used for components that are the main export of a file.
   - Example:
     ```javascript
     // In Header.js
     export default Header;

     // In App.js
     import Header from './components/Header';
     ```

2. **Named Export/Import**:
   - Used for exporting multiple variables or utilities from a file.
   - Example:
     ```javascript
     // In constants.js
     export const CDN_URL = "https://cdn.example.com/";
     export const LOGO_URL = "https://cdn.example.com/logo.png";

     // In Header.js
     import { CDN_URL, LOGO_URL } from '../utils/constants';
     ```

---

## **Refactoring Components**

### **1. Header Component**
Move the `Header` component into its own file:
```javascript
// Header.js
const Header = () => {
    return (
        <div className="header">
            <img className="logo" src="LOGO_URL" alt="App Logo" />
            <nav>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                    <li>Cart</li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
```

### **2. RestaurantCard Component**
```javascript
// RestaurantCard.js
const RestaurantCard = ({ resData }) => {
    const { name, cuisines, avgRating, deliveryTime } = resData;

    return (
        <div className="res-card">
            <img className="res-logo" src="CDN_URL" alt="Restaurant Logo" />
            <h3>{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating} stars</h4>
            <h4>{deliveryTime} mins</h4>
        </div>
    );
};

export default RestaurantCard;
```

### **3. Body Component**
```javascript
// Body.js
import RestaurantCard from './RestaurantCard';
import { resList } from '../utils/mockData';

const Body = () => {
    return (
        <div className="body">
            {resList.map((resData) => (
                <RestaurantCard key={resData.id} resData={resData} />
            ))}
        </div>
    );
};

export default Body;
```

---

## **Handling Hardcoded Data**

### **Why Move Hardcoded Data to `utils/`?**
1. **Reusability**: Centralizes data, making it accessible across multiple components.
2. **Scalability**: Mock data can later be replaced with API calls.
3. **Best Practice**: Keeps component files clean and focused on rendering.

### **Example: Moving Data**
```javascript
// mockData.js
export const resList = [
    {
        id: 1,
        name: "Meghana Foods",
        cuisines: ["Biryani", "North Indian"],
        avgRating: 4.4,
        deliveryTime: 38,
    },
    {
        id: 2,
        name: "KFC",
        cuisines: ["Chicken", "Fast Food"],
        avgRating: 4.2,
        deliveryTime: 30,
    },
];
```

---

## **Common Errors and Solutions**

### **Error: Undefined Variables**
- **Problem**: `resList` is undefined in `Body.js`.
- **Solution**: Import `resList` from `mockData.js`:
  ```javascript
  import { resList } from '../utils/mockData';
  ```

### **Error: Incorrect Import Paths**
- **Problem**: Paths break after moving files.
- **Solution**: Update import paths to match the new folder structure.

### **Error: No Keys in `map()`**
- **Problem**: Missing unique keys in dynamic lists leads to React warnings.
- **Solution**: Use unique `id` from `resList` as the key:
  ```javascript
  <RestaurantCard key={resData.id} resData={resData} />
  ```

---

## **Best Practices Recap**

1. **Organize Folder Structure**:
   - Separate components, utilities, and assets.
2. **Export/Import**:
   - Use default export for single entities (e.g., components).
   - Use named export for multiple entities (e.g., constants).
3. **Avoid Hardcoding Data**:
   - Move mock data and constants to `utils/`.

---

### **Summary**
- Refactored the app into a modular structure for better maintainability.
- Used default and named exports to manage components and utilities.
- Followed React best practices by organizing files and using keys for lists.

This setup ensures a **scalable, maintainable, and professional-grade React application**.

---

## **Making Our App Interactive**

#### **Objective**
The primary goal is to transition from a static webpage to a dynamic and interactive application. This involves adding features that respond to user actions, such as filtering and displaying only top-rated restaurants. React's powerful state management and hooks will help achieve this seamlessly.

#### **Why Interactivity Matters**
In static applications, data is displayed but doesn’t change based on user input or actions. By making the app interactive, we:
- Enhance the user experience.
- Allow users to explore and filter content based on their preferences.
- Showcase React’s superpower of efficiently updating the UI.

---

### **Adding a Button to Filter Restaurants**

#### **Step 1: The `Body` Component**
The `Body` component is the core section of our application where restaurant cards are displayed. To make this dynamic, we’ll:
1. Add a button labeled **"Top Rated Restaurants"**.
2. Implement a filtering logic that shows only restaurants with an average rating of 4 or higher.

#### **Step 2: Writing the Button and Its Event Handler**
A button is added within the `Body` component:
```jsx
<button className="filter-btn">
  Top Rated Restaurants
</button>
```

To make the button functional, an `onClick` event handler is attached:
```jsx
<button
  className="filter-btn"
  onClick={() => {
    const filteredRes = resList.filter(
      (res) => res.data.avgRating >= 4
    );
    setResList(filteredRes);
  }}
>
  Top Rated Restaurants
</button>
```

When clicked:
- The `.filter()` method processes the `resList` array to include only restaurants meeting the criteria (`avgRating >= 4`).
- The filtered list is then passed to the `setResList` function, which updates the state and re-renders the UI.

---

### **Understanding the State in React**

#### **Why Normal Variables Don't Work**
Normal variables (e.g., `let listOfRestaurant = [];`) are static. Modifying them doesn't notify React, so the UI remains unchanged.

#### **How React's State Solves This**
State variables, created using React's `useState` hook, are reactive. When their value is updated:
1. React detects the change.
2. The component is re-rendered, and the updated state is reflected in the UI.

---

### **Deep Dive into `useState`**

#### **What is `useState`?**
`useState` is a React hook used to:
- Create a state variable.
- Provide a setter function to update the state.

#### **Syntax**
```jsx
const [stateVariable, setStateFunction] = useState(initialValue);
```

- **`stateVariable`**: The current state value.
- **`setStateFunction`**: A function to update the state.

#### **Example in Context**
```jsx
const [resList, setResList] = useState(listOfRestaurant);
```
- `resList` stores the initial list of restaurants.
- `setResList` updates this list dynamically.

---

### **Transforming the Body Component**

#### **Before Adding Interactivity**
The `Body` component simply displays all restaurants using the `map()` function:
```jsx
<div className="res-container">
  {listOfRestaurant.map((restaurant) => (
    <RestaurantCard key={restaurant.data.id} resData={restaurant} />
  ))}
</div>
```

#### **After Adding Interactivity**
The updated `Body` component includes:
1. A **state variable** to manage the list of restaurants:
   ```jsx
   const [resList, setResList] = useState(listOfRestaurant);
   ```
2. A **button** to filter top-rated restaurants:
   ```jsx
   <button
     className="filter-btn"
     onClick={() => {
       const filteredRes = resList.filter(
         (res) => res.data.avgRating >= 4
       );
       setResList(filteredRes);
     }}
   >
     Top Rated Restaurants
   </button>
   ```
3. A **dynamic rendering** of the filtered list:
   ```jsx
   <div className="res-container">
     {resList.map((restaurant) => (
       <RestaurantCard key={restaurant.data.id} resData={restaurant} />
     ))}
   </div>
   ```

---

### **React’s Superpowers**

#### **1. UI-Data Synchronization**
React’s state ensures that any change in data is automatically reflected in the UI. This is achieved through:
- **State Variables**: Reactive variables that trigger re-renders when updated.
- **Hooks**: Functions like `useState` simplify managing dynamic data.

#### **2. Efficient DOM Updates**
React’s virtual DOM minimizes unnecessary updates:
- Changes are compared using a **diffing algorithm**.
- Only the modified elements are updated in the real DOM, ensuring optimal performance.

---

### **Challenges and Solutions**

#### **1. Why Didn’t the UI Update Initially?**
- Directly modifying variables (e.g., `listOfRestaurant = [...];`) doesn’t notify React to re-render the UI.
- **Solution**: Use `useState` to manage state.

#### **2. How Does Filtering Work Dynamically?**
- The `onClick` handler updates the state with a filtered list.
- React re-renders the component using the new state.

#### **3. What About Efficiency?**
- React’s virtual DOM ensures only the necessary parts of the UI are updated, making it faster than traditional DOM manipulations.

---

### **Final Code for the Body Component**
```jsx
import { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import listOfRestaurant from "../utils/mocks/resList";

const Body = () => {
  const [resList, setResList] = useState(listOfRestaurant);

  return (
    <>
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            const filteredRes = resList.filter(
              (res) => res.data.avgRating >= 4
            );
            setResList(filteredRes);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {resList.map((restaurant) => (
          <RestaurantCard key={restaurant.data.id} resData={restaurant} />
        ))}
      </div>
    </>
  );
};

export default Body;
```

---

### **Key Takeaways**

1. **State is the Backbone of Dynamic Apps**:
   - Use `useState` to create reactive variables.
   - State ensures the UI remains in sync with data changes.

2. **Efficient Updates with React**:
   - React’s virtual DOM minimizes unnecessary updates.
   - The reconciliation process ensures optimal rendering.

3. **Reusability and Modularity**:
   - Breaking the UI into components (`RestaurantCard`, `Body`) makes the app more maintainable.

4. **Enhancing User Experience**:
   - Interactivity like filtering creates a more engaging and user-friendly application.

---
### **Understanding React's Core Principles**

#### **State Variables and Reconciliation**
1. **State Variables**:
   - In React, **state variables** are special reactive variables that store data and trigger UI updates when modified.
   - Unlike regular variables, state variables must be updated using their corresponding setter function (e.g., `setState`) to trigger re-rendering.

2. **Reconciliation**:
   - React’s **reconciliation process** ensures that the UI (what users see) is always synchronized with the data layer (state variables).
   - **How it works**:
     - When a state variable updates, React compares the **previous virtual DOM** with the **current virtual DOM** using its **diff algorithm**.
     - React then applies only the required updates to the actual DOM, optimizing performance.

3. **React Fiber**:
   - Introduced in React 16, **React Fiber** is a reimplementation of React's reconciliation algorithm.
   - Features:
     - **Incremental rendering**: Splits rendering work into chunks, allowing for smoother UI updates.
     - **Efficiency in animations, layout, and gestures**.

---

### **Why React is So Fast?**

#### **The Virtual DOM**
- **Virtual DOM**:
  - A lightweight JavaScript representation of the actual DOM.
  - Enables React to efficiently determine changes without interacting directly with the slow actual DOM.

- **How React Uses the Virtual DOM**:
  1. React keeps a copy of the virtual DOM (before changes).
  2. When the state updates, React creates a new virtual DOM (after changes).
  3. React compares the two virtual DOMs and calculates the minimum number of changes needed.
  4. These changes are applied to the actual DOM.

---

### **React Fiber and Performance**
- **React Fiber** improves rendering by:
  - Breaking the rendering process into chunks to prioritize smoother animations and interactions.
  - Supporting concurrent rendering for enhanced responsiveness.

#### **Example**:
- Filtering a restaurant list updates the virtual DOM, and React Fiber ensures only the necessary changes are applied to the actual DOM.

---

### **React Hooks: `useState`**

#### **What is `useState`?**
- `useState` is a React Hook used for managing state in functional components.
- **Syntax**:
  ```jsx
  const [stateVariable, setStateFunction] = useState(initialValue);
  ```

- **Example**:
  ```jsx
  const [resList, setResList] = useState(listOfRestaurant);
  ```

#### **How `useState` Works**:
1. **State Variable**:
   - Holds the current state value (e.g., `resList`).
2. **Setter Function**:
   - Updates the state (e.g., `setResList`).
   - Triggers React's reconciliation process to update the UI.

#### **Why Can't We Modify State Directly?**
- React requires the use of the setter function (`setState`) to ensure:
  1. React knows the state has changed.
  2. The reconciliation process is triggered.

---

### **Dynamic Updates with State Variables**

#### **Problem: Static UI**
- Without state management, updating a variable (e.g., filtering a list) won't trigger UI updates.

#### **Solution: Use `useState`**
- By using `useState`, React dynamically re-renders the UI whenever the state changes.

#### **Example: Filtering Restaurants**
```jsx
const [resList, setResList] = useState(listOfRestaurant);

const filterTopRatedRestaurants = () => {
  const filteredRes = resList.filter((res) => res.data.avgRating >= 4);
  setResList(filteredRes);
};

return (
  <>
    <button onClick={filterTopRatedRestaurants}>Top Rated Restaurants</button>
    <div>
      {resList.map((restaurant) => (
        <RestaurantCard key={restaurant.data.id} resData={restaurant} />
      ))}
    </div>
  </>
);
```

---

### **Reconciliation in Action**

1. **State Update**:
   - Clicking the "Top Rated Restaurants" button calls `setResList`, updating the `resList` state.

2. **Virtual DOM Comparison**:
   - React compares the **old virtual DOM** (all restaurants) with the **new virtual DOM** (filtered restaurants).

3. **Efficient DOM Updates**:
   - React updates only the DOM nodes corresponding to removed or updated restaurants.

---

### **Code Example**

#### **Body Component**
```jsx
import { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import listOfRestaurant from "../utils/mocks/resList";

const Body = () => {
  const [resList, setResList] = useState(listOfRestaurant);

  const filterTopRatedRestaurants = () => {
    const filteredRes = resList.filter((res) => res.data.avgRating >= 4);
    setResList(filteredRes);
  };

  return (
    <>
      <div className="filter">
        <button className="filter-btn" onClick={filterTopRatedRestaurants}>
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {resList.map((restaurant) => (
          <RestaurantCard key={restaurant.data.id} resData={restaurant} />
        ))}
      </div>
    </>
  );
};

export default Body;
```

---
### **Destructuring with `useState`**

#### **What is `useState`?**
- `useState` is a React Hook that provides a way to add state to functional components.
- It allows you to define **state variables** and **functions** to update those variables.
- Syntax:
  ```jsx
  const [stateVariable, setStateFunction] = useState(initialValue);
  ```

#### **How `useState` Works Internally**
When you use the `useState` hook, React returns an **array** with exactly two items:
1. The **current state value** (the value stored in the state).
2. A **function** to update that state value.

For example:
```jsx
const [resList, setResList] = useState(listOfRestaurant);
```
Here:
- `resList`: The state variable, holding the current list of restaurants.
- `setResList`: The setter function, used to update `resList`.

---

### **Understanding Destructuring**
- **Destructuring** is a shorthand way of extracting values from an array or object.
- Without destructuring, accessing the state and setter function would look like this:
  ```jsx
  const arr = useState(listOfRestaurant); // useState returns an array
  const resList = arr[0]; // First item is the state variable
  const setResList = arr[1]; // Second item is the setter function
  ```

- Using destructuring, you can simplify this into a single line:
  ```jsx
  const [resList, setResList] = useState(listOfRestaurant);
  ```

---

### **Breaking Down the Example**

#### **Without Destructuring**
```jsx
const arr = useState(listOfRestaurant); // Returns an array
const resList = arr[0];                 // Extract state variable
const setResList = arr[1];              // Extract setter function
```
- `arr` contains the array returned by `useState`.
- `arr[0]` is the current state value (`resList`).
- `arr[1]` is the setter function (`setResList`).

#### **With Destructuring**
```jsx
const [resList, setResList] = useState(listOfRestaurant);
```
- `[resList, setResList]` directly unpacks the returned array.
- The first value (`resList`) is assigned to the state variable.
- The second value (`setResList`) is assigned to the setter function.


---

### **Key Takeaways**
1. `useState` returns an **array** with:
   - The current state value.
   - A setter function to update the state.
2. **Destructuring** simplifies extracting these values into variables.
3. Always use destructuring for readability, maintainability, and alignment with React’s modern coding standards.
---

# **Summary**

1. **Reconciliation and React Fiber**:
   - React’s virtual DOM and Fiber architecture optimize rendering by updating only what’s necessary.

2. **Dynamic UI with `useState`**:
   - The `useState` hook enables dynamic updates, linking the data layer with the UI layer seamlessly.

3. **Efficient State Management**:
   - Always use setter functions (`setState`) to modify state variables and trigger re-renders.

4. **Reusable Components**:
   - Break the UI into small, reusable components (e.g., `RestaurantCard`) for scalability and maintainability.

5. **React Basics**:
   - React simplifies front-end development through reusable components and efficient DOM updates.

6. **State Management**:
   - State variables allow dynamic updates, ensuring the UI reflects data changes seamlessly.

7. **Performance Features**:
   - React Fiber enhances rendering efficiency through incremental updates and task prioritization.

8. **Interactivity**:
   - Event handling and hooks (`useState`) bring life to applications by enabling user-driven changes.

With these concepts, you’re well-equipped to build scalable, interactive, and high-performance React applications! 