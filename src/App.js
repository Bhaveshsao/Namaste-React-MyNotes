import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


// const AppRouter = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<AppLayout />} />
//         <Route path="/about" element={<About />}/>
//         <Route path="/contact" element={<Contact />} />
//         <Route path="*" element={<Error />} />  {/* Catch-all for invalid routes */}
//       </Routes>
//     </BrowserRouter>
//   );
// };

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
])


const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<AppRouter />);
root.render(<RouterProvider router={appRouter} />);
