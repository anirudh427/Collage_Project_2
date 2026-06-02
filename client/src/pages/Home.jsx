import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
    const navigate = useNavigate();

    const auth = localStorage.getItem("auth");
    const currentUser = localStorage.getItem("currentuser");

    const parsedUser =
        currentUser && currentUser !== "admin"
            ? JSON.parse(currentUser)
            : currentUser;

    const logout = () => {
        localStorage.removeItem("auth");
        localStorage.removeItem("currentuser");
        alert("Logout successful");
        navigate("/login");
    };

    return (
        <div className="home-page">
            <div className="home-bg-blob blob-top"></div>
            <div className="home-bg-blob blob-bottom"></div>

            <div className="navbar-home">
                <div className="logo-home" onClick={() => navigate("/")}>
                    Bagistry
                </div>

                <div className="nav-buttons-home">
                    <Link to="/products">
                        <button className="products-btn-home">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                            </svg>
                            Products
                        </button>
                    </Link>

                    <Link to="/cart">
                        <button className="cart-btn-home-nav">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            Cart
                        </button>
                    </Link>

                    {parsedUser === "admin" && (
                        <Link to="/admin">
                            <button className="admin-btn-home">
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="9" y1="9" x2="15" y2="15"></line>
                                    <line x1="15" y1="9" x2="9" y2="15"></line>
                                </svg>
                                Admin Panel
                            </button>
                        </Link>
                    )}

                    {!auth && (
                        <>
                            <Link to="/register">
                                <button className="nav-btn">Register</button>
                            </Link>

                            <Link to="/login">
                                <button className="nav-btn header-login-btn">Login</button>
                            </Link>
                        </>
                    )}

                    {auth && parsedUser !== "admin" && (
                        <h4 className="welcome-user">
                            <span className="user-dot"></span>
                            Hi, {parsedUser?.username}
                        </h4>
                    )}

                    {auth && (
                        <button onClick={logout} className="logout-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                            Logout
                        </button>
                    )}
                </div>
            </div>

            <div className="hero-home">
                <div className="hero-content">
                    <h1 className="heading-home">
                        Welcome To <span>Bagistry</span>
                    </h1>

                    <p className="para-home">
                        Discover trending fashion cloth bags, keychains and pouches at Bagistry.
                        We are committed to providing you with the best shopping experience.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/products">
                            <button className="shop-btn-home">Shop Now</button>
                        </Link>

                        <Link to="/cart">
                            <button className="cart-btn-home">View Cart</button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* FEATURES */}
            <div className="features-section">
                <div className="feature-card">
                    <div className="feature-emoji">🚚</div>
                    <h3>Fast Delivery</h3>
                    <p>Get your products delivered quickly and safely to your doorstep.</p>
                </div>

                <div className="feature-card">
                    <div className="feature-emoji">💳</div>
                    <h3>Secure Payment</h3>
                    <p>Safe, encrypted, and highly secure payment experience every time.</p>
                </div>

                <div className="feature-card">
                    <div className="feature-emoji">⭐</div>
                    <h3>Premium Products</h3>
                    <p>High quality materials, crafted designs with affordable pricing.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;