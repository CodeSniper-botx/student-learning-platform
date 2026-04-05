import { useState } from "react";
import { signup } from "../services/api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await signup(form);
      alert("Signup successful!");
      navigate("/login");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>📝 Signup</h2>

        <input
          style={styles.input}
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          style={styles.input}
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button style={styles.button} onClick={handleSignup}>
          Signup
        </button>
      </div>
    </div>
  );
}

export default Signup;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  },
  card: {
    padding: "30px",
    borderRadius: "10px",
    background: "white",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  input: {
    display: "block",
    width: "250px",
    margin: "10px auto",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    background: "#00c9a7",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};