import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const removeItem = (index) => {
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    cartData.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartData));
    setCart([...cartData]);
  };

  const increaseQuantity = (index) => {
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    cartData[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cartData));
    setCart([...cartData]);
  };

  const decreaseQuantity = (index) => {
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartData[index].quantity > 1) {
      cartData[index].quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(cartData));
      setCart([...cartData]);
    } else {
      removeItem(index);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <div className="cart-bg-blob blob-1"></div>
      <div className="cart-bg-blob blob-2"></div>
      <div className="cart-bg-blob blob-3"></div>

      {/* NAVBAR */}
      <div className="cart-navbar">
        <div className="cart-logo" onClick={() => navigate("/")}>
          <span>The</span> Howling
        </div>
        <div className="cart-nav-buttons">
          <button className="home-btn" onClick={() => navigate("/")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="nav-btn-icon"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Home
          </button>

          <button className="products-btn" onClick={() => navigate("/products")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="nav-btn-icon"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
            Products
          </button>
        </div>
      </div>

      <div className="cart-hero">
        <h1>
          Your <span>Shopping Cart</span>
        </h1>
        <p>Review your selected products before checkout</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart-box">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="empty-cart-icon"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h2>Your cart is currently empty</h2>
          <p>Explore our premium collections and add items to your cart</p>
          <button onClick={() => navigate("/products")}>Shop Now</button>
        </div>
      ) : (
        <>
          <div className="cart-grid">
            {cart.map((item, index) => (
              <div key={index} className="cart-card">
                <div className="cart-image-box">
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <div className="no-image-fallback-cart">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                    </div>
                  )}
                </div>

                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <div className="cart-details-info">
                    <p>
                      <span>Price:</span> ₹{Number(item.price).toLocaleString("en-IN")}
                    </p>
                    <p>
                      <span>Quantity:</span> {item.quantity}
                    </p>
                    <p className="subtotal">
                      <span>Subtotal:</span> ₹{(item.price * item.quantity).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>

                  <div className="cart-buttons">
                    <button className="qty-btn" onClick={() => increaseQuantity(index)}>
                      +
                    </button>
                    <button className="qty-btn" onClick={() => decreaseQuantity(index)}>
                      -
                    </button>
                    <button className="remove-btn" onClick={() => removeItem(index)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total-box">
            <div className="cart-total-card">
              <h2>
                Total Amount: <span>₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </h2>
              <button className="checkout-btn" onClick={() => navigate("/checkout")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="checkout-btn-icon"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;