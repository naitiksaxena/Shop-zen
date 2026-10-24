import React from "react";
import { Link, useLocation } from "react-router-dom";

function OrderConfirmation() {
  const location = useLocation();

  const order = location.state?.order;

  if (!order) {
    return (
      <div className="container py-5 text-center">
        <i className="bi bi-exclamation-circle display-1 text-secondary"></i>

        <h2 className="mt-3">Order Not Found</h2>

        <p className="text-muted">
          We couldn't find your order details.
        </p>

        <Link to="/products" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">

      {/* Success */}
      <div className="text-center mb-5">
        <div className="mb-3">
          <i className="bi bi-check-circle-fill text-success display-1"></i>
        </div>

        <h1>Order Placed Successfully!</h1>

        <p className="text-muted">
          Thank you for shopping with ShopZen.
        </p>

        <span className="badge bg-light text-dark border">
          Order ID: {order.orderId}
        </span>
      </div>

      <div className="row g-4">

        {/* Customer Details */}
        <div className="col-lg-5">

          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">

              <h4 className="mb-4">
                <i className="bi bi-person me-2"></i>
                Customer Details
              </h4>

              <p>
                <strong>Name:</strong> {order.customer.name}
              </p>

              <p>
                <strong>Phone:</strong> {order.customer.phone}
              </p>

              <p>
                <strong>Address:</strong> {order.customer.address}
              </p>

              <p>
                <strong>City:</strong> {order.customer.city}
              </p>

              <p className="mb-0">
                <strong>Pincode:</strong> {order.customer.pincode}
              </p>

            </div>
          </div>

        </div>

        {/* Order Details */}
        <div className="col-lg-7">

          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">

              <h4 className="mb-4">
                <i className="bi bi-box-seam me-2"></i>
                Order Details
              </h4>

              {order.products.map((product) => (
                <div
                  key={product.id}
                  className="d-flex align-items-center border-bottom pb-3 mb-3"
                >

                  <img
                    src={product.image}
                    alt={product.name}
                    width="70"
                    height="70"
                    className="rounded object-fit-cover"
                  />

                  <div className="ms-3 flex-grow-1">
                    <h6 className="mb-1">
                      {product.name}
                    </h6>

                    <small className="text-muted">
                      Qty: {product.quantity}
                    </small>
                  </div>

                  <strong>
                    ₹{product.price * product.quantity}
                  </strong>

                </div>
              ))}

              <div className="d-flex justify-content-between mt-4">
                <h5>Grand Total</h5>

                <h5>
                  ₹{order.total}
                </h5>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Buttons */}
      <div className="text-center mt-5">

        <Link
          to="/products"
          className="btn btn-primary me-2"
        >
          <i className="bi bi-bag me-2"></i>
          Continue Shopping
        </Link>

        <Link
          to="/"
          className="btn btn-outline-secondary"
        >
          Go to Home
        </Link>

      </div>

    </div>
  );
}

export default OrderConfirmation;