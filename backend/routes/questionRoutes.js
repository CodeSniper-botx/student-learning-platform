const express = require("express");
const router = express.Router();
const multer = require("multer");

// STORAGE
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ IMPORTANT: "image" naam match hona chahiye
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { text, userId } = req.body;

    const newQuestion = {
      text,
      user: userId,
      image: req.file ? req.file.path : null,
    };

    // save in DB
    const Question = require("../models/Question");
    const q = new Question(newQuestion);
    await q.save();

    res.json(q);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Question failed" });
  }
});

module.exports = router;