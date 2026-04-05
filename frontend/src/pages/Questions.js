import { useEffect, useState } from "react";
import {
  askQuestion,
  getQuestions,
  answerQuestion,
  getAnswers,
  upvoteAnswer,
} from "../services/api";

function Questions() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [answerText, setAnswerText] = useState({});
  const [answerImage, setAnswerImage] = useState({});

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // LOAD QUESTIONS + ANSWERS
  const loadQuestions = async () => {
    try {
      const res = await getQuestions();
      const data = Array.isArray(res.data) ? res.data : [];
      setQuestions(data);

      data.forEach(async (q) => {
        try {
          const ans = await getAnswers(q._id);
          setAnswers((prev) => ({
            ...prev,
            [q._id]: Array.isArray(ans.data) ? ans.data : [],
          }));
        } catch (err) {
          console.error("Answer fetch error:", err);
        }
      });
    } catch (err) {
      console.error("Question fetch error:", err);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  // ASK QUESTION
  const handleSubmit = async () => {
    if (!text) return alert("Enter question");

    try {
      const formData = new FormData();
      formData.append("text", text);
      if (image) formData.append("image", image);
      formData.append("userId", user?._id || "");

      await askQuestion(formData);

      setText("");
      setImage(null);
      loadQuestions();
    } catch (err) {
      console.error(err);
      alert("Question failed");
    }
  };

  // ANSWER
  const handleAnswer = async (id) => {
    if (!answerText[id]) return;

    try {
      const formData = new FormData();
      formData.append("text", answerText[id]);
      formData.append("questionId", id);
      formData.append("userId", user?._id || "");

      if (answerImage[id]) {
        formData.append("image", answerImage[id]);
      }

      await answerQuestion(formData);

      setAnswerText({ ...answerText, [id]: "" });
      setAnswerImage({ ...answerImage, [id]: null });

      loadQuestions();
    } catch (err) {
      console.error(err);
      alert("Answer failed");
    }
  };

  // UPVOTE
  const handleUpvoteAnswer = async (id) => {
    try {
      await upvoteAnswer(id, user?._id);
      loadQuestions();
    } catch (err) {
      console.error(err);
      alert("Vote failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>💬 Ask Doubt</h2>

      {/* ASK QUESTION */}
      <div style={styles.askBox}>
        <textarea
          placeholder="Ask your question..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.textarea}
        />

        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button style={styles.askBtn} onClick={handleSubmit}>
          🚀 Post Question
        </button>
      </div>

      <h3>📌 Questions</h3>

      {questions.map((q) => (
        <div key={q._id} style={styles.card}>
          <p>👤 {q.user?.name || "Anonymous"}</p>

          {/* ✅ SAFE DISPLAY (no N/A spam) */}
          {q.class && <p>📘 Class: {q.class}</p>}
          {q.subject && <p>📚 Subject: {q.subject}</p>}

          <p style={styles.question}>{q.text}</p>

          {q?.image && (
            <img
              src={`http://localhost:5000/${q.image}`}
              alt="question"
              style={styles.image}
            />
          )}

          {/* ANSWERS */}
          <div>
            <h4>Answers</h4>

            {answers[q._id]?.length > 0 ? (
              answers[q._id].map((a) => (
                <div key={a._id} style={styles.answer}>
                  <p>👤 {a.user?.name || "Anonymous"}</p>
                  <p>{a.text}</p>

                  {a?.image && (
                    <img
                      src={`http://localhost:5000/${a.image}`}
                      alt="answer"
                      style={styles.image}
                    />
                  )}

                  <button onClick={() => handleUpvoteAnswer(a._id)}>
                    👍 {a.votes || 0}
                  </button>
                </div>
              ))
            ) : (
              <p>No answers yet</p>
            )}
          </div>

          {/* ADD ANSWER */}
          <input
            placeholder="Write your answer..."
            value={answerText[q._id] || ""}
            onChange={(e) =>
              setAnswerText({
                ...answerText,
                [q._id]: e.target.value,
              })
            }
            style={styles.input}
          />

          <input
            type="file"
            onChange={(e) =>
              setAnswerImage({
                ...answerImage,
                [q._id]: e.target.files[0],
              })
            }
          />

          <button onClick={() => handleAnswer(q._id)}>Reply</button>
        </div>
      ))}
    </div>
  );
}

export default Questions;

const styles = {
  container: { padding: "20px", background: "#f4f6f9" },
  askBox: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  textarea: { width: "100%", height: "80px", marginBottom: "10px" },
  askBtn: {
    background: "#28a745",
    color: "#fff",
    padding: "8px 15px",
    border: "none",
    borderRadius: "5px",
  },
  card: {
    background: "#fff",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "10px",
  },
  question: { fontWeight: "bold" },
  answer: {
    padding: "10px",
    marginTop: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  input: {
    width: "100%",
    marginTop: "10px",
    padding: "5px",
  },
  image: {
    width: "200px",
    marginTop: "10px",
    borderRadius: "5px",
  },
};  