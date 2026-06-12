import { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import "../styles/App.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(res.data.message || "Login successful");

      navigate("/dashboard");
    } catch (err) {
      alert(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Login failed"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Job Tracker</h1>

        <p style={{ marginBottom: "15px", color: "#6b7280" }}>
          Track your job applications easily
        </p>

        <form onSubmit={login}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#2563eb" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
