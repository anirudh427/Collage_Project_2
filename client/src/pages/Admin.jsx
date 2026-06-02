import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import "./Admin.css";

function Admin() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts(data);
    }
  }

  async function addProduct() {
    if (!name || !price || !imageFile) {
      alert("Fill all fields");
      return;
    }

    const fileName = `${Date.now()}-${imageFile.name}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(fileName, imageFile);

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      return;
    }

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    const imageUrl = data.publicUrl;

    const { error } = await supabase
      .from("products")
      .insert([
        {
          name,
          price,
          image: imageUrl,
        },
      ]);

    if (error) {
      console.error("Error adding product record:", error);
    } else {
      alert("Product Added Successfully!");
      setName("");
      setPrice("");
      setImageFile(null);
      fetchProducts();
    }
  }

  async function deleteProduct(id) {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting product:", error);
    } else {
      fetchProducts();
    }
  }

  function editProduct(product) {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price);
    window.scrollTo({ top: 120, behavior: "smooth" });
  }

  async function updateProduct() {
    const { error } = await supabase
      .from("products")
      .update({
        name,
        price,
      })
      .eq("id", editingId);

    if (error) {
      console.error("Error updating product record:", error);
    } else {
      alert("Product Updated Successfully!");
      setEditingId(null);
      setName("");
      setPrice("");
      fetchProducts();
    }
  }

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-page">
      {/* Ambient background blur blobs */}
      <div className="admin-bg-blob blob-1"></div>
      <div className="admin-bg-blob blob-2"></div>
      <div className="admin-bg-blob blob-3"></div>

      {/* NAVBAR */}
      <div className="admin-navbar">
        <div className="admin-logo" onClick={() => navigate("/")}>
          <span>The</span> Howling
        </div>
        <div className="admin-nav-buttons">
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

      {/* HERO */}
      <div className="admin-hero">
        <div className="hero-content">
          <h1>Admin Dashboard</h1>
          <p>Manage products, edit inventory records, and track database assets</p>
        </div>
      </div>

      {/* FORM SECTION */}
      <div className="admin-form-box">
        <div className="admin-form">
          <h2 className="form-title">
            {editingId ? "Update Product Record" : "Register New Product"}
          </h2>

          <div className="form-group">
            <label>Product Title</label>
            <input
              placeholder="e.g. Premium Wool Jacket"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-text-input"
            />
          </div>

          <div className="form-group">
            <label>Retail Price (₹)</label>
            <input
              placeholder="e.g. 2499"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-text-input"
            />
          </div>

          <div className="form-group">
            <label>Product Showcase Image</label>
            <div className={`file-upload-wrapper ${imageFile ? "file-selected" : ""}`}>
              <label htmlFor="image-input" className="file-upload-label">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="upload-icon"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <span className="upload-text">
                  {imageFile ? imageFile.name : "Select or Drop Image File"}
                </span>
              </label>
              <input
                id="image-input"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="hidden-file-input"
                disabled={!!editingId}
              />
            </div>
            {editingId && (
              <span className="edit-warning-hint">
                Image updates must be done by adding a new product record.
              </span>
            )}
          </div>

          {editingId ? (
            <button onClick={updateProduct} className="submit-btn update-state">
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
                className="btn-action-icon"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              Apply Record Updates
            </button>
          ) : (
            <button onClick={addProduct} className="submit-btn add-state">
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
                className="btn-action-icon"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Product to Database
            </button>
          )}
        </div>
      </div>

      <div className="search-box">
        <div className="search-input-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="search-icon"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            className="search-input"
            placeholder="Search catalog by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-products">
        {filteredProducts.length === 0 ? (
          <div className="no-results-card">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="no-res-icon"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <p>No matching product records located in database</p>
          </div>
        ) : (
          filteredProducts.map((p) => (
            <div className="admin-card" key={p.id}>
              <div className="admin-image-box">
                {p.image ? (
                  <img src={p.image} alt={p.name} />
                ) : (
                  <div className="no-image-fallback">
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
                    <span>No Showcase Image Available</span>
                  </div>
                )}
              </div>

              <div className="admin-details">
                <h3>{p.name}</h3>
                <p className="admin-price">₹{Number(p.price).toLocaleString("en-IN")}</p>

                <div className="admin-buttons">
                  <button className="edit-btn" onClick={() => editProduct(p)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="action-btn-icon"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Edit
                  </button>

                  <button className="delete-btn" onClick={() => deleteProduct(p.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="action-btn-icon"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Admin;