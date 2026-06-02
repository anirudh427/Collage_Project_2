import React, {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import "./Cart.css";

function Cart() {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    // LOAD CART
    useEffect(() => {
        const data =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];
        setCart(data);
    }, []);

    // REMOVE ITEM
    const removeItem = (index) => {
        let cartData =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];
        cartData.splice(index, 1);
        localStorage.setItem(
            "cart",
            JSON.stringify(cartData)
        );
        setCart([...cartData]);
    };

    // INCREASE QUANTITY
    const increaseQuantity = (index) => {
        let cartData =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];
        cartData[index].quantity += 1;
        localStorage.setItem(
            "cart",
            JSON.stringify(cartData)
        );
        setCart([...cartData]);
    };

    // DECREASE QUANTITY
    const decreaseQuantity = (index) => {
        let cartData =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];
        if (cartData[index].quantity > 1) {
            cartData[index].quantity -= 1;
            localStorage.setItem(
                "cart",
                JSON.stringify(cartData)
            );
            setCart([...cartData]);
        } else {
            removeItem(index);
        }
    };

    // TOTAL
    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                Number(item.price) *
                item.quantity,
            0
        );

    return (
        <div className="cart-page">
            {/* Ambient Background Glows */}
            <div className="cart-bg-blob blob-top"></div>
            <div className="cart-bg-blob blob-bottom"></div>

            {/* NAVBAR */}
            <div className="cart-navbar">
                <div className="cart-logo" onClick={() => navigate("/")}>
                    <span>The</span> Howling
                </div>
                <div className="cart-nav-buttons">
                    <button
                        className="home-btn"
                        onClick={() => navigate("/")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-btn-icon">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        Home
                    </button>
                    <button
                        className="products-btn"
                        onClick={() => navigate("/products")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-btn-icon">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                            <line x1="12" y1="22.08" x2="12" y2="12"></line>
                        </svg>
                        Products
                    </button>
                </div>
            </div>

            {/* HERO */}
            <div className="cart-hero">
                <div className="hero-content">
                    <h1>Your Shopping Cart</h1>
                    <p>Review your selected products before checkout</p>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="cart-main-container">
                {cart.length === 0 ? (
                    <div className="empty-cart-box">
                        <div className="empty-cart-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                        </div>
                        <h2>Your cart is empty</h2>
                        <p>Add items to your cart to see them here.</p>
                        <button
                            className="shop-now-btn"
                            onClick={() => navigate("/products")}
                        >
                            Shop Now
                        </button>
                    </div>
                ) : (
                    <div className="cart-layout">
                        {/* PRODUCTS GRID */}
                        <div className="cart-grid">
                            {cart.map((item, index) => (
                                <div key={index} className="cart-card">
                                    {/* IMAGE */}
                                    <div className="cart-image-box">
                                        <img src={item.image} alt={item.name} />
                                    </div>

                                    {/* DETAILS */}
                                    <div className="cart-details">
                                        <h3>{item.name}</h3>
                                        <div className="details-row">
                                            <span className="detail-label">Price</span>
                                            <span className="detail-value">₹{Number(item.price).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                        </div>
                                        <div className="details-row">
                                            <span className="detail-label">Quantity</span>
                                            <span className="detail-value qty-badge">{item.quantity}</span>
                                        </div>
                                        <div className="details-row total-row">
                                            <span className="detail-label">Subtotal</span>
                                            <span className="subtotal">
                                                ₹{(item.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </span>
                                        </div>

                                        {/* BUTTONS */}
                                        <div className="cart-buttons">
                                            <button
                                                className="qty-btn"
                                                onClick={() => decreaseQuantity(index)}
                                                title="Decrease quantity"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                </svg>
                                            </button>
                                            <button
                                                className="qty-btn"
                                                onClick={() => increaseQuantity(index)}
                                                title="Increase quantity"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                </svg>
                                            </button>
                                            <button
                                                className="remove-btn"
                                                onClick={() => removeItem(index)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                </svg>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* TOTAL SUMMARY CARD */}
                        <div className="cart-summary-wrapper">
                            <div className="cart-total-box">
                                <h3 className="summary-title">Order Summary</h3>
                                <div className="summary-details">
                                    <div className="summary-row">
                                        <span>Subtotal</span>
                                        <span>₹{total.toFixed(2)}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Shipping</span>
                                        <span className="free-shipping">FREE</span>
                                    </div>
                                    <div className="summary-row divider"></div>
                                    <div className="summary-row grand-total">
                                        <span>Total Amount</span>
                                        <span>₹{total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button
                                    className="checkout-btn"
                                    onClick={() => navigate("/checkout")}
                                >
                                    Proceed to Checkout
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="checkout-icon">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;