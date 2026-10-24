import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./page/Home";
import Products from "./page/Product";
import About from "./page/About";
import Contact from "./page/Contact";
import Cart from "./page/Cart";
import OrderForm from "./page/OrderForm";
import OrderConfirmation from "./page/OrderConfirmation";
import Login from "./page/Login";
import Signup from "./page/Signup";
import AdminRoute from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";
import Admin from "./page/Admin";
import ProductDetails from "./page/ProductDetails";
import MyOrders from "./page/MyOrders";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/orderform"
          element={
            <ProtectedRoute>
              <OrderForm />
            </ProtectedRoute>
          }
        />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
