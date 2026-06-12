import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/App.css";

function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/register", form);

      alert(res.data.message || "Registered Successfully");

      navigate("/login");
    } catch (err) {
      alert(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Register failed"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>

        <p style={{ color: "#6b7280", marginBottom: "15px" }}>
          Start tracking your applications
        </p>

        <form onSubmit={register}>
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          <button type="submit">Register</button>
        </form>

        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#2563eb" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
