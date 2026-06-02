import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import "./Login.css";

function Login() {
    const [data, setData] = useState({
        username: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault(); 

        const { username, password } = data;
        const ADMIN_USERNAME = "the_howling_online_store";
        const ADMIN_PASSWORD = "myOnlinestore@2006";

        if (!username || !password) {
            alert("Please fill in all fields");
            return;
        }

        if (username.length < 4) {
            alert("Username must contain a minimum of 4 characters");
            return;
        }

        if (password.length < 6) {
            alert("Password must contain a minimum of 6 characters");
            return;
        }

        setIsLoading(true);

        try {
            if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
                localStorage.setItem("auth", "true");
                localStorage.setItem("currentuser", "admin");
                alert("Admin login successful!");
                navigate("/admin");
                return;
            }

            const { data: users, error } = await supabase
                .from("users")
                .select("*")
                .eq("username", username)
                .eq("password", password); 

            if (error) throw error;

            if (users && users.length > 0) {
                localStorage.setItem("auth", "true");
                localStorage.setItem("currentuser", JSON.stringify(users[0]));
                alert("Login successful!");
                navigate("/");
            } else {
                alert("Invalid username or password");
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("Login Failed. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <h1 className="login-heading">Welcome Back</h1>
                <p className="login-subheading">Please sign in to your account</p>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            value={data.username}
                            onChange={handleChange}
                            className="login-input"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={data.password}
                            onChange={handleChange}
                            className="login-input"
                            disabled={isLoading}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="login-btn" 
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing in..." : "Login"}
                    </button>
                </form>

                <div className="login-footer">
                    <p className="register-text">
                        Don't have an account?{" "}
                        <Link to="/register" className="register-link">
                            Register
                        </Link>
                    </p>

                    <Link to="/" className="home-link">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;