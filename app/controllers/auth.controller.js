const usersSchema = require('../models/users.model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// LOGIN
exports.signIn = async (req, res) => {
  try {
    const user = await usersSchema.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password does not match!" });
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
      message: "Logged in successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile_pic: user.profile_pic
      }
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// SESSION (USED ON REFRESH)
exports.signedInUser = async (req, res) => {
  try {
    const user = await usersSchema
      .findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// LOGOUT (OPTIONAL)
exports.signOut = async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};
// -------------------------------


// const usersSchema = require('../models/users.model');
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const JWT_SECRET = process.env.JWT_SECRET || "mysecret";

// // LOGIN → signIn
// // LOGIN → signIn
// exports.signIn = async (req, res, next) => {
//   try {
//     const user = await usersSchema.findOne({ email: req.body.email });
//     if (!user) {
//       return res.status(400).send({ message: "User not found!" });
//     }

//     console.log("Frontend email:", req.body.email);
//     console.log("Frontend password:", req.body.password);
//     console.log("DB password:", user.password);

//     // Compare plain text directly
//     if (req.body.password !== user.password) {
//       return res.status(400).send({ message: "Password does not match!" });
//     }

//     // Create JWT token
//     // const token = jwt.sign(
//     //   { id: user._id, email: user.email },
//     //   JWT_SECRET,
//     //   { expiresIn: "1d" }
//     // );
//     const token = jwt.sign(
//   {
//     id: user._id,
//     email: user.email,
//     role: user.role   // ✅ REQUIRED
//   },
//   JWT_SECRET,
//   { expiresIn: "1d" }
// );

//     res.status(200).send({
//       message: "Logged in successfully",
//       token,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         profile_pic: user.profile_pic
//       }
//     });

//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
// // 