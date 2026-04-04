const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  subject: String,
  class: String,
  fileUrl: String,
  uploadedBy: String,
});

module.exports = mongoose.model("Book", bookSchema);