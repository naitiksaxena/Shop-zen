import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart, cartTotal } =
    useCart();

  const navigate = useNavigate();

  // Checkout se pehle login zaroori hai
  const handleCheckout = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { state: { from: "/orderform" } });
      return;
    }

    navigate("/orderform");
  };

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <i className="bi bi-cart-x display-1 text-secondary"></i>

        <h2 className="mt-3">No Product Added Yet</h2>

        <p className="text-muted">
          Looks like you haven't added anything to your cart yet.
        </p>

        <Link to="/products" className="btn btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Cart</h2>

      <div className="row g-4">
        {/* Products */}
        <div className="col-lg-8">
          {cart.map((product) => (
            <div className="card border-0 shadow-sm mb-3" key={product.id}>
              <div className="card-body">
                <div className="row align-items-center">
                  {/* Image */}
                  <div className="col-md-2 col-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-fluid rounded"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="col-md-3 col-8">
                    <h5>{product.name}</h5>

                    <p className="text-muted mb-1">{product.category}</p>

                    <strong>₹{product.price}</strong>
                  </div>

                  {/* Quantity */}
                  <div className="col-md-3 mt-3 mt-md-0">
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => decreaseQty(product.id)}
                      >
                        <i className="bi bi-dash"></i>
                      </button>

                      <span className="fw-bold px-2">{product.quantity}</span>

                      <button
                        className="btn btn-outline-primary"
                        onClick={() => increaseQty(product.id)}
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>

                  {/* Product Total */}
                  <div className="col-md-2 mt-3 mt-md-0">
                    <strong>₹{product.price * product.quantity}</strong>
                  </div>

                  {/* Delete */}
                  <div className="col-md-2 text-md-end mt-3 mt-md-0">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => removeFromCart(product.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h4 className="mb-4">Order Summary</h4>

              <div className="d-flex justify-content-between mb-3">
                <span>Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Total</span>
                <strong>₹{cartTotal}</strong>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <strong>Grand Total</strong>
                <strong>₹{cartTotal}</strong>
              </div>

              <button
                className="btn btn-primary w-100"
                onClick={handleCheckout}
              >
                Proceed to Checkout
                <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
