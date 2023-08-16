const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserPassSchema = new Schema({
  token_id: { type: Number, required: true },
  transactionHash: { type: String, required: true },
  active: { type: Number },
});

module.exports = mongoose.model("UserPass", UserPassSchema);
