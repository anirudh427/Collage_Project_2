import React, {
    useState,
} from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import {
    supabase,
} from "../supabase";

import "./Register.css";

function Register() {
    const [user, setUser] = useState({
        fullname: "",
        username: "",
        email: "",
        phonenumber: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // HANDLE INPUT
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    // REGISTER
    const handleSubmit = async () => {
        if (
            !user.fullname ||
            !user.username ||
            !user.email ||
            !user.phonenumber ||
            !user.password
        ) {
            alert("All fields are required");
            return;
        }

        if (user.username.length < 4) {
            alert("Username must contain minimum 4 characters");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(user.email)) {
            alert("Enter valid email");
            return;
        }

        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(user.phonenumber)) {
            alert("Phone number must be 10 digits");
            return;
        }

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordPattern.test(user.password)) {
            alert("Password must contain minimum 6 characters, one uppercase, one lowercase and one number");
            return;
        }

        setIsLoading(true);

        try {
            const {
                data: existingUsers,
                error: fetchError,
            } = await supabase
                .from("users")
                .select("*")
                .eq("email", user.email);

            if (fetchError) {
                console.log(fetchError);
                alert("Something went wrong");
                return;
            }

            if (existingUsers.length > 0) {
                alert("User already registered");
                return;
            }

            // SAVE USER
            const { error } = await supabase
                .from("users")
                .insert([
                    {
                        username: user.username,
                        name: user.fullname,
                        email: user.email,
                        number: user.phonenumber,
                        password: user.password,
                    },
                ]);

            if (error) {
                console.log(error);
                alert("Registration Failed");
            } else {
                alert("Registration Successful ");
                navigate("/login");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred during registration");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-page">
            {/* Ambient Background Blobs */}
            <div className="reg-bg-blob blob-1"></div>
            <div className="reg-bg-blob blob-2"></div>
            <div className="reg-bg-blob blob-3"></div>

            <div className="register-box">
                <h1 className="register-heading">
                    Create <span>Account</span>
                </h1>
                <p className="register-subheading">Join us to start shopping</p>

                <div className="register-form">
                    <div className="input-group">
                        <label htmlFor="fullname">Full Name</label>
                        <div className="input-wrapper">
                            <span className="input-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </span>
                            <input
                                id="fullname"
                                type="text"
                                name="fullname"
                                placeholder="Enter your full name"
                                value={user.fullname}
                                onChange={handleChange}
                                className="register-input"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <div className="input-wrapper">
                            <span className="input-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="4"></circle>
                                    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
                                </svg>
                            </span>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                placeholder="Enter username"
                                value={user.username}
                                onChange={handleChange}
                                className="register-input"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-wrapper">
                            <span className="input-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </span>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={user.email}
                                onChange={handleChange}
                                className="register-input"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="phonenumber">Phone Number</label>
                        <div className="input-wrapper">
                            <span className="input-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 9.92v3z"></path>
                                </svg>
                            </span>
                            <input
                                id="phonenumber"
                                type="text"
                                name="phonenumber"
                                placeholder="Enter phone number"
                                value={user.phonenumber}
                                onChange={handleChange}
                                className="register-input"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <span className="input-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </span>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                value={user.password}
                                onChange={handleChange}
                                className="register-input"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className={`register-btn ${isLoading ? "loading" : ""}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="btn-content">
                                <span className="spinner"></span>
                                Creating account...
                            </span>
                        ) : (
                            <span className="btn-content">Register</span>
                        )}
                    </button>
                </div>

                <p className="login-text">
                    Already have an account?{" "}
                    <Link to="/login" className="login-link">
                        Login
                    </Link>
                </p>

                <Link to="/" className="home-link-register">
                    <span className="arrow">←</span> Back to Home
                </Link>
            </div>
        </div>
    );
}

export default Register;