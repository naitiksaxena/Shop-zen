import React, { useEffect, useState } from "react";
import { API_URL } from "../api";
import { ORDER_STATUSES, statusBadgeClass } from "../utils/orderStatus";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/orders`, {
        headers: authHeaders(),
      });

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
  }, []);

  // Status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);

      const response = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Status update nahi hua");
        return;
      }

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: data.status } : order
        )
      );
    } catch (err) {
      console.log("Update Status Error:", err);
      alert("Server error");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 mt-4">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">Orders</h4>

          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-primary">{orders.length} Orders</span>

            <button
              className="btn btn-outline-primary btn-sm"
              onClick={fetchOrders}
              disabled={loading}
            >
              <i className="bi bi-arrow-clockwise"></i>
            </button>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <div className="fw-semibold">#{order.orderId}</div>
                    <small className="text-muted">
                      {new Date(order.createdAt).toLocaleString("en-IN")}
                    </small>
                  </td>

                  <td style={{ minWidth: "200px" }}>
                    <div className="fw-semibold">{order.customer.name}</div>
                    <small className="text-muted d-block">
                      <i className="bi bi-telephone me-1"></i>
                      {order.customer.phone}
                    </small>
                    <small className="text-muted d-block">
                      {order.customer.address}, {order.customer.city} -{" "}
                      {order.customer.pincode}
                    </small>
                    {order.user && (
                      <small className="text-muted d-block">
                        Account: {order.user.email}
                      </small>
                    )}
                  </td>

                  <td style={{ minWidth: "180px" }}>
                    {order.products.map((product, index) => (
                      <div key={`${product.id}-${index}`}>
                        <small>
                          {product.name} × {product.quantity}
                        </small>
                      </div>
                    ))}
                  </td>

                  <td className="fw-semibold">
                    ₹{order.total.toLocaleString("en-IN")}
                  </td>

                  <td style={{ minWidth: "170px" }}>
                    <span className={`badge mb-2 ${statusBadgeClass(order.status)}`}>
                      {order.status}
                    </span>

                    <select
                      className="form-select form-select-sm"
                      value={order.status}
                      disabled={updatingId === order.id}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                    >
                      {ORDER_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!loading && orders.length === 0 && !error && (
            <div className="text-center py-5">
              <h5>No orders yet</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
