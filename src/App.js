import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Inventory from "./components/Inventory"; // Ensure this is imported
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        window.location.href = "/login";
    };

    return (
        <Router>
            <ToastContainer />
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Navigate to="/register" />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/app" element={<Inventory />} />

            </Routes>
        </Router>
    );
}

export default App;
