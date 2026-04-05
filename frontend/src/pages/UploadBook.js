import { useState } from "react";
import { uploadBook } from "../services/api";

function UploadBook() {
  const [form, setForm] = useState({
    title: "",
    subject: "",
    class: "",
  });

  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file || !form.title || !form.subject || !form.class) {
      alert("Please fill all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("subject", form.subject);
    formData.append("class", form.class);
    formData.append("file", file);

    await uploadBook(formData);
    alert("Uploaded Successfully!");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>⬆ Upload Book</h2>

      <input
        placeholder="Book Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <br /><br />

      <input
        placeholder="Subject (e.g. Maths)"
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
      />
      <br /><br />

      <input
        placeholder="Class (e.g. 10)"
        onChange={(e) => setForm({ ...form, class: e.target.value })}
      />
      <br /><br />

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br /><br />

      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
}

export default UploadBook;