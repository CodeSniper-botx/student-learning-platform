exports.uploadBook = async (req, res) => {
  try {
    // 🔥 DEBUG LOG
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "File not uploaded" });
    }

    const fileUrl = `https://student-learning-platform-7trk.onrender.com/uploads/${req.file.filename}`;

    const book = new Book({
      title: req.body.title,
      subject: req.body.subject,
      className: req.body.className,
      file: fileUrl, // 🔥 FIXED URL
    });

    await book.save();

    res.json({ message: "Book uploaded", book });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};