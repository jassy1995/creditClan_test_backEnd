const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  price: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  date: { type: Date, default: Date.now(), required: true },
});

module.exports = mongoose.model("orders", orderSchema);
