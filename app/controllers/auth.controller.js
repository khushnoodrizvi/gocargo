const usersSchema = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;


exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await usersSchema.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

  
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password!" });
    }

   
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.signedInUser = async (req, res) => {
  try {
    const user = await usersSchema.findById(req.user.id).select("-password");

    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};


exports.signOut = (req, res) => {
  res.status(200).json({ message: "Logged out" });
};