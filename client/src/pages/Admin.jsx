import React, {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { supabase } from "../supabase";

import "./Admin.css";


function Admin() {

  const [products, setProducts] =
    useState([]);

  const [name, setName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [imageFile, setImageFile] =
    useState(null);

  const [editingId, setEditingId] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const navigate =
    useNavigate();

  // LOAD PRODUCTS
  useEffect(() => {

    fetchProducts();

  }, []);

  // FETCH PRODUCTS
  async function fetchProducts() {

    const { data, error } =
      await supabase
        .from("products")
        .select("*");

    if (error) {

      console.log(error);

    } else {

      setProducts(data);
    }
  }

  // ADD PRODUCT
  async function addProduct() {

    if (
      !name ||
      !price ||
      !imageFile
    ) {

      alert(
        "Fill all fields"
      );

      return;
    }

    // FILE NAME
    const fileName =
      `${Date.now()}-${imageFile.name}`;

    // UPLOAD IMAGE
    const {
      error: uploadError,
    } = await supabase.storage

      .from("product-images")

      .upload(
        fileName,
        imageFile
      );

    if (uploadError) {

      console.log(uploadError);

      return;
    }

    // GET IMAGE URL
    const {
      data,
    } = supabase.storage

      .from("product-images")

      .getPublicUrl(fileName);

    const imageUrl =
      data.publicUrl;

    // SAVE PRODUCT
    const { error } =
      await supabase
        .from("products")
        .insert([
          {
            name,
            price,
            image: imageUrl,
          },
        ]);

    if (error) {

      console.log(error);

    } else {

      alert(
        "Product Added 🔥"
      );

      setName("");
      setPrice("");
      setImageFile(null);

      fetchProducts();
    }
  }

  // DELETE PRODUCT
  async function deleteProduct(id) {

    const { error } =
      await supabase
        .from("products")
        .delete()
        .eq("id", id);

    if (error) {

      console.log(error);

    } else {

      fetchProducts();
    }
  }

  // EDIT PRODUCT
  function editProduct(product) {

    setEditingId(product.id);

    setName(product.name);

    setPrice(product.price);
  }

  // UPDATE PRODUCT
  async function updateProduct() {

    const { error } =
      await supabase
        .from("products")
        .update({
          name,
          price,
        })
        .eq("id", editingId);

    if (error) {

      console.log(error);

    } else {

      alert(
        "Product Updated 🔥"
      );

      setEditingId(null);

      setName("");

      setPrice("");

      fetchProducts();
    }
  }

  // SEARCH
  const filteredProducts =
    products.filter((p) =>
      p.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <div className="admin-page">

      {/* NAVBAR */}
      <div className="admin-navbar">

        <div className="admin-nav-buttons">

          <button
            className="home-btn"
            onClick={() =>
              navigate("/home")
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
      <div className="admin-hero">

        <h1>
          Admin Dashboard
        </h1>

        <p>
          Manage products and inventory
        </p>

      </div>

      {/* FORM */}
      <div className="admin-form-box">

        <div className="admin-form">

          <input
            placeholder="Product Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <input
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }
          />

          <input
            type="file"

            onChange={(e) =>
              setImageFile(
                e.target.files[0]
              )
            }
          />

          {
            editingId ? (

              <button
                onClick={
                  updateProduct
                }
              >
                Update Product
              </button>

            ) : (

              <button
                onClick={
                  addProduct
                }
              >
                Add Product
              </button>
            )
          }

        </div>

      </div>

      {/* SEARCH */}
      <div className="search-box">

        <input
          className="search-input"

          placeholder="Search product..."

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>

      {/* PRODUCTS */}
      <div className="admin-products">

        {
          filteredProducts.map(
            (p) => (

            <div
              className="admin-card"
              key={p.id}
            >

              <div className="admin-image-box">

                {
                  p.image ? (

                    <img
                      src={p.image}
                      alt={p.name}
                    />

                  ) : (

                    <p>
                      No Image
                    </p>
                  )
                }

              </div>

              <div className="admin-details">

                <h3>
                  {p.name}
                </h3>

                <p>
                  ₹{p.price}
                </p>

                <div className="admin-buttons">

                  <button
                    className="edit-btn"

                    onClick={() =>
                      editProduct(p)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"

                    onClick={() =>
                      deleteProduct(
                        p.id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
}

export default Admin;