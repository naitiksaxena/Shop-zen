import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  // Logged-in user
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        return null;
      }
    }

    return null;
  });

  const [menuOpen, setMenuOpen] = useState(false);

  const { cartCount } = useCart();

  // Admin login hai ya nahi
  const isAdmin = isLoggedIn && user?.role === "admin";

  // Login status + user check
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";

      setIsLoggedIn(loggedIn);

      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    window.addEventListener("loginStatusChanged", checkLoginStatus);

    return () => {
      window.removeEventListener("loginStatusChanged", checkLoginStatus);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser(null);

    window.dispatchEvent(new Event("loginStatusChanged"));

    closeMenu();
    navigate("/");
  };

  // User ka icon + naam + role
  const renderUserInfo = () => (
    <div className="d-flex align-items-center gap-2">
      {/* User Icon */}
      <div
        className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
        style={{
          width: "38px",
          height: "38px",
          flexShrink: 0,
        }}
      >
        <i className="bi bi-person"></i>
      </div>

      {/* Name + Role */}
      <div className="lh-sm" style={{ minWidth: "70px" }}>
        <div className="fw-semibold">{user.name}</div>

        <small className="text-muted text-capitalize">{user.role}</small>
      </div>
    </div>
  );

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid px-lg-4">
        {/* Logo */}
        <Link
          className="navbar-brand d-flex align-items-center gap-2"
          to="/"
          onClick={closeMenu}
        >
          <span className="logo-box">S</span>

          <span className="logo-name">
            Shop<span>Zen</span>
          </span>
        </Link>

        {/* Right Side: mobile par bhi hamesha dikhta hai (menu ke bahar) */}
        <div className="nav-actions d-flex align-items-center gap-2 gap-lg-3 ms-auto order-lg-3">
          {/* My Orders */}
          {isLoggedIn && !isAdmin && (
            <Link
              to="/my-orders"
              className="cart-btn"
              onClick={closeMenu}
              title="My Orders"
            >
              <i className="bi bi-box-seam"></i>
            </Link>
          )}

          {/* Cart */}
          {!isAdmin && (
            <Link
              to="/cart"
              className="cart-btn"
              onClick={closeMenu}
              title="Cart"
            >
              <i className="bi bi-cart3"></i>

              <span className="cart-count">{cartCount}</span>
            </Link>
          )}

          {/* User Info (sirf bade screen par, mobile par menu ke andar dikhta hai) */}
          {isLoggedIn && user && (
            <div className="d-none d-lg-block">{renderUserInfo()}</div>
          )}

          {/* Logout / Login */}
          {isLoggedIn ? (
            <button
              className="btn btn-outline-danger logout-btn"
              onClick={handleLogout}
              title="Logout"
              aria-label="Logout"
            >
              <i className="bi bi-box-arrow-right me-sm-1"></i>
              <span className="d-none d-sm-inline">Logout</span>
            </button>
          ) : (
            <Link to="/login" className="login-btn" onClick={closeMenu}>
              <i className="bi bi-person me-1"></i>
              Login
            </Link>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="navbar-toggler border-0 shadow-none ms-1 ms-lg-0"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"}`}></i>
        </button>

        {/* Navbar Content (sirf links) */}
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          {/* Navigation Links */}
          <ul className="navbar-nav mx-auto align-items-lg-center gap-lg-3">
            <li className="nav-item">
              <Link
                to="/"
                className={
                  location.pathname === "/" ? "nav-link active" : "nav-link"
                }
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/products"
                className={
                  location.pathname === "/products"
                    ? "nav-link active"
                    : "nav-link"
                }
                onClick={closeMenu}
              >
                Product
              </Link>
            </li>

            {!isAdmin && (
              <li className="nav-item">
                <Link
                  to="/about"
                  className={
                    location.pathname === "/about"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  onClick={closeMenu}
                >
                  About
                </Link>
              </li>
            )}

            {!isAdmin && (
              <li className="nav-item">
                <Link
                  to="/contact"
                  className={
                    location.pathname === "/contact"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  onClick={closeMenu}
                >
                  Contact
                </Link>
              </li>
            )}

            {isAdmin && (
              <li className="nav-item">
                <Link
                  to="/admin"
                  className={
                    location.pathname === "/admin"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  onClick={closeMenu}
                >
                  Admin Panel
                </Link>
              </li>
            )}
          </ul>

          {/* User Info (sirf mobile menu ke andar) */}
          {isLoggedIn && user && (
            <div className="d-lg-none pb-3">{renderUserInfo()}</div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;