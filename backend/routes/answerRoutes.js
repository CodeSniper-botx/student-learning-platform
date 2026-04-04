const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // ✅

const {
  addAnswer,
  getAnswers,
  upvoteAnswer,
} = require("../controllers/answerController");

// 🔥 IMAGE SUPPORT ADDED
router.post("/", upload.single("image"), addAnswer);

router.get("/:questionId", getAnswers);
router.put("/upvote/:id", upvoteAnswer);

module.exports = router;