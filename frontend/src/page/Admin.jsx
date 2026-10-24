import React, { useEffect, useState } from "react";
import AdminOrders from "./AdminOrders";
import AdminQueries from "./AdminQueries";
import { API_URL } from "../api";

function Admin() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    category: "Men",
    price: "",
    rating: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  // Pehle sirf 7 products dikhao, "See More" par baaki
  const PRODUCTS_LIMIT = 7;
  const [showAll, setShowAll] = useState(false);

  const visibleProducts = showAll
    ? products
    : products.slice(0, PRODUCTS_LIMIT);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/products`
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Input Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.category ||
      !form.price ||
      !form.rating ||
      !form.image
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: form.name,
            category: form.category,
            price: Number(form.price),
            rating: Number(form.rating),
            image: form.image,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Product add nahi hua");
        return;
      }

      // Add newly created product to UI
      setProducts((prev) => [data, ...prev]);

      // Clear form
      setForm({
        name: "",
        category: "Men",
        price: "",
        rating: "",
        image: "",
      });

      alert("Product added successfully!");
    } catch (error) {
      console.log("Add Product Error:", error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  // Delete Product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/api/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Delete failed");
        return;
      }

      // Remove product from UI
      setProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );

      alert("Product deleted successfully!");
    } catch (error) {
      console.log("Delete Error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">

        {/* Header */}
        <div className="mb-5">
          <h1 className="fw-bold">
            Admin Panel
          </h1>

          <p className="text-secondary">
            Manage your products
          </p>
        </div>

        <div className="row g-4">

          {/* Add Product */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">

                <h4 className="fw-bold mb-4">
                  Add Product
                </h4>

                <form onSubmit={handleSubmit}>

                  {/* Name */}
                  <div className="mb-3">
                    <label className="form-label">
                      Product Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter product name"
                    />
                  </div>

                  {/* Category */}
                  <div className="mb-3">
                    <label className="form-label">
                      Category
                    </label>

                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Shoes">Shoes</option>
                      <option value="Electronics">
                        Electronics
                      </option>
                    </select>
                  </div>

                  {/* Price */}
                  <div className="mb-3">
                    <label className="form-label">
                      Price
                    </label>

                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter price"
                    />
                  </div>

                  {/* Rating */}
                  <div className="mb-3">
                    <label className="form-label">
                      Rating
                    </label>

                    <input
                      type="number"
                      name="rating"
                      value={form.rating}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Example: 4.5"
                      min="0"
                      max="5"
                      step="0.1"
                    />
                  </div>

                  {/* Image */}
                  <div className="mb-4">
                    <label className="form-label">
                      Image URL
                    </label>

                    <input
                      type="text"
                      name="image"
                      value={form.image}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Paste image URL"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading
                      ? "Adding..."
                      : "Add Product"}
                  </button>

                </form>

              </div>
            </div>
          </div>

          {/* Product List */}
          <div className="col-lg-8">

            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="fw-bold mb-0">
                    Products
                  </h4>

                  <span className="badge bg-primary">
                    {products.length} Products
                  </span>
                </div>

                <div className="table-responsive">

                  <table className="table align-middle">

                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Rating</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>

                      {visibleProducts.map((product) => (
                        <tr key={product.id}>

                          <td>
                            <div className="d-flex align-items-center gap-3">

                              <img
                                src={product.image}
                                alt={product.name}
                                width="55"
                                height="55"
                                className="rounded-3"
                                style={{
                                  objectFit: "cover",
                                }}
                              />

                              <span className="fw-semibold">
                                {product.name}
                              </span>

                            </div>
                          </td>

                          <td>
                            <span className="badge bg-dark">
                              {product.category}
                            </span>
                          </td>

                          <td>
                            ₹
                            {Number(
                              product.price
                            ).toLocaleString("en-IN")}
                          </td>

                          <td>
                            ⭐ {product.rating}
                          </td>

                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                handleDelete(
                                  product.id
                                )
                              }
                            >
                              <i className="bi bi-trash"></i>
                              {" "}Delete
                            </button>
                          </td>

                        </tr>
                      ))}

                    </tbody>

                  </table>

                  {products.length === 0 && (
                    <div className="text-center py-5">
                      <h5>No products found</h5>
                    </div>
                  )}

                  {products.length > PRODUCTS_LIMIT && (
                    <div className="text-center mt-3">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => setShowAll(!showAll)}
                      >
                        {showAll
                          ? "See Less"
                          : `See More (${products.length - PRODUCTS_LIMIT} more)`}
                      </button>
                    </div>
                  )}

                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Orders */}
        <AdminOrders />

        {/* Queries */}
        <AdminQueries />
      </div>
    </div>
  );
}

export default Admin;
