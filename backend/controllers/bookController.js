const Book = require("../models/Book");

exports.uploadBook = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "File not uploaded" });
    }

    const book = new Book({
      title: req.body.title,
      subject: req.body.subject,
      class: req.body.class,
      fileUrl: req.file.path.replace("\\", "/"), // IMPORTANT FIX
    });

    await book.save();

    res.json({ message: "Book uploaded", book });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};