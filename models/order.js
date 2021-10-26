const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  Title: { type: String, required: true },
  Network: { type: String, required: true },
  Duration: { type: String, required: true },
  Quantity: { type: String, required: true },
  Amount: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  date: { type: Date, default: Date.now(), required: true },
});

module.exports = mongoose.model("orders", orderSchema);
