# Namaste React Project

## 📌 Overview
Namaste React is a restaurant listing and menu browsing web application built using **React**, **React Router**, and **custom hooks**. It fetches restaurant data from the Swiggy API and provides an optimized user experience with features like **lazy loading, shimmer UI, online status detection, and dynamic routing**.

---

## 🚀 Features

### ✅ **Core Features**
- **Home Page**: Displays a list of restaurants fetched dynamically from Swiggy API.
- **Restaurant Details Page**: Shows the menu and details of a selected restaurant.
- **Search Functionality**: Users can search restaurants by name.
- **Top Rated Filter**: Filter restaurants based on ratings.
- **Shimmer Effect**: Displays a loading skeleton while fetching data.
- **Lazy Loading**: The Grocery page is loaded dynamically using `React.lazy()` and `Suspense`.
- **Error Handling**: Uses `useRouteError()` for better error messages.
- **Custom Hooks**:
  - `useOnlineStatus.js`: Checks if the user is online or offline.
  - `useRestaurantMenu.js`: Fetches restaurant menu details dynamically.
- **Optimized State Management** using `useState()` and `useEffect()`.

---

## 🛠 Tech Stack

| Technology      | Purpose                           |
|---------------|---------------------------------|
| React         | Core Frontend Framework         |
| React Router  | Navigation & Dynamic Routing   |
| Swiggy API    | Fetching Restaurant Data       |
| Custom Hooks  | State & Effect Management     |


---

## 📂 Project Structure
```
Namaste-React/
│── src/
│   ├── components/            # All React Components
│   │   ├── About.js           # About Page Component
│   │   ├── AppLayout.js       # Main Layout Component
│   │   ├── Body.js            # Home Page Component
│   │   ├── Contact.js         # Contact Page Component
│   │   ├── Error.js           # Error Handling Component
│   │   ├── Grocery.js         # Grocery (Lazy Loaded) Component
│   │   ├── Header.js          # Navigation Header
│   │   ├── RestaurantCard.js  # Restaurant Listing Component
│   │   ├── RestaurantMenu.js  # Restaurant Menu Component
│   │   ├── Shimmer.js         # Loading Skeleton Component
│   │   ├── User.js            # User Component (Functional)
│   │   ├── UserClass.js       # User Component (Class-Based)
│   ├── utils/                 # Utility Files
│   │   ├── constants.js       # API URLs & Configuration
│   │   ├── useOnlineStatus.js # Custom Hook for Online Status
│   │   ├── useRestaurantMenu.js # Custom Hook for Menu Fetching
│── public/
│   ├── index.html             # Main HTML File
│── src/
│   ├── index.js               # React Root File
│   ├── App.js                 # Main Application Entry
│── package.json               # Dependencies & Scripts
│── README.md                  # Documentation (You are here)
```

---

## ⚙️ Installation & Setup

### 1️⃣ Install Dependencies
```sh
npm install
```

### 2️⃣ Start the Development Server
```sh
npm start
```
The application will now be accessible at `http://localhost:3000/`.

---

## 🔄 API Endpoints Used
- **Fetch Restaurants List:**
  ```sh
  https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.9615398&lng=79.2961468&page_type=DESKTOP_WEB_LISTING
  ```
- **Fetch Restaurant Menu:**
  ```sh
  https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&restaurantId=<resId>
  ```
- **Image CDN:**
  ```sh
  https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/
  ```

---

## 🛠 Optimizations & Enhancements
- **Event Listener Cleanup** in `useOnlineStatus.js` to prevent memory leaks.
- **Error Handling in API Calls** to avoid crashes if the Swiggy API fails.
- **Lazy Loading Implementation** for better performance.
- **Custom Hooks for Code Reusability.**
- **Environment Variables for API URLs** instead of hardcoding them.

---

## 👨‍💻 Contributing
Want to improve this project? Contributions are welcome! Feel free to:
- Report bugs 🐞
- Suggest improvements 💡
- Submit a pull request 🚀

### Steps to Contribute:
1. Fork the repository
2. Create a new branch (`feature-branch`)
3. Make your changes and commit them
4. Push to your fork and submit a Pull Request




