import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:5001/api/auth/login", {
                username,
                password,
            });

            // Save the JWT token and userId in localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);

            setIsLoggedIn(true); // Update the state to indicate the user is logged in
            toast.success("Login successful!");
            navigate("/app"); // Redirect to the inventory page
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            toast.error("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleLogin} className="card p-4 shadow">
                <h2 className="mb-4">Login</h2>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Log In
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
