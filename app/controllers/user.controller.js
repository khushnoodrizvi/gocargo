const usersSchema = require("../models/users.model");
const bcrypt = require("bcryptjs");
exports.createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new usersSchema({ ...req.body, password: hashedPassword });
    const userCreate = await user.save();
    res.status(201).json(userCreate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getUsers = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res.status(403).json({ message: "Forbidden" });
    // }
    const users = await usersSchema.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getUserById = async (req, res) => {
  try {
    // if (req.user.role !== "admin" && req.user.id !== req.params.id) {
    //   return res.status(403).json({ message: "Forbidden" });
    // }
    const user = await usersSchema.findById(req.params.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; // const usersSchema = require('../models/users.model'); // exports.createUser = async (req, res, next) => { //     try { //         const user = new usersSchema({ //             ...req.body //         }); //         // user.setPassword(req.body.password); // hash the password //         const userCreate = await user.save(); //         res.status(201).json(userCreate); //     } catch (error) { //         res.status(400).json({ message: error.message }); //     } // } // exports.getUsers = async (req, res, next) => { //     try { //         const currentUser = req.user; // from JWT middleware //         // Optional: restrict to admin //         if(currentUser.role !== 'admin') { //             return res.status(403).json({ message: "Forbidden" }); //         } //         const users = await usersSchema.find(); //         res.status(200).json(users); //     } catch (error) { //         console.error("Error fetching users:", error); //         res.status(400).json({ message: error.message }); //     } // } // exports.getUserById = async (req, res, next) => { //     try { //         const currentUser = req.user; // from JWT middleware //         // Only allow self or admin //         if(currentUser.role !== 'admin' && currentUser.id !== req.params.id) { //             return res.status(403).json({ message: "Forbidden" }); //         } //         const user = await usersSchema.findById(req.params.id); //         res.status(200).json(user); //     } catch (error) { //         res.status(400).json({ message: error.message }); //     } // }

// const usersSchema = require('../models/users.model');

// exports.createUser = async (req, res, next) => {
//     const user = new usersSchema({
//         ...req.body
//     })
//     user.setPassword(req.body.password);
//     try {
//         const userCreate = await user.save()
//         res.status(201).json(userCreate)
//     } catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// }

// exports.getUsers = async (req, res, next) => {
//     console.log(req)
//     try {
//         const users = await usersSchema.find();
//         res.status(200).json(users)
//     } catch (error) {
//         console.error("Error fetching users:", error);
//         res.status(400).json({ message: error.message })
//     }
// }

// exports.getUserById = async (req, res, next) => {
//     try {
//         const users = await usersSchema.findById(req.params.id);

//         res.status(200).json(users)
//     } catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// }
