import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Search from "./Search";
import PropertyDetails from "./Property/[id]";
import Property from "./components/Property/Property";

// import Navbar from "./components/Navbar/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/property/:id",
    element: <PropertyDetails />,
  },
  {
    path: "/property",
    element: <Property />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
