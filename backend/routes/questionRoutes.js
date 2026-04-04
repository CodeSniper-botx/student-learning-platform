const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  askQuestion,
  getQuestions,
  upvoteQuestion, // 🔥 IMPORTANT
} = require("../controllers/questionController");

// 🔥 multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// 🔥 ROUTES
router.post("/", upload.single("image"), askQuestion);
router.get("/", getQuestions);
router.put("/upvote/:id", upvoteQuestion); // 🔥 FIXED

module.exports = router;