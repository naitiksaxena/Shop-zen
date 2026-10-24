const jwt = require("jsonwebtoken");

// Login check: header me "Authorization: Bearer <token>" hona chahiye
const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Please login first" });
  }

  try {
    const token = header.split(" ")[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET); // { id, role }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Session expired, please login again" });
  }
};

// Admin check (verifyToken ke baad lagana)
const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

module.exports = { verifyToken, isAdmin };
