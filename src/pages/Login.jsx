import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../utils/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const result = loginUser(email, password);

    if (result.success) {
      // Save logged-in user to localStorage
      localStorage.setItem("currentUser", JSON.stringify(result.user));

      // 🔔 Trigger storage event so Header updates immediately
      window.dispatchEvent(new Event("storage"));

      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 1200);
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {message && <p className="auth-message">{message}</p>}
      <p style={{ marginTop: "15px" }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
