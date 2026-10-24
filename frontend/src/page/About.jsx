import React from "react";
import { Link } from "react-router-dom";
import goodimg from "../assets/goodimg.png";
function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="container py-5">
        <div className="row align-items-center">
          {/* left Content */}
          <div className="col-lg-6 mt-5 mt-lg-0">
            <div
              className="p-5 rounded-5 text-center"
              style={{
                background: "linear-gradient(135deg, #eeeaff, #f8efff)",
              }}
            >
              <div className="bg-white rounded-5 shadow-lg p-5">
                <img className="img-fluid" src={goodimg} alt="png" />

                <h3 className="fw-bold mt-4">Welcome to ShopZen</h3>

                <p className="text-secondary mb-0">
                  Quality products. Great prices. Happy shopping.
                </p>
              </div>
            </div>
          </div>
          {/* right Content */}
          <div className="col-lg-6">
            <span className="badge rounded-pill bg-primary-subtle text-primary px-3 py-2 mb-3">
              ✨ About ShopZen
            </span>

            <h1 className="display-4 fw-bold mb-3">
              Shopping Made
              <span className="text-primary"> Simple & Better</span>
            </h1>

            <p className="lead text-secondary mb-4">
              ShopZen is your one-stop destination for discovering quality
              products, amazing deals and the latest trends.
            </p>

            <p className="text-secondary">
              Our goal is to make online shopping simple, comfortable and
              enjoyable. We bring different categories of products together so
              you can find everything you need in one place.
            </p>

            <Link
              to="/products"
              className="btn btn-primary px-4 py-2 rounded-pill mt-3"
            >
              Explore Products
              <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Why ShopZen */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <span className="text-primary fw-semibold">WHY CHOOSE US</span>

          <h2 className="fw-bold mt-2">Everything You Need</h2>

          <p className="text-secondary">
            We focus on providing a better shopping experience.
          </p>
        </div>

        <div className="row g-4">
          {/* Card 1 */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 h-100 p-4 text-center">
              <div className="mb-3">
                <i
                  className="bi bi-stars text-primary"
                  style={{ fontSize: "42px" }}
                ></i>
              </div>

              <h4 className="fw-bold">Quality Products</h4>

              <p className="text-secondary mb-0">
                We focus on offering quality products that provide value and
                satisfaction.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 h-100 p-4 text-center">
              <div className="mb-3">
                <i
                  className="bi bi-tag-fill text-primary"
                  style={{ fontSize: "42px" }}
                ></i>
              </div>

              <h4 className="fw-bold">Great Prices</h4>

              <p className="text-secondary mb-0">
                Discover amazing deals and affordable prices across different
                product categories.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 h-100 p-4 text-center">
              <div className="mb-3">
                <i
                  className="bi bi-heart-fill text-primary"
                  style={{ fontSize: "42px" }}
                ></i>
              </div>

              <h4 className="fw-bold">Happy Customers</h4>

              <p className="text-secondary mb-0">
                Customer satisfaction is at the heart of everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container py-5">
        <div className="bg-light rounded-5 p-5">
          <div className="row text-center g-4">
            <div className="col-6 col-lg-3">
              <h2 className="fw-bold text-primary">10K+</h2>
              <p className="text-secondary mb-0">Products</p>
            </div>

            <div className="col-6 col-lg-3">
              <h2 className="fw-bold text-primary">5K+</h2>
              <p className="text-secondary mb-0">Customers</p>
            </div>

            <div className="col-6 col-lg-3">
              <h2 className="fw-bold text-primary">50+</h2>
              <p className="text-secondary mb-0">Categories</p>
            </div>

            <div className="col-6 col-lg-3">
              <h2 className="fw-bold text-primary">4.9</h2>
              <p className="text-secondary mb-0">Customer Rating ⭐</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-5">
        <div
          className="rounded-5 p-5 text-center text-white"
          style={{
            background: "linear-gradient(135deg, #7055df, #9b5de5)",
          }}
        >
          <h2 className="fw-bold mb-3">Ready to Start Shopping?</h2>

          <p className="mb-4">
            Explore our latest collection and discover products you'll love.
          </p>

          <Link to="/products" className="btn btn-light px-4 py-2 rounded-pill">
            Shop Now
            <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
