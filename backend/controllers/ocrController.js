const Tesseract = require("tesseract.js");

exports.extractText = async (imagePath) => {
  const result = await Tesseract.recognize(imagePath, "eng");
  return result.data.text;
};
const { fromPath } = require("pdf2pic");
const fs = require("fs");

exports.extractText = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;

    console.log("File path:", filePath);

    // 🔴 Agar PDF hai
    if (req.file.mimetype === "application/pdf") {

      const convert = fromPath(filePath, {
        density: 70, // 🔥 LOW karo (important)
        saveFilename: "page",
        savePath: "./uploads",
        format: "png",
        width: 600,
        height: 800,
      });

      const page = await convert(1);

      if (!fs.existsSync(page.path)) {
        return res.status(500).json({ error: "Image conversion failed" });
      }

      const result = await Tesseract.recognize(page.path, "eng");

      return res.json({
        message: "PDF OCR successful",
        text: result.data.text,
      });
    }

    // 🟢 Image OCR
    const result = await Tesseract.recognize(filePath, "eng");

    res.json({
      message: "Image OCR successful",
      text: result.data.text,
    });

  } catch (err) {
    console.error("OCR Error:", err);

    // 🔥 crash avoid
    res.status(500).json({
      error: "OCR failed. Try smaller file or image.",
    });
  }
};