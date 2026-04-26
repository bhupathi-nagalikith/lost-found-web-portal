const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* =========================
   REGISTER USER
========================= */
exports.registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      phoneNumber,
      regdNo,
      course,
      section,
      password
    } = req.body;
    const normalizedPhoneNumber = phoneNumber || phone;

    // Check if user already exists
    const userExists = await User.findOne({
      $or: [{ email }, { regdNo }]
    });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      phoneNumber: normalizedPhoneNumber,
      regdNo,
      course,
      section,
      password
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
  console.log("REGISTER ERROR:", error);   // 👈 very important

  if (error.code === 11000) {
    return res.status(400).json({
      message: "Email or Registration Number already exists"
    });
  }

  res.status(500).json({
    message: error.message
  });
}
};


/* =========================
   LOGIN USER
========================= */
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
