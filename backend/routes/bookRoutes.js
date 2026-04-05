const express = require("express");
const router = express.Router();

const multer = require("multer");
const { uploadBook, getBooks } = require("../controllers/bookController");

// multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ routes
router.post("/upload", upload.single("file"), uploadBook);
router.get("/", getBooks);

module.exports = router;