import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import UploadBook from "./pages/UploadBook";
import OCRPage from "./pages/OCRPages";
import Questions from "./pages/Questions";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));

    if (token) {
      setIsLoggedIn(true);
      setUser(userData);
    }
  }, []);

  return (
    <HashRouter>
      <div>

        {/* 🔥 NAVBAR */}
        <nav style={styles.navbar}>
          <h2 style={styles.logo}>📚 StudyShare</h2>

          <div>
            {isLoggedIn ? (
              <>
                <Link style={styles.link} to="/">Home</Link>
                <Link style={styles.link} to="/upload">Upload</Link>
                <Link style={styles.link} to="/ocr">OCR</Link>
                <Link style={styles.link} to="/questions">Doubts</Link>

                <span style={styles.user}>
                  👤 {user?.name || "User"}
                </span>

                <button
                  style={styles.logout}
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link style={styles.link} to="/login">Login</Link>
                <Link style={styles.link} to="/signup">Signup</Link>
              </>
            )}
          </div>
        </nav>

        {/* ROUTES */}
        <div style={styles.container}>
          <Routes>

            {!isLoggedIn ? (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Login />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/upload" element={<UploadBook />} />
                <Route path="/ocr" element={<OCRPage />} />
                <Route path="/questions" element={<Questions />} />
                <Route path="*" element={<Home />} />
              </>
            )}

          </Routes>
        </div>

      </div>
    </HashRouter>
  );
}

export default App;

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#282c34",
    color: "white",
  },
  logo: {
    margin: 0,
  },
  link: {
    color: "white",
    marginLeft: "20px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  user: {
    marginLeft: "20px",
    fontWeight: "bold",
  },
  logout: {
    marginLeft: "20px",
    padding: "6px 12px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  container: {
    padding: "20px",
  },
};