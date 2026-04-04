const express = require("express");
const router = express.Router();
const multer = require("multer");
const { extractText } = require("../controllers/ocrController");

// storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// ✅ IMPORTANT: field name must be "image"
router.post("/", upload.single("image"), extractText);

module.exports = router;