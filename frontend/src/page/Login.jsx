import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { API_URL } from "../api";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // Agar user checkout se aaya hai to login ke baad wahin wapas bhejenge
  const redirectTo = location.state?.from;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email) {
      setError("Email is required");
      return;
    }

    if (!formData.password) {
      setError("Password is required");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save login information
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      localStorage.setItem("isLoggedIn", "true");

      window.dispatchEvent(
        new Event("loginStatusChanged")
      );

      alert("Login Successful!");

      // Checkout se aaya tha to wapas wahin, warna role based redirect
      if (redirectTo) {
        navigate(redirectTo, { replace: true });
      } else if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.log("Login Error:", error);
      setError("Server se connection nahi ho raha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
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
                  <i className="bi bi-person"></i>
                </div>

                <h2>Welcome Back!</h2>

                <p className="text-muted mb-0">
                  Login to continue shopping with ShopZen
                </p>
              </div>

              {redirectTo === "/orderform" && (
                <div className="alert alert-info text-center">
                  Please login first to check out your order. If you don't have an account, please create one.
                </div>
              )}

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>

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

                <div className="mb-4">
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
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}

                  {!loading && (
                    <i className="bi bi-arrow-right ms-2"></i>
                  )}
                </button>

              </form>

              <div className="text-center mt-4">
                <span className="text-muted">
                  Don't have an account?{" "}
                </span>

                <Link
                  to="/signup"
                  state={location.state}
                  className="text-decoration-none fw-semibold"
                >
                  Create Account
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
