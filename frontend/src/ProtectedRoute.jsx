import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// Sirf logged-in user ke liye. Login nahi hai to /login par bhejta hai
// aur yaad rakhta hai ki login ke baad user ko kahan wapas aana hai.
function ProtectedRoute({ children }) {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  if (!token || !userData) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default ProtectedRoute;
