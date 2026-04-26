const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },

  image: {
    type: String   // 👈 store image URL here
  },

  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);