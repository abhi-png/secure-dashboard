import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import  components
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import HomePage from "./components/pages/HomePage";

// Auth Middleware
import { AuthorizeUser } from "./utils/middleware/auth";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/home",
        element: <AuthorizeUser><HomePage /></AuthorizeUser>
    },
]);

function App() {
    return (
        <main>
            <RouterProvider router={router}></RouterProvider>
        </main>
    );
}

export default App;
