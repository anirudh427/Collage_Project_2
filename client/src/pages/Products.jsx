import React, {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import {
    supabase,
} from "../supabase";

import "./Products.css";

function Products() {

    const [products,
        setProducts] =
        useState([]);

    const [search,
        setSearch] =
        useState("");

    const navigate =
        useNavigate();

    // FETCH PRODUCTS
    useEffect(() => {

        fetchProducts();

    }, []);

    async function fetchProducts() {

        const {
            data,
            error,
        } = await supabase

            .from("products")

            .select("*");

        if (error) {

            console.log(error);

        } else {

            setProducts(data);
        }
    }

    // ADD TO CART
    const addToCart =
        (item) => {

        let cart =

            JSON.parse(
                localStorage.getItem(
                    "cart"
                )
            ) || [];

        const index =
            cart.findIndex(

                (i) =>
                    i.id === item.id
            );

        // PRODUCT EXISTS
        if (index !== -1) {

            cart[index].quantity += 1;

        } else {

            // NEW PRODUCT
            cart.push({

                ...item,

                quantity: 1,
            });
        }

        localStorage.setItem(

            "cart",

            JSON.stringify(cart)
        );

        alert(
            "Product Added To Cart 🔥"
        );
    };

    // SEARCH FILTER
    const filteredProducts =
        products.filter((item) =>

            item.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (

        <div className="products-page">

            {/* NAVBAR */}
            <div className="products-navbar">

                <div className="nav-buttons">

                    <button
                        className="home-btn"

                        onClick={() =>
                            navigate("/")
                        }
                    >
                        Home
                    </button>

                    <button
                        className="go-cart-btn"

                        onClick={() =>
                            navigate("/cart")
                        }
                    >
                        Go to Cart
                    </button>

                </div>

            </div>

            {/* HERO */}
            <div className="products-hero">

                <h1>
                    Explore Amazing Products
                </h1>

                <p>
                    Shop stylish products
                    with best quality
                    and premium experience
                </p>

            </div>

            {/* SEARCH */}
            <div className="search-box-products">

                <input
                    type="text"

                    placeholder="Search products..."

                    value={search}

                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }

                    className="search-input-products"
                />

            </div>

            {/* PRODUCTS */}
            <div className="products-container">

                {
                    filteredProducts.map(
                        (item) => (

                        <div
                            className="product-card"

                            key={item.id}
                        >

                            {/* IMAGE */}
                            <div className="image-box">

                                {
                                    item.image ? (

                                        <img
                                            src={item.image}

                                            alt={item.name}

                                            className="product-image"
                                        />

                                    ) : (

                                        <p>
                                            No Image
                                        </p>
                                    )
                                }

                            </div>

                            {/* DETAILS */}
                            <div className="product-details">

                                <h3>
                                    {item.name}
                                </h3>

                                <p className="price">
                                    ₹{item.price}
                                </p>

                                <button
                                    onClick={() =>
                                        addToCart(item)
                                    }
                                >
                                    Add to Cart
                                </button>

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}

export default Products;