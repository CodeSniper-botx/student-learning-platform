import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://student-learning-platform-vvx2.onrender.com/api/auth/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      // ✅ Save data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Redirect
      navigate("/");
      window.location.reload();

    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>🔐 Login</h2>

        <input
          style={styles.input}
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        <p>
          Don't have account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

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
    background: "#4facfe",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};