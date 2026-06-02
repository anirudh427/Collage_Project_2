import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import emailjs from "@emailjs/browser";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const [feedback, setFeedback] = useState("");

  const [loading, setLoading] = useState(false);

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );

  const productDetails = cart
    .map(
      (item, index) =>
        `${index + 1}. ${item.name}\nQuantity: ${item.quantity}\nPrice: ₹${item.price}\nSubtotal: ₹${item.price * item.quantity}`
    )
    .join("\n\n");

  const handlePayment = () => {
    if (!fullname || !phone || !address || !city || !pincode) {
      alert("Please fill all fields");
      return;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      alert("Enter valid 10 digit phone number");
      return;
    }

    const pincodePattern = /^[0-9]{6}$/;
    if (!pincodePattern.test(pincode)) {
      alert("Enter valid pincode");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    setLoading(true);

    const options = {
      key: "rzp_test_SqYuuFhMsBPGaG",
      amount: total * 100,
      currency: "INR",
      name: "Ecomm Store",
      description: "Secure Payment",
      image: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
      handler: async function (response) {
        // Save new order details locally
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        const newOrder = {
          id: Date.now(),
          razorpayPaymentId: response.razorpay_payment_id,
          products: cart,
          total: total,
          paymentMethod: "Razorpay",
          address: {
            fullname,
            phone,
            address,
            city,
            pincode,
          },
          feedback,
          date: new Date().toLocaleString(),
        };

        orders.push(newOrder);
        localStorage.setItem("orders", JSON.stringify(orders));

        if (feedback) {
          await supabase.from("feedbacks").insert([
            {
              fullname,
              feedback,
            },
          ]);
        }

        emailjs
          .send(
            "service_m0mv3wo",
            "template_5b0b0z9",
            {
              fullname,
              phone,
              address,
              city,
              pincode,
              total,
              payment: "Razorpay",
              products: productDetails,
            },
            "Jj7V5beD1EFI3sSpW"
          )
          .then(() => {
            console.log("Email Sent Successfully");
          })
          .catch((error) => {
            console.error("Email send failed:", error);
          });

        localStorage.removeItem("cart");
        setLoading(false);

        alert(`Payment Successful\nPayment ID:\n${response.razorpay_payment_id}`);
        navigate("/products");
      },
      prefill: {
        name: fullname,
        contact: phone,
      },
      notes: {
        address: address,
      },
      theme: {
        color: "#000000",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

    razorpay.on("payment.failed", function () {
      setLoading(false);
      alert("Payment Failed ");
    });
  };

  return (
    <div className="checkout-page">
      <div className="checkout-bg-blob blob-1"></div>
      <div className="checkout-bg-blob blob-2"></div>
      <div className="checkout-bg-blob blob-3"></div>

      <div className="checkout-box">
        <h1>Checkout</h1>
        <h2>
          Total Amount: <span>₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
        </h2>

        <div className="checkout-section">
          <h3>Delivery Details</h3>
          <div className="checkout-input-group">
            <input
              type="text"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          <div className="checkout-input-group">
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="checkout-input-group">
            <textarea
              placeholder="Full Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="checkout-input-grid">
            <div className="checkout-input-group">
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="checkout-input-group">
              <input
                type="text"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="checkout-section">
          <h3>Order Feedback</h3>
          <div className="checkout-input-group">
            <textarea
              placeholder="Tell us about your experience..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
        </div>

        {/* BUTTON */}
        <button
          className="place-order-btn"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? (
            <div className="checkout-btn-content">
              <div className="checkout-btn-spinner"></div>
              Processing Payment...
            </div>
          ) : (
            <>
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
                className="order-btn-icon"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Place Secure Order
            </>
          )}
        </button>

        {loading && (
          <div className="loader-box">
            <div className="payment-spinner"></div>
            <h3>Processing Secure Transaction...</h3>
            <p>Please do not close this window or refresh the page.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;