const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const { uploadBook, getBooks } = require("../controllers/bookController");

// 🔥 upload path fix
const uploadPath = path.join(__dirname, "../uploads");

// multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// routes
router.post("/upload", upload.single("file"), uploadBook);
router.get("/", getBooks);

module.exports = router;