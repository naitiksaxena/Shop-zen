require("dotenv").config();

// Local par Atlas ke DNS (querySrv ECONNREFUSED) error se bachne ke liye.
// Vercel par iski zaroorat nahi, isliye wahan skip hota hai.
const dns = require("dns");
if (!process.env.VERCEL) {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Product = require("./models/Product");
const { verifyToken, isAdmin } = require("./middleware/auth");

const app = express();

app.use(cors());
app.use(express.json());

// ---------- MongoDB connection (Vercel serverless ke liye) ----------
// Har request par naya connection nahi banta, purana reuse hota hai
let connectionPromise = null;

const connectDB = () => {
  if (mongoose.connection.readyState === 1) return Promise.resolve();

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGO_URI).catch((error) => {
      connectionPromise = null;
      throw error;
    });
  }

  return connectionPromise;
};

// Route chalne se pehle DB connected hona chahiye
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.log("MongoDB Connection Error:", error);
    res.status(500).json({ message: "Database connection failed" });
  }
});

// Orders APIs
app.use("/api/orders", require("./routes/orders"));

// Contact queries APIs
app.use("/api/queries", require("./routes/queries"));

app.get("/", (req, res) => {
  res.send("Server is running...");
});

//product data show api

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();

    const formattedProducts = products.map((product) => ({
      id: product._id.toString(),
      name: product.name,
      category: product.category,
      price: product.price,
      rating: product.rating,
      image: product.image,
    }));

    res.json(formattedProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Products fetch nahi ho paaye",
    });
  }
});

//product delet api

app.delete("/api/products/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product nahi mila",
      });
    }

    res.json({
      message: "Product deleted successfully",
      id,
    });
  } catch (error) {
    console.log("Delete Product Error:", error);

    res.status(500).json({
      message: "Product delete nahi hua",
      error: error.message,
    });
  }
});

//product add api

app.post("/api/products", verifyToken, isAdmin, async (req, res) => {
  try {
    console.log("ADD PRODUCT BODY:", req.body);

    const { name, category, price, rating, image } = req.body;

    const product = await Product.create({
      name,
      category,
      price,
      rating,
      image,
    });

    res.status(201).json({
      id: product._id.toString(),
      name: product.name,
      category: product.category,
      price: product.price,
      rating: product.rating,
      image: product.image,
    });
  } catch (error) {
    console.log("ADD PRODUCT ERROR:", error);

    res.status(500).json({
      message: "Product add nahi hua",
      error: error.message,
    });
  }
});

//signup a;i

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "user",
    });

    res.status(201).json({
      message: "Account created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("SIGNUP ERROR:", error);

    res.status(500).json({
      message: "Signup failed",
    });
  }
});


//login api

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Login failed",
    });
  }
});


const PORT = process.env.PORT || 5000;

// Local par "node server.js" chalane par hi listen karo.
// Vercel khud app ko use karta hai, isliye wahan listen nahi hota.
if (require.main === module) {
  connectDB()
    .then(() => console.log("MongoDB Connected"))
    .catch(() => {});

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
