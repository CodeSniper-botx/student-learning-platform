import { useState } from "react";
import axios from "axios";

function OCRPage() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOCR = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/ocr",
        formData
      );

      setText(res.data.text);
    } catch (err) {
      console.error(err);
      alert("OCR failed!");
    } finally {
      setLoading(false);
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    alert("Text copied!");
  };

  return (
    <div style={styles.container}>
      <h2>🧠 OCR Extractor</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button style={styles.button} onClick={handleOCR}>
        {loading ? "Processing..." : "Extract Text"}
      </button>

      {/* RESULT */}
      {text && (
        <div style={styles.resultBox}>
          <div style={styles.topBar}>
            <h3>📄 Extracted Text</h3>
            <button style={styles.copyBtn} onClick={copyText}>
              Copy
            </button>
          </div>

          <div style={styles.textArea}>
            {text}
          </div>
        </div>
      )}
    </div>
  );
}

export default OCRPage;

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
  resultBox: {
    marginTop: "20px",
    padding: "15px",
    borderRadius: "10px",
    backgroundColor: "#f5f5f5",
    maxWidth: "800px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  copyBtn: {
    padding: "5px 10px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
  textArea: {
    marginTop: "10px",
    maxHeight: "300px",
    overflowY: "scroll",
    textAlign: "left",
    whiteSpace: "pre-wrap",
  },
};