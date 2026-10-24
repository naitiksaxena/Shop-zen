import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { API_URL } from "../api";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);

        const data = await response.json();

        const foundProduct = data.find(
          (item) => String(item.id) === String(id),
        );

        setProduct(foundProduct);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="details-loading">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="details-loading">
        <h2>Product Not Found</h2>
        <button onClick={() => navigate("/product")}>Back to Products</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="product-details-page">
      {/* Breadcrumb */}
      <div className="details-breadcrumb">
        <span onClick={() => navigate("/")}>Home</span>
        <span>/</span>
        <span onClick={() => navigate("/products")}>Products</span>
        <span>/</span>
        <strong>{product.name}</strong>
      </div>

      {/* Main Product Section */}
      <div className="product-details">
        {/* Product Image */}
        <div className="details-image-section">
          <div className="details-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="image-badge">🔥 Popular Choice</div>
        </div>

        {/* Product Information */}
        <div className="details-content">
          <div className="details-top">
            <span className="details-category">{product.category}</span>
          </div>

          <h1>{product.name}</h1>

          <div className="rating-row">
            <span className="rating-box">⭐ {product.rating}</span>

            <span className="rating-text">Excellent Rating</span>
          </div>

          <div className="price-section">
            <h2>₹{product.price}</h2>

            <span className="best-price">Best Price</span>
          </div>

          <p className="details-description">
            Experience quality and style with this amazing product from ShopZen.
            Carefully selected for our customers to provide great value and a
            smooth shopping experience.
          </p>

          {/* Quantity */}
          <div className="quantity-section">
            <h4>Quantity</h4>

            <div className="quantity-box">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                −
              </button>

              <span>{quantity}</span>

              <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
            </div>
          </div>

          {/* Buttons */}
          <div className="details-buttons">
            <button className="add-cart-btn" onClick={handleAddToCart}>
              🛒 Add to Cart
            </button>

            <button
              className="buy-now-btn"
              onClick={() => {
                handleAddToCart();
                navigate("/cart");
              }}
            >
              Buy Now
            </button>
          </div>

          {/* Benefits */}
          <div className="product-benefits">
            <div className="benefit">
              <span>🚚</span>
              <div>
                <strong>Free Delivery</strong>
                <small>On selected orders</small>
              </div>
            </div>

            <div className="benefit">
              <span>🔒</span>
              <div>
                <strong>Secure Payment</strong>
                <small>100% secure checkout</small>
              </div>
            </div>

            <div className="benefit">
              <span>↩️</span>
              <div>
                <strong>Easy Returns</strong>
                <small>Simple return process</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Highlights */}
      <div className="product-highlights">
        <h2>Why You'll Love It</h2>

        <div className="highlight-grid">
          <div className="highlight-card">
            <span>✨</span>
            <h3>Premium Quality</h3>
            <p>Selected products with quality in mind.</p>
          </div>

          <div className="highlight-card">
            <span>💯</span>
            <h3>Trusted Product</h3>
            <p>Carefully listed and verified products.</p>
          </div>

          <div className="highlight-card">
            <span>⚡</span>
            <h3>Fast Shopping</h3>
            <p>Simple and smooth shopping experience.</p>
          </div>

          <div className="highlight-card">
            <span>❤️</span>
            <h3>ShopZen Choice</h3>
            <p>Products selected for our customers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
