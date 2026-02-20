import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../utils/auth";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const result = registerUser({ name, email, password });

    if (result.success) {
      setMessage("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setMessage(result.message);
    }
  };

  // 🔵 Google Signup Simulation
  const handleGoogleSignup = () => {
    const googleUser = {
      name: "Google User",
      email: "googleuser@gmail.com",
      provider: "google",
    };

    localStorage.setItem("currentUser", JSON.stringify(googleUser));
    navigate("/");
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <button type="submit">Register</button>
      </form>

      {/* OR Divider */}
      <div style={{ textAlign: "center", margin: "15px 0" }}>
        <span>──────── OR ────────</span>
      </div>

      {/* Google Button */}
      <button
        type="button"
        onClick={handleGoogleSignup}
        className="google-btn"
      >
        Sign up with Google
      </button>

      {message && <p className="auth-message">{message}</p>}

      <p style={{ marginTop: "15px" }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
