import React, {
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import {
    supabase,
} from "../supabase";

import emailjs from "@emailjs/browser";

import "./Checkout.css";

function Checkout() {

    const navigate =
        useNavigate();

    // ADDRESS
    const [fullname,
        setFullname] =
        useState("");

    const [phone,
        setPhone] =
        useState("");

    const [address,
        setAddress] =
        useState("");

    const [city,
        setCity] =
        useState("");

    const [pincode,
        setPincode] =
        useState("");

    // FEEDBACK
    const [feedback,
        setFeedback] =
        useState("");

    // LOADING
    const [loading,
        setLoading] =
        useState(false);

    // CART
    const cart =

        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    // TOTAL
    const total =

        cart.reduce(

            (sum, item) =>

                sum +

                Number(item.price) *

                (item.quantity || 1),

            0
        );

    // PRODUCT DETAILS
    const productDetails =

        cart.map((item, index) =>

            `${index + 1}. ${item.name}

Quantity: ${item.quantity}

Price: ₹${item.price}

Subtotal: ₹${
    item.price * item.quantity
}`
        ).join("\n\n");

    // PAYMENT
    const handlePayment =
        () => {

        // EMPTY VALIDATION
        if (
            !fullname ||
            !phone ||
            !address ||
            !city ||
            !pincode
        ) {

            alert(
                "Please fill all fields"
            );

            return;
        }

        // PHONE VALIDATION
        const phonePattern =
            /^[0-9]{10}$/;

        if (
            !phonePattern.test(phone)
        ) {

            alert(
                "Enter valid 10 digit phone number"
            );

            return;
        }

        // PINCODE VALIDATION
        const pincodePattern =
            /^[0-9]{6}$/;

        if (
            !pincodePattern.test(pincode)
        ) {

            alert(
                "Enter valid pincode"
            );

            return;
        }

        // EMPTY CART
        if (
            cart.length === 0
        ) {

            alert(
                "Cart is empty"
            );

            return;
        }

        // LOADING
        setLoading(true);

        // RAZORPAY
        const options = {

            key:
            "rzp_test_SqYuuFhMsBPGaG",

            amount:
            total * 100,

            currency:
            "INR",

            name:
            "Ecomm Store",

            description:
            "Secure Payment",

            image:
            "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",

            handler:
            async function (
                response
            ) {

                // SAVE ORDER
                const orders =

                    JSON.parse(
                        localStorage.getItem(
                            "orders"
                        )
                    ) || [];

                const newOrder = {

                    id:
                    Date.now(),

                    razorpayPaymentId:

                    response
                    .razorpay_payment_id,

                    products:
                    cart,

                    total:
                    total,

                    paymentMethod:
                    "Razorpay",

                    address: {

                        fullname,
                        phone,
                        address,
                        city,
                        pincode,
                    },

                    feedback,

                    date:
                    new Date()
                    .toLocaleString(),
                };

                orders.push(
                    newOrder
                );

                localStorage.setItem(

                    "orders",

                    JSON.stringify(
                        orders
                    )
                );

                // SAVE FEEDBACK
                if (feedback) {

                    await supabase

                        .from(
                            "feedbacks"
                        )

                        .insert([
                            {
                                fullname,
                                feedback,
                            },
                        ]);
                }

                // SEND EMAIL
                emailjs.send(

                    "service_m0mv3wo",

                    "template_5b0b0z9",

                    {

                        fullname,

                        phone,

                        address,

                        city,

                        pincode,

                        total,

                        payment:
                        "Razorpay",

                        products:
                        productDetails,
                    },

                    "Jj7V5beD1EFI3sSpW"
                )

                .then(() => {

                    console.log(
                        "Email Sent Successfully"
                    );

                })

                .catch((error) => {

                    console.log(
                        error
                    );
                });

                // CLEAR CART
                localStorage.removeItem(
                    "cart"
                );

                setLoading(false);

                alert(
                    `Payment Successful 🔥
Payment ID:
${response.razorpay_payment_id}`
                );

                navigate(
                    "/products"
                );
            },

            prefill: {

                name:
                fullname,

                contact:
                phone,
            },

            notes: {

                address:
                address,
            },

            theme: {

                color:
                "#000000",
            },
        };

        // OPEN PAYMENT
        const razorpay =

            new window.Razorpay(
                options
            );

        razorpay.open();

        // PAYMENT FAILED
        razorpay.on(

            "payment.failed",

            function () {

                setLoading(false);

                alert(
                    "Payment Failed ❌"
                );
            }
        );
    };

    return (

        <div className="checkout-page">

            <div className="checkout-box">

                <h1>
                    Checkout
                </h1>

                <h2>
                    Total:
                    ₹{total.toFixed(2)}
                </h2>

                {/* ADDRESS */}
                <div className="checkout-section">

                    <h3>
                        Delivery Address
                    </h3>

                    <input
                        type="text"

                        placeholder="Full Name"

                        value={fullname}

                        onChange={(e) =>
                            setFullname(
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="text"

                        placeholder="Phone Number"

                        value={phone}

                        onChange={(e) =>
                            setPhone(
                                e.target.value
                            )
                        }
                    />

                    <textarea
                        placeholder="Full Address"

                        value={address}

                        onChange={(e) =>
                            setAddress(
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="text"

                        placeholder="City"

                        value={city}

                        onChange={(e) =>
                            setCity(
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="text"

                        placeholder="Pincode"

                        value={pincode}

                        onChange={(e) =>
                            setPincode(
                                e.target.value
                            )
                        }
                    />

                </div>

                {/* FEEDBACK */}
                <div className="checkout-section">

                    <h3>
                        Feedback
                    </h3>

                    <textarea
                        placeholder="Enter your feedback"

                        value={feedback}

                        onChange={(e) =>
                            setFeedback(
                                e.target.value
                            )
                        }
                    />

                </div>

                {/* BUTTON */}
                <button
                    className="place-order-btn"

                    onClick={handlePayment}

                    disabled={loading}
                >

                    {
                        loading

                        ? "Processing Payment..."

                        : "Place Order"
                    }

                </button>

                {/* LOADER */}
                {
                    loading && (

                        <div className="loader-box">

                            <div className="payment-spinner">

                            </div>

                            <h3>
                                Processing Secure Payment...
                            </h3>

                            <p>
                                Please wait...
                            </p>

                        </div>
                    )
                }

            </div>

        </div>
    );
}

export default Checkout;