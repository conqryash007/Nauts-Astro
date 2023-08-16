const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClaimHashSchema = new Schema({
  userAddress: { type: String, required: true },
  uniqueId: { type: String, required: true },
  expireTimeStamp: { type: Number, required: true },
  claimAmount: { type: Number, required: true },
  signature: { type: String, required: true },
});

module.exports = mongoose.model("ClaimHash", ClaimHashSchema);
