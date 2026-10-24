import React from "react";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  // Login nahi hai
  if (!token || !userData) {
    return <Navigate to="/login" replace />;
  }

  let user;

  try {
    user = JSON.parse(userData);
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return <Navigate to="/login" replace />;
  }

  // User admin nahi hai
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Admin hai
  return children;
}

export default AdminRoute;