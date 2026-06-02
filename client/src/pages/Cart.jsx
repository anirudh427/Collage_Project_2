import React, {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import "./Cart.css";

function Cart() {

    const [cart,
        setCart] =
        useState([]);

    const navigate =
        useNavigate();

    // LOAD CART
    useEffect(() => {

        const data =

            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

        setCart(data);

    }, []);

    // REMOVE ITEM
    const removeItem =
        (index) => {

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
    const increaseQuantity =
        (index) => {

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
    const decreaseQuantity =
        (index) => {

        let cartData =

            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

        if (
            cartData[index].quantity > 1
        ) {

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

            {/* NAVBAR */}
            <div className="cart-navbar">

                <div className="cart-nav-buttons">

                    <button
                        className="home-btn"

                        onClick={() =>
                            navigate("/")
                        }
                    >
                        Home
                    </button>

                    <button
                        className="products-btn"

                        onClick={() =>
                            navigate("/products")
                        }
                    >
                        Products
                    </button>

                </div>

            </div>

            {/* HERO */}
            <div className="cart-hero">

                <h1>
                    Your Shopping Cart
                </h1>

                <p>
                    Review your selected
                    products before checkout
                </p>

            </div>

            {/* EMPTY CART */}
            {
                cart.length === 0 ? (

                    <div className="empty-cart-box">

                        <h2>
                            Your cart is empty 😢
                        </h2>

                        <button
                            onClick={() =>
                                navigate("/products")
                            }
                        >
                            Shop Now
                        </button>

                    </div>

                ) : (

                    <>

                        {/* PRODUCTS */}
                        <div className="cart-grid">

                            {
                                cart.map(
                                    (item, index) => (

                                    <div
                                        key={index}

                                        className="cart-card"
                                    >

                                        {/* IMAGE */}
                                        <div className="cart-image-box">

                                            <img
                                                src={item.image}

                                                alt={item.name}
                                            />

                                        </div>

                                        {/* DETAILS */}
                                        <div className="cart-details">

                                            <h3>
                                                {item.name}
                                            </h3>

                                            <p>
                                                Price:
                                                ₹{item.price}
                                            </p>

                                            <p>
                                                Quantity:
                                                {" "}
                                                {item.quantity}
                                            </p>

                                            <p className="subtotal">

                                                Subtotal:
                                                ₹

                                                {
                                                    (
                                                        item.price *
                                                        item.quantity
                                                    ).toFixed(2)
                                                }

                                            </p>

                                            {/* BUTTONS */}
                                            <div className="cart-buttons">

                                                <button
                                                    onClick={() =>
                                                        increaseQuantity(index)
                                                    }
                                                >
                                                    +
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        decreaseQuantity(index)
                                                    }
                                                >
                                                    -
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        removeItem(index)
                                                    }
                                                >
                                                    Remove
                                                </button>

                                            </div>

                                        </div>

                                    </div>
                                ))
                            }

                        </div>

                        {/* TOTAL */}
                        <div className="cart-total-box">

                            <h2>

                                Total Amount:
                                ₹

                                {total.toFixed(2)}

                            </h2>

                            <button
                                className="checkout-btn"

                                onClick={() =>
                                    navigate("/checkout")
                                }
                            >
                                Proceed to Checkout
                            </button>

                        </div>

                    </>
                )
            }

        </div>
    );
}

export default Cart;