const Question = require("../models/Question");

// 🔥 ASK QUESTION
exports.askQuestion = async (req, res) => {
  try {
    const question = new Question({
      text: req.body.text || "",
      image: req.file ? req.file.path : "",
      user: req.body.userId,
    });

    await question.save();
    res.json(question);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
// add question
exports.addQuestion = async (req, res) => {
  try {
    const { text, userId, class: userClass, subject } = req.body;

    const newQuestion = new Question({
      text,
      user: userId,
      class: userClass,
      subject: subject,
      image: req.file ? req.file.path : "",
    });

    await newQuestion.save();

    res.json({ message: "Question added" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// 🔥 GET ALL QUESTIONS
exports.getQuestions = async (req, res) => {
  const questions = await Question.find()
    .populate("user", "name") // 🔥 THIS LINE IS MUST
    .sort({ createdAt: -1 });

  res.json(questions);
};

// 🔥 UPVOTE QUESTION
exports.upvoteQuestion = async (req, res) => {
  try {
    const updated = await Question.findByIdAndUpdate(
      req.params.id,
      { $inc: { votes: 1 } },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};