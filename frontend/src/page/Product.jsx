import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api";
function Products() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useCart();

  // API Product Data
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Fetch Error:", error);
        setLoading(false);
      });
  }, []);

  // Categories
  const categories = ["All", "Men", "Women", "Shoes", "Electronics"];

  // Filter Products
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <div className="bg-light min-vh-100">
      {/* Header */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <span className="badge rounded-pill bg-primary-subtle text-primary px-3 py-2 mb-3">
            Our Collection
          </span>

          <h1 className="display-5 fw-bold">Explore Our Products</h1>

          <p className="text-secondary">
            Find everything you need in one place.
          </p>
        </div>

        {/* Category Buttons */}
        <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`btn rounded-pill px-4 ${
                activeCategory === category
                  ? "btn-primary"
                  : "btn-outline-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>

            <p className="mt-3 text-secondary">Loading products...</p>
          </div>
        )}

        {/* Products */}
        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div className="col-6 col-sm-6 col-lg-4 col-xl-3" key={product.id}>
              <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden">
                {/* Product Image */}
                <div
                  className="position-relative bg-white"
                  style={{ height: "270px" }}
                >
                  <img
                    onClick={() => navigate(`/product/${product.id}`)}
                    src={product.image}
                    alt={product.name}
                    className="w-100 h-100"
                    style={{
                      objectFit: "cover",
                      cursor:"pointer",
                    }}
                  />

                  {/* Category */}
                  <span className="position-absolute top-0 start-0 m-3 badge bg-dark">
                    {product.category}
                  </span>

                  {/* Wishlist */}
                  <button
                    className="btn btn-light rounded-circle position-absolute top-0 end-0 m-3 shadow-sm"
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <i className="bi bi-heart"></i>
                  </button>
                </div>

                {/* Product Details */}
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-2">{product.name}</h5>

                  {/* Rating */}
                  <div className="mb-3">
                    <span className="text-warning">★★★★★</span>

                    <small className="text-secondary ms-2">
                      {product.rating}
                    </small>
                  </div>

                  {/* Price */}
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 className="fw-bold text-primary mb-0">
                      ₹{product.price.toLocaleString("en-IN")}
                    </h5>

                    <button
                      className="btn btn-primary rounded-circle"
                      onClick={() => addToCart(product)}
                      title="Add to Cart"
                    >
                      <i className="bi bi-cart-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Products */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-5">
            <i className="bi bi-box-seam display-1 text-secondary"></i>

            <h3 className="mt-3">No products found</h3>

            <p className="text-secondary">Try another category.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Products;
