// const Answer = require("../models/Answer");

// // 🔥 ADD ANSWER
const Answer = require("../models/Answer");

// ✅ ADD ANSWER WITH IMAGE
exports.addAnswer = async (req, res) => {
  try {
    const { text, questionId, userId } = req.body;

    const newAnswer = new Answer({
      text,
      questionId,
      user: userId,
      image: req.file ? req.file.path : "", // 🔥 IMAGE
    });

    await newAnswer.save();

    res.json({ message: "Answer added" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 GET ANSWERS
exports.getAnswers = async (req, res) => {
  try {
    const answers = await Answer.find({
      questionId: req.params.questionId
    }).populate("user", "name");

    res.json(answers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 UPVOTE ANSWER
exports.upvoteAnswer = async (req, res) => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ error: "User ID missing" });
    }

    const answer = await Answer.findById(req.params.id);

    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    // ensure voters array exists
    if (!answer.voters) {
      answer.voters = [];
    }

    // 🔥 FIXED comparison
    const alreadyVoted = answer.voters.some(
      (id) => id.toString() === userId
    );

    if (alreadyVoted) {
      // ❌ remove vote
      answer.voters = answer.voters.filter(
        (id) => id.toString() !== userId
      );
    } else {
      // ✅ add vote
      answer.voters.push(userId);
    }

    // 🔥 IMPORTANT: update votes count
    answer.votes = answer.voters.length;

    await answer.save();

    res.json({
      message: "Vote updated",
      votes: answer.votes,
      voters: answer.voters,
    });

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};