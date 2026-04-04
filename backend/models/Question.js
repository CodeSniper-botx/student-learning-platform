const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: String,
  image: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });


module.exports = mongoose.model("Question", questionSchema);