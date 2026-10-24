import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import girlimg from "../assets/girl.jpg";

function Home() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail("");
  };
  return (
    <div>
      {/* Hero Section */}
      <section className="container py-5">
        <div className="row align-items-center min-vh-75">
          {/* Left Content */}
          <div className="col-lg-6">
            <span className="badge rounded-pill bg-primary-subtle text-primary px-3 py-2 mb-3">
              ✨ New Collection 2026
            </span>

            <h1 className="display-3 fw-bold mb-3">
              Discover Your
              <span className="text-primary"> Perfect Style</span>
            </h1>

            <p className="lead text-secondary mb-4">
              Explore premium products, amazing deals and the latest trends —
              all in one place.
            </p>

            <div className="d-flex gap-3 flex-wrap">
              <Link
                to="/products"
                className="btn btn-primary btn-lg px-4 rounded-pill"
              >
                Shop Now
                <i className="bi bi-arrow-right ms-2"></i>
              </Link>

              <Link
                to="/about"
                className="btn btn-outline-dark btn-lg px-4 rounded-pill"
              >
                Explore More
              </Link>
            </div>

            {/* Small Stats */}
            <div className="row mt-5">
              <div className="col-4">
                <h4 className="fw-bold mb-0">10K+</h4>
                <small className="text-secondary">Products</small>
              </div>

              <div className="col-4">
                <h4 className="fw-bold mb-0">5K+</h4>
                <small className="text-secondary">Customers</small>
              </div>

              <div className="col-4">
                <h4 className="fw-bold mb-0">4.9</h4>
                <small className="text-secondary">Rating ⭐</small>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="col-lg-6 mt-5 mt-lg-0">
            <div
              className="p-4 rounded-5"
              style={{
                background: "linear-gradient(135deg, #eeeaff, #f8efff)",
              }}
            >
              <div
                className="bg-white rounded-5 shadow-lg d-flex align-items-center justify-content-center"
                style={{
                  height: "450px",
                }}
              >
                <div className="text-center">
                  <img src={girlimg} alt="png" style={{ width: "300px" }} />

                  <h3 className="fw-bold mt-4">ShopZen</h3>

                  <p className="text-secondary">Your shopping destination</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose ShopZen */}
      <section className="container py-5">
        <div className="text-center">
          <h2 className="fw-bold mt-3">Everything You Need in One Place</h2>

          <p className="text-secondary">
            We make your shopping experience simple, fast and enjoyable.
          </p>
          <div className="container">
            <div
              style={{
                display: "flex",
                gap: "20px",
                overflowX: "auto",
                padding: "10px 5px 20px",
                scrollbarWidth: "none",
              }}
            >
              <div
                className="bg-white rounded-4 shadow-sm"
                style={{ minWidth: "220px", overflow: "hidden" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
                  className="w-100"
                  alt="Product 1"
                  style={{ height: "220px", objectFit: "cover" }}
                />
              </div>

              <div
                className="bg-white rounded-4 shadow-sm"
                style={{ minWidth: "220px", overflow: "hidden" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
                  className="w-100"
                  alt="Product 2"
                  style={{ height: "220px", objectFit: "cover" }}
                />
              </div>

              <div
                className="bg-white rounded-4 shadow-sm"
                style={{ minWidth: "220px", overflow: "hidden" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500"
                  className="w-100"
                  alt="Product 3"
                  style={{ height: "220px", objectFit: "cover" }}
                />
              </div>

              <div
                className="bg-white rounded-4 shadow-sm"
                style={{ minWidth: "220px", overflow: "hidden" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
                  className="w-100"
                  alt="Product 4"
                  style={{ height: "220px", objectFit: "cover" }}
                />
              </div>

              <div
                className="bg-white rounded-4 shadow-sm"
                style={{ minWidth: "220px", overflow: "hidden" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
                  className="w-100"
                  alt="Product 5"
                  style={{ height: "220px", objectFit: "cover" }}
                />
              </div>

              <div
                className="bg-white rounded-4 shadow-sm"
                style={{ minWidth: "220px", overflow: "hidden" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500"
                  className="w-100"
                  alt="Product 6"
                  style={{ height: "220px", objectFit: "cover" }}
                />
              </div>

              <div
                className="bg-white rounded-4 shadow-sm"
                style={{ minWidth: "220px", overflow: "hidden" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
                  className="w-100"
                  alt="Product 7"
                  style={{ height: "220px", objectFit: "cover" }}
                />
              </div>

              <div
                className="bg-white rounded-4 shadow-sm"
                style={{ minWidth: "220px", overflow: "hidden" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500"
                  className="w-100"
                  alt="Product 8"
                  style={{ height: "220px", objectFit: "cover" }}
                />
              </div>

              <div
                className="bg-white rounded-4 shadow-sm"
                style={{ minWidth: "220px", overflow: "hidden" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500"
                  className="w-100"
                  alt="Product 9"
                  style={{ height: "220px", objectFit: "cover" }}
                />
              </div>

              <div
                className="bg-white rounded-4 shadow-sm"
                style={{ minWidth: "220px", overflow: "hidden" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"
                  className="w-100"
                  alt="Product 10"
                  style={{ height: "220px", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shopping CTA */}
      <section className="container py-4 pb-5">
        <footer
          className="text-white p-5 rounded-5"
          style={{
            background: "linear-gradient(135deg, #7055df, #9b5de5)",
          }}
        >
          <div className="container">
            <div className="row gy-4 mb-5">
              <div className="col-12 col-md-6 col-lg-5">
                <h5 className="fw-bold mb-3">About us</h5>
                <p className="text-white-50" style={{ maxWidth: 420 }}>
                  Two guys, and one hat to rule them both. Or so we thought –
                  turned out we were in it for the long game, and are on a
                  mission to change menswear for the better.
                </p>
              </div>

              <div className="col-12 col-md-6 col-lg-6 offset-lg-1">
                <form onSubmit={handleSubmit}>
                  <label
                    htmlFor="footerEmail"
                    className="form-label fw-bold fs-5"
                  >
                    Email address
                  </label>
                  <input
                    id="footerEmail"
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-control rounded-0 border-0 py-2 px-3 bg-light"
                  />
                  <div className="d-grid d-sm-block mt-3">
                    <button
                      type="submit"
                      className="btn btn-primary rounded-0 px-4 py-2 fw-semibold"
                    >
                      SUBMIT
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="row gy-4">
              <div className="col-12 col-sm-6 col-lg-3">
                <h5 className="fw-bold mb-3">Address</h5>
                <p className="text-white-50 mb-0">
                  Bareilly,
                  <br />
                  Post code 24132, India
                </p>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <h5 className="fw-bold mb-3">Contact us</h5>
                <ul className="list-unstyled mb-0">
                  <li className="mb-1">
                    <a href="mailto:info@feyer.com" className="text-white">
                      naitiksaxena0862@gmail.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:1234567890" className="text-white">
                      80909-43172
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <h5 className="fw-bold mb-3">Follow</h5>
                <ul className="list-unstyled mb-0">
                  <li className="mb-1">
                    <a
                      href="https://www.facebook.com/jay.saxena.311"
                      target="_blank"
                      rel="noreferrer"
                      className="text-white"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/itx_naitik_saxena_"
                      target="_blank"
                      rel="noreferrer"
                      className="text-white"
                    >
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <h5 className="fw-bold mb-3">Info</h5>
                <ul className="list-unstyled mb-0">
                  <li className="mb-1">
                    <a href="/shipping" className="text-white">
                      Shipping &amp; returns
                    </a>
                  </li>
                  <li className="mb-1">
                    <a href="/privacy" className="text-white">
                      Privacy Policy
                    </a>
                  </li>
                  <li className="mb-1">
                    <a href="/size-guide" className="text-white">
                      Size guide
                    </a>
                  </li>
                  <li>
                    <a href="/terms" className="text-white">
                      Terms &amp; conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}

export default Home;
