const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    // 1. Basic presence check before hitting DB validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 2. Optional early check for friendly UX (still pair with error code 11000 handling)
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    // 3. Create & save -> runs schema validation + pre("save") password hashing
    const user = new User({
      name: name.trim(),
      email: normalizedEmail,
      password,
    });

    await user.save();

    // 4. Omit password from the response payload
    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    // MongoDB duplicate key error (race condition on unique email index)
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    // Mongoose validation errors (e.g., invalid email format or short password)
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    }

    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const JWT_SECRET = process.env.JWT_SECRET;

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // 1. Validate required inputs
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ message: "Invalid input format" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 2. Explicitly select password since `select: false` hides it by default
    const user = await User.findOne({ email: normalizedEmail }).select(
      "+password",
    );

    // 3. Use the exact same generic message whether email or password fails
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 4. Sign a JWT (adjust expiry and payload to your app's needs)
    const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Optional: set as an HttpOnly cookie instead of (or in addition to) returning in JSON
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      // secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 5. Return safe user fields only (never include user.password)
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { registerUser, loginUser };
