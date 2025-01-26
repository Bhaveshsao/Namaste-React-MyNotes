import React, { lazy, Suspense} from "react";
import ReactDOM from "react-dom/client";
import AppLayout from "./components/AppLayout";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Chunking
//Code Splitting
//Dynamic Bundling
//Lazy loading
//On Demand loading
//Dynamic import

const Grocery = lazy(()=> import("./components/Grocery"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "restaurant/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/grocery",
        element: <Suspense fallback={<h1>Loading....</h1>}><Grocery /></Suspense> ,
      },
    ]
  },
])


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
