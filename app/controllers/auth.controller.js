const usersSchema = require('../models/users.model');

exports.signIn = async (req, res, next) => {
    try {
        const user = await usersSchema.findOne({email: req.body.email});
        if(!user){
                return res.status(400).send({
                    message: "user not found!"
                })
        }
        else {
            if(user.validPassword(req.body.password)){
                req.session.user = user;
                req.session.isLoggedIn = true;
                return req.session.save((err)=>{
                    // res.send({message: "some error"})
                    console.log(err);
                    return res.send({
                        message: "Logged in"
                    })
                })
            }
            else {
                return res.send({
                    message: "Password do not match!"
                })
            }
        }
        // res.status(200).json(users)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.signOut = async (req, res, next) => {
    req.session.destroy((err)=>{
        if(err){
            return res.send({
                message: "Error in logging out"
            })
        }
        res.send({
            message: "Logged out"
        })
    })
}

exports.signedInUser = async (req, res, next) => {
    if(req.session.isLoggedIn){
        const {_id, name, email, profile_pic} = req.session.user;
        res.send({ _id, name, email, profile_pic })
    }
    else {
        res.send({ message: "user not logged in."})
    }
}

