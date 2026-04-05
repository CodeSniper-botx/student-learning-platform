import { useEffect, useState } from "react";
import { getBooks } from "../services/api";

const BASE_URL = "https://student-learning-platform-vvx2.onrender.com";

function Home() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    getBooks().then((res) => {
      const data = Array.isArray(res.data) ? res.data : [];
      setBooks(data);
      setFilteredBooks(data);
    });
  }, []);

  useEffect(() => {
    let temp = [...books];

    if (selectedClass) {
      temp = temp.filter(
        (book) =>
          String(book.class || "").toLowerCase() ===
          selectedClass.toLowerCase()
      );
    }

    if (selectedSubject) {
      temp = temp.filter((book) =>
        String(book.subject || "")
          .toLowerCase()
          .includes(selectedSubject.toLowerCase())
      );
    }

    setFilteredBooks(temp);
  }, [selectedClass, selectedSubject, books]);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>📚 All Books</h2>

      <div style={styles.filterBox}>
        <select onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="">All Classes</option>
          <option value="9">Class 9</option>
          <option value="10">Class 10</option>
          <option value="11">Class 11</option>
          <option value="12">Class 12</option>
          <option value="JEE">JEE</option>
          <option value="NEET">NEET</option>
        </select>

        <select onChange={(e) => setSelectedSubject(e.target.value)}>
          <option value="">All Subjects</option>
          <option value="Maths">Maths</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Biology">Biology</option>
          <option value="Social Science">Social Science</option>
          <option value="English">English</option>
        </select>

        <button
          onClick={() => {
            setSelectedClass("");
            setSelectedSubject("");
          }}
        >
          Reset
        </button>
      </div>

      <div style={styles.grid}>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => {
            console.log(book); // ✅ correct place

            return (
              <div key={index} style={styles.card}>
                <h3>{book.title || "No Title"}</h3>

                <p><b>Subject:</b> {book.subject || "N/A"}</p>
                <p><b>Class:</b> {book.class || "N/A"}</p>

                <a
                  href={`${BASE_URL}${book.fileUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.button}
                >
                  📖 View Book
                </a>
              </div>
            );
          })
        ) : (
          <p style={{ textAlign: "center" }}>No books found 😢</p>
        )}
      </div>
    </div>
  );
}

export default Home;

const styles = {
  filterBox: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  },
  button: {
    display: "inline-block",
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "5px",
    textDecoration: "none",
  },
};