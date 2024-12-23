# **Chapter 6: Exploring The World**

## **Introduction**

- **Objective**: Understand the evolution from **Monolith** to **Microservices** architecture in software development.
- Learn how React, as a **UI microservice**, interacts with other services in a modern application.

---

### **Monolithic Architecture**

#### **Definition**

- A **single-unit architecture** where all components—UI, APIs, database connections, authentication, and notifications—reside in one massive project.

#### **Key Features**

1. **Single Codebase**:
   - All functionalities are tightly coupled within one project.
   - Example: A Java application with APIs, JSP pages, and database queries in the same repository.
2. **Deployment Challenges**:
   - Any change, even minor, requires redeployment of the entire system.
   - Example: Updating a button color requires recompiling the whole app.
3. **Scaling Issues**:
   - Scaling individual features is impossible; the entire app must scale.
   - Example: If the notification module needs more resources, the entire application must scale, wasting resources.
4. **Reliability Concerns**:
   - A bug in one module (e.g., the login system) can crash the entire application.
5. **Slow Development and Maintenance**:
   - Changes are time-consuming due to interdependencies and lack of modularity.

#### **Why Move Away from Monolithic Architecture?**

- Monoliths are suitable for small projects but fail in handling the complexity, scalability, and flexibility required in modern applications.

---

### **Microservices Architecture**

#### **Definition**

- **Decomposed Architecture**: An application is split into small, independent services, each handling a specific functionality.

#### **Advantages**

1. **Separation of Concerns**:
   - Each service focuses on a single responsibility (e.g., payment, authentication).
   - Easier to manage and maintain.
2. **Independent Development**:
   - Teams can work on services independently, reducing bottlenecks.
   - Example: The UI team works on the React frontend while the backend team handles APIs.
3. **Scalability**:
   - Services can scale independently based on their resource needs.
   - Example: Scale the payment service for high transaction traffic without scaling the entire app.
4. **Flexibility in Technology**:
   - Each service can use the technology best suited for its functionality.
   - Example: Backend APIs in Java, database services in Python, notifications in GoLang.
5. **Faster Updates**:
   - Continuous deployment is easier as services can be deployed independently.

#### **Challenges Addressed**

- **Modularity**: Separate services prevent interdependencies.
- **Fault Isolation**: Issues in one service (e.g., email notifications) won’t affect others.
- **Technology Adoption**: Upgrade or replace individual services without rewriting the entire application.

---

### **How Microservices Communicate**

#### **Communication Channels**

1. **Inter-Service Communication**:

   - Services interact using **HTTP requests**, **REST APIs**, or **messaging protocols**.
   - Example:
     - The UI service requests data from the backend.
     - The backend queries the database and sends the response to the UI.

2. **Port Assignments**:

   - Each service runs on its own port.
   - Example:
     - UI: `1234`
     - Backend: `5000`
     - Payment Gateway: `7000`

3. **Domain Mapping**:

   - Ports are mapped to URLs for unified access.
   - Example:
     - API: `example.com/api`
     - Payment: `example.com/payment`
     - UI: `example.com`

4. **Request Flow Example**:
   - A user visits `example.com` (React UI service).
   - The UI service fetches data from `example.com/api` (Backend API service).
   - The Backend API queries the database and responds with the required data.

---

### **React as a Microservice**

#### **Role in a Microservices Architecture**

- **React Project**: Functions as the **UI Microservice** in the architecture.
- **Purpose**: Manage the user interface and communicate with backend services for dynamic data.

#### **Characteristics**

1. **Port-Based Deployment**:
   - React runs on its own port, separate from other services.
   - Example: `localhost:1234` during development.
2. **Independent Development**:
   - The UI team can build and deploy React applications without depending on the backend team.
3. **Inter-Service Communication**:
   - React fetches data from backend APIs using **HTTP requests** (e.g., `axios`, `fetch`).

#### **Advantages**

1. **Decoupled Development**:
   - Frontend and backend teams work independently, reducing delays.
2. **Scalability**:
   - UI services can scale based on traffic without impacting backend or other services.
3. **Flexibility**:
   - React UI service remains unaffected by backend technology choices.

---

### **Microservices vs. Monolith: A Side-by-Side Comparison**

| **Aspect**                 | **Monolith**                             | **Microservices**                        |
| -------------------------- | ---------------------------------------- | ---------------------------------------- |
| **Codebase**               | Single, tightly coupled                  | Multiple, loosely coupled                |
| **Deployment**             | Entire app redeployed for changes        | Independent deployment of services       |
| **Fault Isolation**        | Bugs in one module affect the entire app | Bugs are isolated to individual services |
| **Scalability**            | Scale the whole app                      | Scale individual services                |
| **Technology Flexibility** | Limited                                  | Flexible for each service                |
| **Team Collaboration**     | Harder due to code dependencies          | Easier with service-specific teams       |

---

### **Key Takeaways**

1. **Monolithic Architecture**:

   - Simplifies small projects but struggles with scalability and fault isolation.
   - Redeployment and interdependencies create challenges for large systems.

2. **Microservices Architecture**:

   - Emphasizes modularity, independent scalability, and fault isolation.
   - Enhances development speed by allowing independent deployments and diverse technology stacks.

3. **React as a UI Microservice**:
   - Acts as the face of the application, communicating with backend APIs for data.
   - Provides flexibility, scalability, and seamless user interactions in modern applications.

---

# Connecting to the External World

---

### **Introduction**

- This session explores how a React application communicates with external services and integrates real-time data into the UI.
- **Objective**: Replace mock data with live API data to dynamically populate the app.

---

### **Recap of Current Setup**

#### **Static Mock Data**

- **Previously**:
  - The `Body` component displayed a list of restaurants using hardcoded mock data stored in a local file.
  - Example:
    ```javascript
    import listOfRestaurant from "../utils/mocks/resList";
    ```
- **Limitation**:
  - Mock data is static and doesn’t reflect live updates or changes.

#### **New Objective**

- Fetch restaurant data directly from **Swiggy's API** (or any real-time API) to make the application dynamic and scalable.

---

### **Two Approaches to Fetch and Render Data**

#### **Approach 1: Render After API Call**

- **How It Works**:
  1. Wait for the API response after the page loads.
  2. Render the UI only after the data is fetched.
- **Example**:
  - If an API takes 500ms to respond, the page remains blank during this time.
- **Problems**:
  - Poor **User Experience (UX)**: Users see a blank screen while waiting for the data.
  - High dependency on API response time.

---

#### **Approach 2: Render Skeleton First, Fetch Later**

- **How It Works**:

  1. Immediately render a basic structure or **skeleton UI** when the page loads.
  2. Simultaneously make an API call to fetch data.
  3. Once the data is received, dynamically update the UI.

- **Advantages**:
  1. **Improved User Experience**:
     - Users see a placeholder UI immediately, reducing perceived wait time.
  2. **Modern Design Standards**:
     - Aligns with how modern web apps (e.g., Swiggy, Amazon) handle data loading.
  3. **Efficient Rendering**:
     - React’s optimized rendering handles multiple renders (skeleton + data-based UI) without performance issues.

---

### **Choosing the Better Approach**

- **Winner**: **Render Skeleton First, Fetch Later**
  - **Why?**
    - Offers better UX by eliminating blank screens.
    - Reflects real-world behaviors and expectations.

---

### **Understanding Skeleton UI**

#### **What is a Skeleton UI?**

- A placeholder that represents the structure of the content being loaded.
- Provides a visual clue to users that the data is loading.

#### **Examples**

1. **Empty Cards**:
   - Display blank or outlined cards where restaurant details will appear.
2. **Loading Indicators**:
   - Use spinners or progress bars to indicate ongoing loading.
3. **Animated Placeholders**:
   - Utilize animations like shimmering effects to mimic loading content.

#### **Benefits**

- Reduces perceived load time.
- Keeps users engaged during data fetch operations.

---

### **React and Skeleton Rendering**

- React handles skeleton rendering and subsequent data updates seamlessly.
- Example Workflow:
  1. **Initial Render**: Show skeleton UI immediately.
  2. **Data Fetch**: Make an API call in the background.
  3. **UI Update**: Replace skeletons with live data when the API responds.

---

- In this part, we explore how to dynamically fetch and render data in a React application using the **`useEffect` hook**.
- The goal is to move away from using static mock data and integrate **live data** fetched from APIs into the application.

---

### **Key Concepts**

#### **1. Transition from Mock Data to Live Data**

- **Mock Data**: Static, hardcoded data used during development for testing UI rendering.
- **Live Data**: Real-time data fetched from APIs, reflecting actual backend responses.

#### **2. The Role of `useEffect`**

- React’s **`useEffect` hook** handles side effects, such as API calls.
- Executes **after the component is rendered**, ensuring the UI is loaded first.
- Perfect for fetching and updating live data dynamically.

#### **3. Two Fetching Strategies**

1. **Load and Render**:

   - Fetch data before rendering the UI.
   - Issues: Leads to blank screens or delays during the fetch process.

2. **Render First, Fetch Later**:
   - Render a skeleton UI (placeholders) immediately.
   - Fetch data in the background and update the UI upon completion.
   - **Preferred**: Provides a better user experience.

---

### **Deep Dive into `useEffect`**

#### **Basic Syntax**

```javascript
useEffect(() => {
  // Logic here runs after the component renders
}, [dependencies]);
```

- **Callback Function**: Defines the logic to execute after rendering.
- **Dependency Array**:
  - Empty (`[]`): Callback runs only once, after the initial render.
  - With dependencies: Callback runs whenever a dependency value changes.

#### **Example**

```javascript
useEffect(() => {
  console.log("Component rendered");
}, []);
```

- This logs "Component rendered" only once after the component loads.

---

### **Integrating API Calls with `useEffect`**

#### **Step 1: Write the Fetch Logic**

- Use the **Fetch API** to retrieve data.
- Handle asynchronous operations using **`async/await`**.

Example:

```javascript
const fetchData = async () => {
  const response = await fetch("API_URL");
  const data = await response.json();
  console.log(data);
};
```

---

#### **Step 2: Use `useEffect` for Fetching**

- Trigger the `fetchData` function after the component renders.

Example:

```javascript
useEffect(() => {
  fetchData();
}, []);
```

- Fetches data after the first render and logs it to the console.

---

### **Handling CORS Errors**

#### **What is CORS?**

- **Cross-Origin Resource Sharing (CORS)** is a browser security mechanism.
- Prevents making requests to a different domain (origin) than the one serving the app.

#### **Problem**

- Fetching Swiggy’s API from `localhost` leads to:
  ```
  Access to fetch at 'URL' has been blocked by CORS policy.
  ```

#### **Solutions**

1. **Temporary Fix During Development**:
   - Use a browser extension like "Allow CORS: Access-Control-Allow-Origin".
2. **Long-Term Solution**:
   - Proxy the API through a backend server.
   - Configure CORS headers on the backend to allow cross-origin requests.

---

### **Fetching and Rendering API Data**

#### **Updated Fetch Function**

- Parse and update the data dynamically:

```javascript
const fetchData = async () => {
  const response = await fetch("API_URL");
  const json = await response.json();
  setListOfRestaurant(json?.data?.cards[2]?.data?.data?.cards || []);
};
```

- **Optional Chaining (`?.`)**:
  - Safely access nested properties to prevent errors if any property is `undefined`.

#### **Integrating into `useEffect`**

```javascript
useEffect(() => {
  fetchData();
}, []);
```

---

### **Replacing Mock Data**

- Remove the hardcoded mock data from the application.
- Use the **`useState` hook** to dynamically update the list with fetched data.

Example:

```javascript
const [listOfRestaurant, setListOfRestaurant] = useState([]);
```

- Update the state with fetched data:

```javascript
setListOfRestaurant(apiData);
```

---

### **Complete Implementation**

#### **Code for the `Body` Component**

```javascript
import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
// import listOfRestaurant from "../utils/mocks/resList";

const Body = () => {
  const [resList, setResList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.9615398&lng=79.2961468&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setResList(json?.data?.cards[2]?.data?.data?.cards || []);
  };

  return (
    <>
      <div className="search">Search</div>
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            filteredRes = resList.filter((res) => res.data.avgRating >= 4);
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

### Chapter 6 Part 4 - Exploring The World: Enhancing User Experience with Shimmer UI

---

### **Introduction**

In this section, we address a common user experience issue: the delay between loading data from an API and displaying it on the screen. The solution lies in providing **visual feedback** during this delay through techniques like **loading spinners** and **shimmer UI**.

---

### **Identifying the Problem**

- **Issue**: When the page loads, there is a delay (caused by API fetch time) before restaurant data appears on the screen.
- **Impact**: During this delay, the user sees a blank screen, leading to poor user experience.

---

### **Solutions to Improve User Experience**

#### **1. Loading Spinner**

- **What**: Display a spinner or a "Loading..." message until the data is loaded.
- **How**:
  - Use a conditional check to render the spinner when the data array is empty.
- **Code Example**:

```javascript
if (resList.length === 0) {
  return <h1>Loading...</h1>;
}
```

#### **Drawback**:

- While effective, the abrupt transition from "Loading..." to the final content can be jarring. This is where **Shimmer UI** comes in.

---

### **2. Shimmer UI**

- **What**: A skeleton-like placeholder UI that mimics the structure of the final content.
- **Why**:
  - Provides a smooth and engaging visual experience.
  - Reduces perceived wait time, keeping users engaged.

---

### **Steps to Implement Shimmer UI**

#### **Step 1: Create the Shimmer Component**

- The component generates placeholder cards to simulate the actual UI layout.

```javascript
const Shimmer = () => {
  return (
    <div className="shimmer-container">
      {Array(10) // Display 10 shimmer cards
        .fill("")
        .map((_, index) => (
          <div key={index} className="shimmer-card"></div>
        ))}
    </div>
  );
};

export default Shimmer;
```

#### **Step 2: Style the Shimmer Component**

- Use CSS animations to create the shimmering effect.

```css
.shimmer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 150px;
}

.shimmer-card {
  margin-top: 50px;
  width: 200px;
  height: 300px;
  background-color: #f0f0f0;
  border-radius: 8px;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #f0f0f0;
  }
  100% {
    background-color: #e0e0e0;
  }
}
```

---

### **Integrating Shimmer UI with the Main Component**

#### **Step 1: Conditional Rendering**

- Replace the spinner or "Loading..." message with the `Shimmer` component.
- Use **conditional rendering** to display:
  - Shimmer UI if the data is unavailable.
  - Actual content when the data is loaded.

```javascript
if  (resList.length === 0) {
  return <Shimmer />;
}
```

### Use of ternery oerator in our code base.

#### **Updated Component Code**

```javascript
import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";

const Body = () => {
  const [resList, setResList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.9615398&lng=79.2961468&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setResList(json?.data?.cards[2]?.data?.data?.cards || []);
  };

  return resList.length === 0 ? (
    <Shimmer /> // Display shimmer while waiting for data
  ) : (
    <>
      <div className="search">Search</div>
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

### **Key Concept: Conditional Rendering**

- **Definition**: Dynamically displaying different components or elements based on a condition.
- **Example in Code**:
  ```javascript
  return resList.length === 0 ? <Shimmer /> : <ActualContent />;
  ```

#### **Alternate Syntax: Using `&&`**

```javascript
{
  resList.length === 0 && <Shimmer />;
}
{
  resList.length > 0 && <ActualContent />;
}
```

---

### **Final Flow**

1. **Initial Render**:
   - The `Body` component renders immediately.
   - Since `resList` is empty, the `Shimmer` component is displayed.
2. **API Call**:
   - Data is fetched asynchronously in `useEffect`.
   - Once the API response is received, `resList` is updated using `setResList`.
3. **UI Update**:
   - React detects the state change and re-renders the component.
   - The `Shimmer` is replaced with the fully loaded content (`RestaurantCard` components).

---

### **Benefits of Shimmer UI**

1. **Improved Perception**:
   - Users feel the app is faster because they see a placeholder immediately.
2. **Smooth Transition**:
   - Eliminates the abrupt switch from "Loading..." to content.
3. **Professional Appearance**:
   - Shimmer UIs are widely used in modern applications like Swiggy, Amazon, and Netflix.

---

### **Outcome**

- The application now provides a visually engaging experience even before the data is fully loaded.
- The implementation of **Shimmer UI** enhances user satisfaction and aligns with modern design principles.

---

React applications often require dynamic UI updates. For example, implementing a `Login/Logout` button where the label dynamically changes after a click. This part dives deep into **why state variables are essential** and how they empower React to create dynamic, interactive user interfaces.

---

### **Why Do We Need State Variables?**

#### **Dynamic UI Challenge**
- Using a **local variable** to manage the button label (`authBtn`) fails because React does not track changes to standard JavaScript variables.
- Without a mechanism to trigger UI updates, the application cannot reflect changes in the UI despite updating the variable's value in the code.

#### **Solution: State Variables**
- React’s **state variables** ensure that changes to data trigger a **re-render of the component**, updating the UI dynamically.
- State variables are **reactive**, unlike regular variables.

---

### **Understanding Local Variables vs. State Variables**

#### **Approach 1: Using a Local Variable**
```javascript
const Header = () => {
  let authBtn = "Login"; // Local variable

  return (
    <div className="header">
      <button
        onClick={() => {
          authBtn = "Logout"; // Update variable
          console.log(authBtn); // Logs "Logout"
        }}
      >
        {authBtn} {/* Displays "Login" */}
      </button>
    </div>
  );
};
```

- **What Happens?**
  - Clicking the button updates `authBtn` to `"Logout"`.
  - However, the UI remains unchanged, still showing `"Login"`.
  - React does not track changes to `authBtn` because it’s a regular variable.
  
---

#### **Approach 2: Using a State Variable**
```javascript
import { useState } from "react";

const Header = () => {
  const [authBtn, setAuthBtn] = useState("Login"); // State variable

  return (
    <div className="header">
      <button
        onClick={() => {
          // Toggle between "Login" and "Logout"
          authBtn === "Login" ? setAuthBtn("Logout") : setAuthBtn("Login");
        }}
      >
        {authBtn} {/* Dynamically reflects "Login" or "Logout" */}
      </button>
    </div>
  );
};
```

- **What Happens?**
  - The state variable `authBtn` is initialized with `"Login"`.
  - Clicking the button updates `authBtn` using `setAuthBtn`.
  - React re-renders the component, reflecting the updated state in the UI.

---

### **React’s Superpower: State and Reconciliation**

#### **How React Handles State Changes**
1. **State Update**:
   - When `setAuthBtn` is called, React updates the value of `authBtn`.
2. **Re-render**:
   - React re-renders the `Header` component.
   - React uses its **reconciliation algorithm** to compare the previous virtual DOM with the updated virtual DOM.
3. **Efficient DOM Updates**:
   - Only the parts of the DOM that need updating (the button label) are modified, ensuring optimal performance.

---

### **Code Walkthrough**

#### **Header Component with State**
```javascript
import { useState } from "react";

const Header = () => {
  console.log("Header Called"); // Logs every time the Header component re-renders

  const [authBtn, setAuthBtn] = useState("Login"); // State variable

  return (
    <div className="header">
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
          <li>
            <button
              onClick={() => {
                // Toggle button label
                authBtn === "Login" ? setAuthBtn("Logout") : setAuthBtn("Login");
              }}
            >
              {authBtn} {/* Dynamically updates to "Login" or "Logout" */}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
```

---

### **Key Insights**

1. **State Variables vs. Regular Variables**:
   - Regular variables update in memory but do not trigger a re-render.
   - State variables trigger React’s **render cycle**, updating the UI automatically.

2. **React’s Reconciliation Algorithm**:
   - React compares the previous and current virtual DOM.
   - It efficiently updates only the changed parts of the actual DOM.

3. **Debugging with Logs**:
   - The `console.log("Header Called");` log shows that React re-renders the `Header` component every time the state changes.
   - React optimizes rendering, so only necessary updates are applied to the actual DOM.

---

### **Conceptual Takeaways**

1. **React’s Lifecycle Awareness**:
   - React’s state variables are tied to the component’s lifecycle.
   - Updating a state variable essentially creates a new instance of the variable, ensuring the component reflects the latest state.

2. **Declarative UI**:
   - React’s declarative nature means the UI reflects the application’s state at all times.
   - State variables enable this synchronization.

3. **Interactive Components**:
   - State variables are essential for building dynamic, interactive components like toggles, counters, and forms.

---

### **Best Practices**

1. **Always Use State for Dynamic Data**:
   - For any data that affects the UI, use `useState` or other state management techniques.
2. **Avoid Direct State Modifications**:
   - Always use the provided setter function (e.g., `setAuthBtn`) to update state variables.
3. **Debug Re-Renders**:
   - Use logs strategically to understand how often components re-render and why.

---
