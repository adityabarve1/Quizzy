const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require('bcryptjs');


// ✅
exports.register = async (req, res) => {
  try {
    const { email, username, password, confirmPassword, role } = req.body;

    if (!username || !email || !password || !confirmPassword || !role) {
      return res
        .status(400)
        .json({ success: false, error: "Please fill all the fields" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: "Password and Confirm Password should be same",
      });
    }

    const emailExists = await User.findOne({ email });
    
    if (emailExists) {
      return res
        .status(400)
        .json({ success: false, error: "Email is already registered, Please log in" });
    }

    const usernameExists = await User.findOne({ username });

    if (usernameExists) {
      return res
        .status(400)
        .json({ success: false, error: "Username already exists" });
    }

    const hashedPasssword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPasssword,
      role,
    });

    return res
      .status(200)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.log("ERROR WHILE REGISTERING THE NEW USER : ", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

// ✅


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for empty fields
    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Please fill all the fields" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, error: "User not found" });
    }

    console.log("Login - User found:", user.email);
    console.log("Login - User attemptedQuizes (raw):", user.attemptedQuizes);
    console.log("Login - User attemptedQuizes (strings):", (user.attemptedQuizes || []).map(id => id.toString()));

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set cookie options
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      httpOnly: true,
    };

    // Send response with cookie
    return res
      .cookie("token", token, options)
      .status(200)
      .json({
        success: true,
        message: "User logged in successfully",
        data: {
          token,
          user: {
            id: user._id,
            email: user.email,
            username: user.username,
            role: user.role,
            createdAt: user.createdAt,
            attemptedQuizes: (user.attemptedQuizes || []).map(id => id.toString()),
          },
        },
      });
  } catch (error) {
    // Improved error logging
    console.error("ERROR WHILE LOGGING IN THE USER: ", error.message || error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};
