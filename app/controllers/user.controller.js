const usersSchema = require('../models/users.model');

exports.createUser = async (req, res, next) => {
    const user = new usersSchema({
        ...req.body
    })
    user.setPassword(req.body.password);
    try {
        const userCreate = await user.save()
        res.status(201).json(userCreate)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.getUsers = async (req, res, next) => {
    console.log(req)
    try {
        const users = await usersSchema.find();
        res.status(200).json(users)
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(400).json({ message: error.message })
    }
}

exports.getUserById = async (req, res, next) => {
    try {
        const users = await usersSchema.findById(req.params.id);
        
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}