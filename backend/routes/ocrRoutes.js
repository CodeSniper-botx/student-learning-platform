const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { extractText } = require("../controllers/ocrController");

// 🔥 Ensure uploads folder exists
const uploadPath = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// 🔥 Storage config (FIXED)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath); // ✅ correct path
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// 🔥 OCR ROUTE
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("OCR FILE:", req.file); // 🔍 debug

    // ✅ Correct full path
    const filePath = path.join(__dirname, "../", req.file.path);

    const text = await extractText(filePath);

    res.json({ text });
  } catch (err) {
    console.error("OCR ERROR:", err);
    res.status(500).json({ error: "OCR failed" });
  }
});

module.exports = router;