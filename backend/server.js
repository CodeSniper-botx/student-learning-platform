require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const app = express();

// 🔥 Connect Database
connectDB();

// 🔥 Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔥 Static Folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// const fs = require("fs");
const path = require("path");

// 🔥 ensure uploads folder exists
const uploadPath = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}
// 🔥 Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/questions", require("./routes/questionRoutes"));
app.use("/api/answers", require("./routes/answerRoutes"));
app.use("/api/ocr", require("./routes/ocrRoutes"));



// 🔥 Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🔥 Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ error: err.message || "Server Error" });
});
app.get("/healthz", (req, res) => {
  res.send("OK");
});
// const fs = require("fs");
// const path = require("path");
// const uploadPath = path.join(__dirname, "uploads");

// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath);
// }
// 🔥 Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});