const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    text: String,

    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // ✅ NEW FIELD
    image: {
      type: String,
      default: "",
    },

    votes: {
      type: Number,
      default: 0,
    },

    voters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Answer", answerSchema);