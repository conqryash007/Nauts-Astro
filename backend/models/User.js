const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  wallet: { type: String, required: true },
  name: { type: String },
  image: { type: String },
  password: { type: String, minlength: 6 },
});

module.exports = mongoose.model("User", UserSchema);
