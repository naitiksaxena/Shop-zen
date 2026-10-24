import React, { useState } from "react";
import { API_URL } from "../api";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/queries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Message send nahi hua");
        return;
      }

      alert("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.log("Send Message Error:", err);
      setError("Server se connection nahi ho raha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <span className="badge rounded-pill bg-primary-subtle text-primary px-3 py-2 mb-3">
            Get In Touch
          </span>

          <h1 className="display-5 fw-bold">
            Contact <span className="text-primary">Us</span>
          </h1>

          <p className="text-secondary mx-auto" style={{ maxWidth: "650px" }}>
            Have a question, suggestion or need help? Feel free to contact us.
            Our team will be happy to help you.
          </p>
        </div>

        <div className="row g-4">
          {/* Contact Information */}
          <div className="col-lg-5">
            <div className="bg-light rounded-5 p-4 p-md-5 h-100">
              <h3 className="fw-bold mb-4">Let's Talk</h3>

              <p className="text-secondary mb-4">
                We would love to hear from you. Send us a message and we'll get
                back to you as soon as possible.
              </p>

              {/* Email */}
              <div className="d-flex align-items-center mb-4">
                <div
                  className="bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                >
                  <i className="bi bi-envelope-fill text-primary"></i>
                </div>

                <div>
                  <small className="text-secondary">Email</small>

                  <p className="mb-0 fw-semibold">naitiksaxena0862@gmail.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="d-flex align-items-center mb-4">
                <div
                  className="bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                >
                  <i className="bi bi-telephone-fill text-primary"></i>
                </div>

                <div>
                  <small className="text-secondary">Phone</small>

                  <p className="mb-0 fw-semibold">+91 80909 43172</p>
                </div>
              </div>

              {/* Location */}
              <div className="d-flex align-items-center mb-4">
                <div
                  className="bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                >
                  <i className="bi bi-geo-alt-fill text-primary"></i>
                </div>

                <div>
                  <small className="text-secondary">Address</small>

                  <p className="mb-0 fw-semibold">India</p>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-4">
                <p className="fw-semibold mb-3">Follow Us</p>

                <div className="d-flex gap-2">
                  <a href="#" className="btn btn-dark rounded-circle">
                    <i className="bi bi-instagram"></i>
                  </a>

                  <a href="#" className="btn btn-dark rounded-circle">
                    <i className="bi bi-facebook"></i>
                  </a>

                  <a href="#" className="btn btn-dark rounded-circle">
                    <i className="bi bi-twitter-x"></i>
                  </a>

                  <a href="#" className="btn btn-dark rounded-circle">
                    <i className="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-5 p-4 p-md-5">
              <h3 className="fw-bold mb-4">Send Us a Message</h3>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                {/* Name + Email */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Your Name</label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control form-control-lg"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control form-control-lg"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Subject</label>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    placeholder="Enter subject"
                    required
                  />
                </div>

                {/* Message */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Message</label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control"
                    rows="6"
                    placeholder="Write your message..."
                    required
                  ></textarea>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg rounded-pill px-4"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                  {!loading && <i className="bi bi-send-fill ms-2"></i>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container py-5">
        <div
          className="rounded-5 p-5 text-center text-white"
          style={{
            background: "linear-gradient(135deg, #7055df, #9b5de5)",
          }}
        >
          <i className="bi bi-chat-heart-fill" style={{ fontSize: "45px" }}></i>

          <h2 className="fw-bold mt-3">We're Here to Help!</h2>

          <p className="mb-0">
            Your questions and feedback are always welcome.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Contact;
