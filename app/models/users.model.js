const mongoose = require('mongoose')
const crypto = require('crypto')
const { Schema } = mongoose;
const salt = "mangomastipipe"

const usersSchema = new Schema({
  name:  String,
  email: String,
  password: String,
  profile_pic: String
});

// Method to set salt and hash the password for a user 
usersSchema.methods.setPassword = function(password) { 
     
  // Creating a unique salt for a particular user 
    //  this.salt = crypto.randomBytes(16).toString('hex'); 
   
     // Hashing user's salt and password with 1000 iterations, 
      
     this.password = crypto.pbkdf2Sync(password, salt,  
     1000, 64, `sha512`).toString(`hex`); 
 };

 usersSchema.methods.validPassword = function(password) { 
  var hash = crypto.pbkdf2Sync(password,  
  salt, 1000, 64, `sha512`).toString(`hex`); 
  return this.password === hash; 
};

module.exports =  mongoose.model('users', usersSchema);