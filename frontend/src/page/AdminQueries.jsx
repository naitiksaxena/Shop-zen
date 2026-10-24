import React, { useEffect, useState } from "react";
import { API_URL } from "../api";

function AdminQueries() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  const fetchQueries = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/queries`, {
        headers: authHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Queries load nahi hui");
        return;
      }

      setQueries(data);
    } catch (err) {
      console.log("Fetch Queries Error:", err);
      setError("Server se connection nahi ho raha");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  // New <-> Read
  const handleStatusChange = async (id, status) => {
    try {
      setBusyId(id);

      const response = await fetch(`${API_URL}/api/queries/${id}/status`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Status update nahi hua");
        return;
      }

      setQueries((prev) =>
        prev.map((q) => (q.id === id ? { ...q, status: data.status } : q))
      );
    } catch (err) {
      console.log("Update Query Error:", err);
      alert("Server error");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Is query ko delete karna hai?")) return;

    try {
      setBusyId(id);

      const response = await fetch(`${API_URL}/api/queries/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Delete nahi hua");
        return;
      }

      setQueries((prev) => prev.filter((q) => q.id !== id));
    } catch (err) {
      console.log("Delete Query Error:", err);
      alert("Server error");
    } finally {
      setBusyId(null);
    }
  };

  const newCount = queries.filter((q) => q.status === "New").length;

  return (
    <div className="card border-0 shadow-sm rounded-4 mt-4">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">Queries</h4>

          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-warning text-dark">{newCount} New</span>
            <span className="badge bg-primary">{queries.length} Total</span>

            <button
              className="btn btn-outline-primary btn-sm"
              onClick={fetchQueries}
              disabled={loading}
            >
              <i className="bi bi-arrow-clockwise"></i>
            </button>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && queries.length === 0 && !error && (
          <div className="text-center py-5">
            <h5>No queries yet</h5>
          </div>
        )}

        {queries.map((q) => (
          <div
            key={q.id}
            className={`border rounded-3 p-3 mb-3 ${
              q.status === "New" ? "border-warning bg-warning-subtle" : ""
            }`}
          >
            <div className="d-flex flex-wrap justify-content-between align-items-start gap-2">
              <div>
                <h6 className="fw-bold mb-1">{q.subject}</h6>

                <small className="text-muted d-block">
                  <i className="bi bi-person me-1"></i>
                  {q.name} · {q.email}
                </small>

                <small className="text-muted">
                  {new Date(q.createdAt).toLocaleString("en-IN")}
                </small>
              </div>

              <span
                className={`badge ${
                  q.status === "New" ? "bg-warning text-dark" : "bg-secondary"
                }`}
              >
                {q.status}
              </span>
            </div>

            <p className="mt-3 mb-3" style={{ whiteSpace: "pre-wrap" }}>
              {q.message}
            </p>

            <div className="d-flex flex-wrap gap-2">
              <a
                href={`mailto:${q.email}?subject=${encodeURIComponent(
                  "Re: " + q.subject
                )}`}
                className="btn btn-primary btn-sm"
              >
                <i className="bi bi-reply me-1"></i>
                Reply
              </a>

              <button
                className="btn btn-outline-secondary btn-sm"
                disabled={busyId === q.id}
                onClick={() =>
                  handleStatusChange(q.id, q.status === "New" ? "Read" : "New")
                }
              >
                {q.status === "New" ? "Mark as Read" : "Mark as New"}
              </button>

              <button
                className="btn btn-outline-danger btn-sm"
                disabled={busyId === q.id}
                onClick={() => handleDelete(q.id)}
              >
                <i className="bi bi-trash me-1"></i>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminQueries;
