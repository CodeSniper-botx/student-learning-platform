const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, require("path").join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { text, questionId, userId } = req.body;

    const Answer = require("../models/Answer");

    const ans = new Answer({
      text,
      question: questionId,
      user: userId,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await ans.save();

    res.json(ans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Answer failed" });
  }
});