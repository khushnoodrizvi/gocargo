const usersSchema = require("../models/users.model");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await usersSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new usersSchema({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    const savedUser = await user.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await usersSchema.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await usersSchema.findById(req.params.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
