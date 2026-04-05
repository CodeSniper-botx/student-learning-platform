const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// STORAGE FIX
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// 🔥 GET ALL QUESTIONS ✅ (THIS WAS MISSING)
router.get("/", async (req, res) => {
  try {
    const Question = require("../models/Question");

    const questions = await Question.find()
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(questions);
  } catch (err) {
    console.error("FETCH ERROR:", err);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

// 🔥 POST QUESTION
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { text, userId } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text required" });
    }

    const Question = require("../models/Question");

    const newQuestion = new Question({
      text,
      user: userId,
      image: req.file ? req.file.path : null,
    });

    await newQuestion.save();

    res.json(newQuestion);
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: "Question failed" });
  }
});

module.exports = router;