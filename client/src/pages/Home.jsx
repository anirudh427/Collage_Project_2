import React from "react";

import "./Home.css";

import {
    Link,
    useNavigate,
} from "react-router-dom";

function Home() {

    const navigate =
        useNavigate();

    // AUTH
    const auth =
        localStorage.getItem("auth");

    const currentUser =
        localStorage.getItem(
            "currentuser"
        );

    // FIX ADMIN JSON ERROR
    const parsedUser =

        currentUser &&

        currentUser !== "admin"

            ? JSON.parse(currentUser)

            : currentUser;

    // LOGOUT
    const logout = () => {

        localStorage.removeItem(
            "auth"
        );

        localStorage.removeItem(
            "currentuser"
        );

        alert(
            "Logout successful"
        );

        navigate("/login");
    };

    return (

        <div className="home-page">

            {/* NAVBAR */}
            <div className="navbar-home">

                <div className="nav-buttons-home">

                    <Link to="/products">

                        <button className="products-btn-home">
                            Products
                        </button>

                    </Link>

                    <Link to="/cart">

                        <button className="cart-btn-home-nav">
                            Cart
                        </button>

                    </Link>

                    {/* ADMIN BUTTON */}
                    {
                        parsedUser === "admin" && (

                            <Link to="/admin">

                                <button className="admin-btn-home">
                                    Admin
                                </button>

                            </Link>
                        )
                    }

                    {/* LOGIN / REGISTER */}
                    {
                        !auth && (

                            <>

                                <Link to="/register">

                                    <button className="nav-btn">
                                        Register
                                    </button>

                                </Link>

                                <Link to="/login">

                                    <button className="nav-btn">
                                        Login
                                    </button>

                                </Link>

                            </>
                        )
                    }

                    {/* USERNAME */}
                    {
                        auth &&

                        parsedUser !== "admin"

                        && (

                            <h4 className="welcome-user">

                                Hi,
                                {
                                    parsedUser?.username
                                }

                            </h4>
                        )
                    }

                    {/* LOGOUT */}
                    {
                        auth && (

                            <button
                                onClick={logout}

                                className="logout-btn"
                            >
                                Logout
                            </button>
                        )
                    }

                </div>

            </div>

            {/* HERO SECTION */}
            <div className="hero-home">

                <div className="hero-content">

                    <h1 className="heading-home">

                        Welcome To
                        Bagistry 

                    </h1>

                    <p className="para-home">

                        Discover trending
                        fashion cloth bags,
                        keychains and
                        pouches at Bagistry.
                        We are committed to
                        providing you
                        with the best
                        shopping experience.

                    </p>

                    <div className="hero-buttons">

                        <Link to="/products">

                            <button className="shop-btn-home">
                                Shop Now
                            </button>

                        </Link>

                        <Link to="/cart">

                            <button className="cart-btn-home">
                                View Cart
                            </button>

                        </Link>

                    </div>

                </div>

            </div>

            {/* FEATURES */}
            <div className="features-section">

                <div className="feature-card">

                    <h2>🚚</h2>

                    <h3>
                        Fast Delivery
                    </h3>

                    <p>
                        Get your products
                        delivered quickly
                        and safely.
                    </p>

                </div>

                <div className="feature-card">

                    <h2>💳</h2>

                    <h3>
                        Secure Payment
                    </h3>

                    <p>
                        Safe and secure
                        payment experience.
                    </p>

                </div>

                <div className="feature-card">

                    <h2>⭐</h2>

                    <h3>
                        Premium Products
                    </h3>

                    <p>
                        High quality products
                        with affordable pricing.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Home;