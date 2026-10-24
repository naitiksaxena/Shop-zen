import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { API_URL } from "../api";

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.name) {
      setError("Name is required");
      return;
    }

    if (!formData.email) {
      setError("Email is required");
      return;
    }

    if (!formData.password) {
      setError("Password is required");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      alert("Account Created Successfully!");

      navigate("/login", { state: location.state });
    } catch (error) {
      console.log("Signup Error:", error);
      setError("Server se connection nahi ho raha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">

              <div className="text-center mb-4">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "55px",
                    height: "55px",
                    borderRadius: "15px",
                    background:
                      "linear-gradient(135deg, #6c5ce7, #a855f7)",
                    color: "white",
                    fontSize: "25px",
                  }}
                >
                  <i className="bi bi-person-plus"></i>
                </div>

                <h2>Create Account</h2>

                <p className="text-muted mb-0">
                  Join ShopZen and start shopping
                </p>
              </div>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">
                    Full Name
                  </label>

                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="bi bi-person"></i>
                    </span>

                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Email Address
                  </label>

                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="bi bi-envelope"></i>
                    </span>

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Password
                  </label>

                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="bi bi-lock"></i>
                    </span>

                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    Confirm Password
                  </label>

                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="bi bi-shield-lock"></i>
                    </span>

                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                  disabled={loading}
                >
                  {loading
                    ? "Creating Account..."
                    : "Create Account"}

                  {!loading && (
                    <i className="bi bi-arrow-right ms-2"></i>
                  )}
                </button>

              </form>

              <div className="text-center mt-4">
                <span className="text-muted">
                  Already have an account?{" "}
                </span>

                <Link
                  to="/login"
                  state={location.state}
                  className="text-decoration-none fw-semibold"
                >
                  Login
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
