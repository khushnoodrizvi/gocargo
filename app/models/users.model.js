const mongoose = require("mongoose");
const crypto = require("crypto");
const { Schema } = mongoose;
const salt = "mangomastipipe";

const usersSchema = new Schema({
  name: String,
  email: String,
  password: String,
  profile_pic: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

usersSchema.methods.setPassword = function (password) {
  this.password = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

usersSchema.methods.validPassword = function (password) {
  var hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.password === hash;
};

module.exports = mongoose.model("users", usersSchema);
