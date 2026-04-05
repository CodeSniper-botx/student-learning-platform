import axios from "axios";

// 🔥 Base API
const API = axios.create({
  baseURL: "https://student-learning-platform-vvx2.onrender.com/api",
});

// 🔐 Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// ================= AUTH =================
export const signup = (data) => API.post("/auth/signup", data);

export const login = (data) => API.post("/auth/login", data);

// ================= BOOKS =================
export const getBooks = () => API.get("/books");

export const uploadBook = (formData) =>
  API.post("/books/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// ================= OCR =================
export const runOCR = (formData) =>
  API.post("/ocr", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// ================= QUESTIONS =================

// 🔥 Get all questions
export const getQuestions = () => API.get("/questions");

// 🔥 Ask question (text + image)
export const askQuestion = (formData) =>
  API.post("/questions", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
// get question
export const getQuestion = (id) =>
  API.get(`/questions/${id}`);
// ================= ANSWERS =================

// 🔥 Add answer (TEXT + IMAGE SUPPORT ✅)
export const answerQuestion = (formData) =>
  API.post("/answers", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// 🔥 Get answers by questionId
export const getAnswers = (id) =>
  API.get(`/answers/${id}`);

// ================= VOTING =================

// 🔥 Upvote Answer (1 user = 1 vote)
export const upvoteAnswer = (id, userId) => {
  console.log("Sending vote:", userId);

  if (!userId) {
    throw new Error("User ID missing ❌");
  }

  return API.put(`/answers/upvote/${id}`, {
    userId: userId,
  });
};

export default API;