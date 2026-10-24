import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../api";
import { statusBadgeClass } from "../utils/orderStatus";

function MyOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/orders/my`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Token expire ho gaya ho to dobara login karwao
      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
        window.dispatchEvent(new Event("loginStatusChanged"));

        navigate("/login", { state: { from: "/my-orders" } });
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Orders load nahi hue");
        return;
      }

      setOrders(data);
    } catch (err) {
      console.log("Fetch Orders Error:", err);
      setError("Server se connection nahi ho raha");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">
            <i className="bi bi-box-seam me-2"></i>
            My Orders
          </h2>

          <button
            className="btn btn-outline-primary btn-sm"
            onClick={fetchOrders}
            disabled={loading}
          >
            <i className="bi bi-arrow-clockwise me-1"></i>
            Refresh
          </button>
        </div>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && orders.length === 0 && (
          <div className="text-center py-5">
            <i className="bi bi-bag-x display-1 text-secondary"></i>

            <h4 className="mt-3">No orders yet</h4>

            <p className="text-muted">
              Aapne abhi tak koi order place nahi kiya.
            </p>

            <Link to="/products" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        )}

        {orders.map((order) => (
          <div className="card border-0 shadow-sm rounded-4 mb-4" key={order.id}>
            <div className="card-body p-4">
              {/* Order Header */}
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                <div>
                  <h5 className="fw-bold mb-1">Order #{order.orderId}</h5>

                  <small className="text-muted">
                    {new Date(order.createdAt).toLocaleString("en-IN")}
                  </small>
                </div>

                <span className={`badge fs-6 ${statusBadgeClass(order.status)}`}>
                  {order.status}
                </span>
              </div>

              {/* Products */}
              {order.products.map((product, index) => (
                <div
                  key={`${product.id}-${index}`}
                  className="d-flex align-items-center border-top py-3"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    width="60"
                    height="60"
                    className="rounded"
                    style={{ objectFit: "cover" }}
                  />

                  <div className="ms-3 flex-grow-1">
                    <h6 className="mb-1">{product.name}</h6>

                    <small className="text-muted">
                      Qty: {product.quantity} × ₹
                      {product.price.toLocaleString("en-IN")}
                    </small>
                  </div>

                  <strong>
                    ₹{(product.price * product.quantity).toLocaleString("en-IN")}
                  </strong>
                </div>
              ))}

              {/* Footer */}
              <div className="d-flex flex-wrap justify-content-between align-items-end border-top pt-3 gap-2">
                <small className="text-muted">
                  <i className="bi bi-geo-alt me-1"></i>
                  {order.customer.address}, {order.customer.city} -{" "}
                  {order.customer.pincode}
                </small>

                <h5 className="mb-0">
                  Total: ₹{order.total.toLocaleString("en-IN")}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
